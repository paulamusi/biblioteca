<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Usuario, PrestamoConLibro } from "~/types/types";
import { usePrestamo } from "~/composables/usePrestamos";

const props = defineProps<{ usuario: Usuario }>();
const emit = defineEmits(["volver"]);

const mostrarEdicion = ref(false);
const prestamos = ref<PrestamoConLibro[]>([]);
const { obtenerPrestamosPorUsuario } = usePrestamo();

onMounted(async () => {
  if (props.usuario?.id) {
    prestamos.value = await obtenerPrestamosPorUsuario(props.usuario.id);
  }
});
</script>

<template>
  <div class="p-4 space-y-4">
    <!-- Acordeón para edición -->
    <div>
      <button
        @click="mostrarEdicion = !mostrarEdicion"
        class="w-full text-left px-2 py-2 font-semibold bg-gray-100 rounded hover:bg-gray-200"
      >
        Editar usuario {{ usuario.nombre }} {{ usuario.apellido }} {{ mostrarEdicion ? '▼' : '▶' }} 
      </button>

      <div v-if="mostrarEdicion" class="mt-2 p-4 border rounded bg-gray-50 space-y-4">
        <form class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            v-model="usuario.nombre"
            class="border px-2 py-1 rounded w-full"
          />

          <label class="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            v-model="usuario.apellido"
            class="border px-2 py-1 rounded w-full"
          />
        </form>
      </div>
    </div>

    <!-- Historial de préstamos -->
    <div>
      <h3 class="text-xl font-bold mt-6">Historial de préstamos</h3>
      <ul class="space-y-2 mt-2">
        <li
          v-for="prestamo in prestamos"
          :key="prestamo.id"
          :class="[
            'p-2 border rounded',
            prestamo.devuelto ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]"
        >
          <span class="font-semibold">{{ prestamo.tituloLibro }}</span> —
          {{ prestamo.fecha }}
          <span v-if="!prestamo.devuelto" class="ml-2 text-xs uppercase">No devuelto</span>
          <span v-else class="ml-2 text-xs">Devuelto el {{ prestamo.fechaDevolucion }}</span>
        </li>
      </ul>
    </div>

    <button @click="emit('volver')" class="mt-4 text-sm text-blue-500">Volver</button>
  </div>
</template>