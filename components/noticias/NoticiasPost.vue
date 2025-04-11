<script setup lang="ts">
defineProps({
  noticia: Object 
});

</script>

<template>
  <div v-if="noticia" class="bg-white overflow-hidden border-b-2 flex flex-col h-full">
    <img :src="noticia.imagen" alt="Imagen de noticia" class="w-full h-40 object-cover">

    <div class="p-4 flex flex-col flex-grow">
      <h2 class="text-xl font-semibold">{{ noticia.titulo }}</h2>
      <p class="text-gray-600 mt-2 flex-grow">{{ noticia.texto.length > 220 ? noticia.texto.substring(0, 220) + "..." : noticia.texto }}</p>

      <NuxtLink 
        :to="`/noticias/${noticia.id}`" 
        class="text-primary mt-3 block text-right"
      >
        Leer más →
      </NuxtLink>
    </div>
  </div>
  <div v-else>
    <p>Noticia no disponible</p>
  </div>
</template>