<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const getLinkClass = (path: string) => ({
  'text-[#D28E45] font-bold': route.path === path,
  'text-black font-light': route.path !== path,
})
</script>

<template>
  <div class="flex gap-12 text-2xl font-lato">
    <NuxtLink :class="getLinkClass('/')" to="/">Inicio</NuxtLink>
    <NuxtLink :class="getLinkClass('/catalogo')" to="/catalogo">Catálogo</NuxtLink>
    <NuxtLink :class="getLinkClass('/contacto')" to="/contacto">Contacto</NuxtLink>
    <NuxtLink :class="getLinkClass('/login')" to="/login">Login</NuxtLink>
  </div>
</template>