<script setup lang="ts">
import { useRoute } from 'vue-router'


const supabase = useSupabaseClient();
const user = useSupabaseUser(); 
const route = useRoute();
const router = useRouter();

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
const signOut = async () => {
  await supabase.auth.signOut();
  router.push('/'); 
};
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
            <NuxtLink v-if="!user" :class="getLinkClass('/login')" to="/login">Login</NuxtLink>
        <template v-if="user">
          <NuxtLink :class="getLinkClass('/admin')" to="/admin">Admin</NuxtLink>
          <button 
          @click="signOut" 
          class="text-black font-light hover:text-[#D28E45] hover:font-bold"
          >
            Logout
          </button>
        </template>
        </div>
    </nav>
</template>