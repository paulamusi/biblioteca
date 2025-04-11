<script setup lang="ts">
defineProps({
  titulo: String,
  autor: String,
  imagen: String,
  id: Number
});
</script>
<template>
  <NuxtLink :to="`/libro/${id}`" class="hover:border-4 border-primary rounded-lg">
    <div class="pb-2 m-2 border-b-2 min-w-[320px] flex-grow font-lato flex justify-between">
       <!--  <img :src="imagen" alt="book cover" class="object-contain  h-36"/> -->
       <div class="h-36 w-full bg-gray-300 mr-2"></div>
       <div class="w-full flex flex-col justify-end">
          <p class="font-bold">{{ titulo }}</p>
          <p class="font-light">{{ autor }}</p>
          <p class="font-light">Disponible</p>
       </div>
    </div>
  </NuxtLink>
</template> 