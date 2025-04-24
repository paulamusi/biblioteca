<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
});

const isSidebarOpen = ref(false);
const selectedComponent = ref("AdminRegistrarLibro");

const menuItems = [
  { name: "Registrar Libro", component: "AdminRegistrarLibro" },
  { name: "Usuarios", component: "AdminVisualizarUsuarios" },
  { name: "Préstamos", component: "AdminRegistrarPrestamo" },
  { name: "Escribir Noticia", component: "AdminEscribirNoticia" },

];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const cambiarComponente = (nuevoComponente: string) => {
  selectedComponent.value = nuevoComponente;
};
</script>

<template>
  <div class="flex">
    <button
      @click="toggleSidebar"
      class="md:hidden p-4 absolute top-24 left-0 bg-primary text-white rounded-r-md"
    >
      Admin
    </button>

    <div
      :class="[
        'bg-gray-200 w-64 p-6 space-y-4 fixed md:relative h-full transition-transform rounded-r-md shadow-lg',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <h2 class="text-xl font-semibold text-primary">Admin Panel</h2>
        <ul>
            <li
            v-for="item in menuItems"
            :key="item.name"
            @click="selectedComponent = item.component; isSidebarOpen = false"
            class="p-2 cursor-pointer hover:bg-gray-300 rounded"
            >
            {{ item.name }}
            </li>
        </ul>
    </div>

    <div class="flex-1 ml-20 p-6 md:ml-0">
        <AdminRegistrarLibro v-show="selectedComponent === 'AdminRegistrarLibro'" />
        <AdminVisualizarUsuarios 
        v-show="selectedComponent === 'AdminVisualizarUsuarios'"
        @cambiarComponente="cambiarComponente"
        />
        <AdminEscribirNoticia v-show="selectedComponent === 'AdminEscribirNoticia'" />
        <AdminRegistrarPrestamo v-show="selectedComponent === 'AdminRegistrarPrestamo'" />
    </div>
  </div>
</template>
