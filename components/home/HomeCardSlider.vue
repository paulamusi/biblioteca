<script setup lang="ts">
defineProps({
  titulo: String,
  autor: String,
  imagen: String,
});
</script>

<template>
    <div class="px-2 border-r-2 font-lato flex flex-col flex-grow 
                min-w-[240px] sm:min-w-[280px] md:min-w-[240px] lg:min-w-[220px] max-w-[240px]">
       <div class="h-[230px] bg-gray-300">
         <!-- Imagen adaptable -->
         <!-- <img :src="imagen" alt="book cover" class="object-cover w-full h-full" /> -->
       </div>
       <div class="py-4">
        <p class="text-base sm:text-lg md:text-lg font-bold">{{ titulo }}</p>
        <p class="text-sm sm:text-base md:text-lg">{{ autor }}</p>
        <p> Disponible </p>
        </div>
    </div>
</template>