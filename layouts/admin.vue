<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref(false)

const menuItems = [
  { name: 'Libros', path: '/admin/libros' },
  { name: 'Usuarios', path: '/admin/usuarios' },
  { name: 'Préstamos', path: '/admin/prestamos' },
  { name: 'Noticias', path: '/admin/noticias' },
]

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div>
    <GlobalHeader />

    <div class="flex">

      <button
        @click="toggleSidebar"
        class="md:hidden p-4 absolute top-24 left-0 bg-primary text-white rounded-r-md z-50"
      >
        Admin
      </button>

      <aside
        :class="[
          'bg-gray-200 w-64 p-6 space-y-4 fixed md:relative h-full transition-transform rounded-r-md shadow-lg z-40',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ]"
      >
        <h2 class="text-xl font-semibold text-primary">Admin Panel</h2>
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.name"
            class="p-2 cursor-pointer hover:bg-gray-300 rounded"
          >
          <NuxtLink
            :to="{ path: item.path, query: item.name === 'Préstamos' ? { modo: 'visualizar' } : {} }"
            class="block w-full"
            >
            {{ item.name }}
        </NuxtLink>
          </li>
        </ul>
      </aside>

      <main class="flex w-full p-6">
        <slot></slot>
      </main>
    </div>

    <GlobalFooter />
  </div>
</template>