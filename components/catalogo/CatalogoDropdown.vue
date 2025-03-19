<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  buttonText: string
  items: string[]
}>()

const isOpen = ref<boolean>(false)

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

const selectItem = (item: string): void => {
  console.log(`Item selected: ${item}`)
  isOpen.value = false 
}
</script>
<template>
    <div class="relative m-10">
      <button
        class="text-white p-2 rounded-xl border-2 text-2xl"
        @click="toggleDropdown"
      >
        {{ buttonText }}
      </button>
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg"
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