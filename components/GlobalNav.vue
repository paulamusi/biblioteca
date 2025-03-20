<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
const getLinkClass = (path: string) => ({
  'text-[#D28E45] font-bold': route.path === path,
  'text-black font-light': route.path !== path,
})
watch(() => route.path, closeMenu)
</script>

<template>
    <div class="lg:hidden cursor-pointer" @click="toggleMenu">
      <div class="w-8 h-1 bg-black mb-1.5"></div>
      <div class="w-8 h-1 bg-black mb-1.5"></div>
      <div class="w-8 h-1 bg-black"></div>
    </div>
    <nav 
        :class="[
        'lg:flex flex-col lg:flex-row', 
        isMenuOpen ? 'absolute top-0 right-0 w-full bg-secondary text-white transform translate-x-0 z-40 text-center' : 'hidden', 
        'transition-transform duration-300 ease-in-out'
      ]">
        <div class="flex flex-col lg:flex-row gap-12 text-2xl font-lato">
            <NuxtLink :class="getLinkClass('/')" to="/">Inicio</NuxtLink>
            <NuxtLink :class="getLinkClass('/catalogo')" to="/catalogo">Catálogo</NuxtLink>
            <NuxtLink :class="getLinkClass('/contacto')" to="/contacto">Contacto</NuxtLink>
            <NuxtLink :class="getLinkClass('/login')" to="/login">Login</NuxtLink>
        </div>
    </nav>
</template>