<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
<template>
  <div class="hover:border-4 m-10 p-2  rounded-3xl">
    <button class="w-[300px] bg-primary text-3xl rounded-2xl font-lato p-3  text-white 
    shadow-2xl"> {{ text }}</button>
  </div>    
</template>