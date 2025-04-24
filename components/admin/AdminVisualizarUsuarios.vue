<script setup lang="ts">
import { ref } from 'vue';
import type { Usuario } from '~/types/types';

const emit = defineEmits(["cambiarComponente"]);
const irARegistrarUsuario = () => {
  emit("cambiarComponente", "AdminRegistrarUsuario");
};

const usuarios = ref<Usuario[]>([ 
  {
    nombre: 'Juan',
    apellido: 'Perez',
    telefono: 123456789,
    direccion: 'Calle Falsa 123',
    cedula: 987654321,
    comentarios: 'Cliente frecuente',
    created_at: new Date().toISOString(),
  },
  {
    nombre: 'Ana',
    apellido: 'Gomez',
    telefono: 987654321,
    direccion: 'Av. Siempre Viva 742',
    cedula: 123456789,
    comentarios: 'Nuevo cliente',
    created_at: new Date().toISOString(),
  }
]);
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
        <h1 class="w-1/2 text-4xl font-bold text-primary">Usuarios</h1>
        <button class="w-1/2 flex items-center justify-between gap-2 px-4 py-2 bg-primary/50 text-primary rounded" 
            @click="irARegistrarUsuario">
          <span>Agregar usuario</span>
          <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">+</span>
        </button>
    </div>  
    <div class="overflow-auto">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="text-left py-2 font-normal pl-8">Nombre</th>
            <th class="text-left py-2 font-normal">Apellido</th>
            <th class="text-left py-2 font-normal">Teléfono</th>
            <th class="text-left py-2 font-normal">Dirección</th>
            <th class="text-left py-2 font-normal">Cédula</th>
            <th class="text-left py-2 font-normal">Comentarios</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(usuario, index) in usuarios" 
            :key="index" 
            class="odd:bg-primary/60 even:bg-white"
          >
            <td class="py-2 pl-8 whitespace-nowrap">{{ usuario.nombre }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ usuario.apellido }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ usuario.telefono }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ usuario.direccion }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ usuario.cedula }}</td>
            <td class="py-2 px-2 flex justify-end space-x-2">
      
              <button class="text-primary ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.25 2.25 0 113.182 3.182l-9.19 9.19a2.25 2.25 0 01-.818.54l-3.375 1.125 1.125-3.375a2.25 2.25 0 01.54-.818l9.19-9.19z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v4.125a2.625 2.625 0 01-2.625 2.625h-12a2.625 2.625 0 01-2.625-2.625v-12a2.625 2.625 0 012.625-2.625H9.75" />
                </svg>
              </button>
  
              <button class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>