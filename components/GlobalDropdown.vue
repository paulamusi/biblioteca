<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  buttonText: string,
  items: string[],
  customTextClass?: string,
  customTextColor?: string,
}>(), {
  customTextClass: 'text-2xl',
  customTextColor: 'text-white',
})

const emit = defineEmits<{
  (e: 'item-click', item: string): void
}>()

const isOpen = ref<boolean>(false)

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

const selectItem = (item: string): void => {
  emit('item-click', item)
  isOpen.value = false 
}
</script>
<template>
    <div class="relative">
      <button
        class="p-2 rounded-xl border-2 w-[270px]"
        :class="[customTextClass, customTextColor]"
        @click="toggleDropdown"
      >
        {{ buttonText }}
      </button>
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg overflow-auto max-h-[400px]"
      >
        <ul>
          <li
            v-for="(item, index) in items"
            :key="index"
            class="px-4 py-2 hover:bg-gray-100"
            @click="selectItem(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </template>