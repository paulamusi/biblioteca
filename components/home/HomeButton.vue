<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
<template>
<button class="bg-secondary text-primary h-[8rem] w-[8rem] md:h-[14rem] md:w-[14rem] lg:h-[20rem] lg:w-[20rem] text-2xl md:text-3xl lg:text-5xl rounded-3xl font-lato"> {{ text }}</button>
</template>