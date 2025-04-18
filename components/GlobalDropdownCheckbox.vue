<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  label: string;
  items: { id: number; label: string }[];
  modelValue: number[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void;
}>();

const open = ref(false);
const localItems = ref([...props.items]);
const localSelected = ref<number[]>([...props.modelValue]);

watch(
  () => props.items,
  (newItems) => {
    localItems.value = [...newItems];
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  (newSelected) => {
    localSelected.value = [...newSelected];
  },
  { immediate: true }
);

const toggleItem = (id: number) => {
  if (localSelected.value.includes(id)) {
    localSelected.value = localSelected.value.filter(itemId => itemId !== id);
  } else {
    localSelected.value.push(id);
  }
};

const confirmSelection = () => {
  emit('update:modelValue', [...localSelected.value]);
  open.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="w-full border rounded px-4 py-2 text-left"
      @click="open = !open"
    >
    {{ label }}
    </button>

    <div
      v-if="open"
      class="absolute mt-2 w-full border rounded bg-white shadow max-h-[250px] overflow-auto"
    >
    <div class="p-2">
        <button
          type="button"
          class="px-3 py-1 bg-primary text-white rounded"
          @click="confirmSelection"
        >
          Confirmar
        </button>
      </div>
      <div
        v-for="item in localItems"
        :key="item.id"
        class="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-black"
        @click.stop="toggleItem(item.id)"
      >
        <input
          type="checkbox"
          :checked="localSelected.includes(item.id)"
          class="mr-2"
          readonly
        />
        <span>{{ item.label }}</span>
      </div>

    </div>
  </div>
</template>
