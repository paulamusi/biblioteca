<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Buscar...",
  },
  displayKey: {
    type: String,
    default: "titulo",
  },
  searchFunction: {
    type: Function,
    required: true,
  },
  onSelect: {
    type: Function,
    required: true,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  labelText: {
    type: String,
    default: "Buscar",
  },
  customTextClass: {
    type: String,
    default: "text-xl",  
  },
  customTextColor: {
    type: String,
    default: "text-black",  
  },
  customPlaceholderClass: {
    type: String,
    default: "placeholder-gray-500", 
  },
  iconColorClass: {
    type: String,
    default: "text-gray-500", 
  },
  itemKey: {
  type: String,
  default: "id",
},
  modelValue: {
   type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);
const filteredItems = ref<Array<Record<string, any>>>([]);
const showSuggestions = ref(false);

watch(
  () => props.items,
  (newItems) => {
    filteredItems.value = newItems;
  },
  { immediate: true }
);

watch(inputValue, (newVal) => {
  emit("update:modelValue", newVal);
});

const handleSelect = (item: Record<string, any>) => {
  inputValue.value = item[props.displayKey];
  props.onSelect(item);
  showSuggestions.value = false;
  filteredItems.value = [];
};
</script>

<template>
    <label v-if="showLabel" class="block text-sm font-medium">{{ labelText }}</label>
    <div :class="`relative rounded-xl border-2`">
      <svg
      class="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none"
      :class="iconColorClass"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
    <input
      v-model="inputValue"
      @input="() => { searchFunction(inputValue); showSuggestions = true; }"
      type="text"
      class="mt-1 block w-full px-3 py-2 focus:outline-none bg-transparent"
      :class="[customTextClass, customPlaceholderClass, customTextColor]"
      :placeholder="placeholder"
    />
    <ul v-if="showSuggestions && filteredItems.length && inputValue.trim() !== ''"class="absolute w-full border rounded bg-white shadow-md mt-1">
      <li
        v-for="item in items"
        :key="item.id" 
        @click="handleSelect(item)"
        class="p-2 cursor-pointer hover:bg-gray-200"
      >
        {{ item[displayKey] }}
      </li>
    </ul>
  </div>
</template>