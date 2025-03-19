<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
<template>
<button class="bg-secondary text-primary h-[20rem] w-[20rem] text-5xl rounded-3xl font-lato"> {{ text }}</button>
</template>