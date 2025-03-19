<script setup lang="ts">
defineProps({
  titulo: String,
  autor: String,
  imagen: String,
});
</script>
<template>
    <div class="p-6 m-2 shadow bg-secondary rounded-xl min-w-[280px] max-w-[320px] font-lato flex flex-col flex-grow gap-2">
       <!--  <img :src="imagen" alt="book cover" class="object-contain  h-52"/> -->
        <div class="h-36 bg-gray-300"></div>
       <p>{{ titulo }}</p>
       <p>{{ autor }}</p>
       <button class="bg-primary text-center w-full rounded-2xl text-white h-10">view details</button>
    </div>
</template>