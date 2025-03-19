<script setup lang="ts">
defineProps({
  titulo: String,
  fecha: String,
  imagen: String,
});
</script>
<template>
    <div class="m-auto font-lato flex flex-col gap-2 max-w-[1200px]">
       <!--  <img :src="imagen" alt="book cover" class="object-contain  h-52"/> -->
        <div class="h-52 bg-secondary">foto</div>
       <p class="text-xl text-primary">{{ titulo }}</p>
       <button class="text-primary h-10 text-left">» Leer más</button>
       <p>{{ fecha }}</p>

    </div>
</template>