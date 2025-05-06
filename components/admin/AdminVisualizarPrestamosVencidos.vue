<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { PrestamoVencidoConUsuario } from '~/types/types';

const { obtenerPrestamosVencidos, marcarComoDevuelto } = usePrestamo();
const emit = defineEmits(['registrar'])

const prestamos = ref<PrestamoVencidoConUsuario[]>([]);


onMounted(async () => {
  prestamos.value = await obtenerPrestamosVencidos();
});

const prestamosVencidos = computed(() =>
  prestamos.value
    .filter(p =>
      !p.devuelto &&
      p.fecha &&
      new Date(p.fecha) < new Date()
    )
    .sort((a, b) => new Date(a.fecha!).getTime() - new Date(b.fecha!).getTime())
);
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
        <h1 class="w-1/2 text-4xl font-bold text-primary">Prestamos</h1>
        <button class="w-1/2 flex items-center justify-between gap-2 px-4 py-2 bg-primary/50 text-primary rounded" 
        @click="emit('registrar')">
          <span>Agregar prestamo</span>
          <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">+</span>
        </button>
    </div>  
    <h2 class="text-2xl font-semibold">Préstamos vencidos</h2>
    <table v-if="prestamosVencidos.length" class="w-full table-auto">
        <thead>
          <tr>
            <th class="text-left py-2 font-normal pl-8">Titulo</th>
            <th class="text-left py-2 font-normal">Usuario</th>
            <th class="text-left py-2 font-normal">Fecha prestamo</th>
            <th class="text-left py-2 font-normal">Fecha vencimiento</th>
            <th class="text-center py-2 font-normal">Devolver</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="prestamo in prestamosVencidos" 
            :key="prestamo.id" 
            class="odd:bg-primary/60 even:bg-white"
          >
            <td class="py-2 pl-8 whitespace-nowrap">{{ prestamo.tituloLibro }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ prestamo.nombreUsuario }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ prestamo.fecha }}</td>
            <td class="py-2 px-2 whitespace-nowrap">{{ prestamo.fechaDevolucion }}</td>
            <td class="py-2 px-2 text-center align-middle">
                <input
                    type="checkbox"
                    :checked="prestamo.devuelto"
                    @change="async () => {
                        await marcarComoDevuelto(prestamo.id);
                        prestamo.devuelto = true;
                        prestamo.fechaDevolucion = new Date().toISOString().split('T')[0];
                    }"
                    class="cursor-pointer w-4 h-4"
                />
            </td>
          </tr>
        </tbody>
      </table>

    <p v-else class="text-gray-600">No hay préstamos vencidos.</p>
  </div>
</template>