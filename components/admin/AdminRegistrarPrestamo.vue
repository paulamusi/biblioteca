<script setup lang="ts">
import { ref, watch } from "vue";
import { useLibros } from "@/composables/useLibros";
import { useUsuarios } from "@/composables/useUsuarios";
import { usePrestamo } from "@/composables/usePrestamos";

const { usuario, buscarUsuarioPorNombreApellido } = useUsuarios();
const { busquedaLibro, resultados, buscarLibros, seleccionarLibro } = useLibros();
const { registrarPrestamo } = usePrestamo();

const fechaPrestamo = ref("");
const fechaDevolucion = ref("");

const calcularFechaDevolucion = (fecha: string) => {
  if (!fecha) return "";
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setDate(nuevaFecha.getDate() + 15);
  return nuevaFecha.toISOString().split("T")[0];
};

const actualizarFechaDevolucion = () => {
  fechaDevolucion.value = calcularFechaDevolucion(fechaPrestamo.value);
};

const submitForm = async () => {
const usuarioEncontrado = await buscarUsuarioPorNombreApellido(usuario.value.nombre, usuario.value.apellido);
if (!usuarioEncontrado) {
    alert("Usuario no encontrado");
    return;
  }
  const libroSeleccionado = resultados.value[0];
  if (!libroSeleccionado || !libroSeleccionado.id) {
    alert("No se ha seleccionado un libro válido.");
    return;
  }

  const prestamo = {
    usuario_id: usuarioEncontrado.id,
    libro_id: libroSeleccionado.id,
    fecha_prestamo: fechaPrestamo.value,
    fecha_devolucion: fechaDevolucion.value,
    devuelto: false,
  };
  try {
    await registrarPrestamo(prestamo);
    alert("Préstamo registrado exitosamente");
  } catch (error) {
    console.error("Error al registrar el préstamo:", error);
    alert("Hubo un error al registrar el préstamo.");
  }
};

watch(fechaPrestamo, (nuevaFecha) => {
  fechaDevolucion.value = calcularFechaDevolucion(nuevaFecha);
});
</script>

<template>
    <div class=" w-full max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Registrar Préstamo</h2>
      <form @submit.prevent="submitForm">
        <!-- Usuario -->
        <div class="mb-4">
          <label for="usuario" class="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            id="usuario"
            v-model="usuario.nombre"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nombre del usuario"
            required
          />
          <input
            type="text"
            id="usuario"
            v-model="usuario.apellido"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Apellido del usuario"
            required
          />
        </div>
          <!-- Libro -->
        <div class="mb-4 relative">
          <label for="libro" class="block text-sm font-medium text-gray-700">Libro</label>
          <input
            v-model="busquedaLibro"
            @input="buscarLibros"
            type="text"
            id="libro"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Escribe el título del libro"
          />

          <ul v-if="resultados.length && busquedaLibro.trim() !== ''" class="absolute w-full border rounded bg-white shadow-md mt-1">
            <li
              v-for="libro in resultados"
              :key="libro.id"
              @click="seleccionarLibro(libro)"
              class="p-2 cursor-pointer hover:bg-gray-200"
            >
              {{ libro.titulo }}
            </li>
          </ul>
        </div>
  
        <div class="mb-4">
          <label for="fechaPrestamo" class="block text-sm font-medium text-gray-700">Fecha de Préstamo</label>
          <input
            v-model="fechaPrestamo"
            @change="actualizarFechaDevolucion"
            type="date"
            id="fechaPrestamo"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="fechaDevolucion" class="block text-sm font-medium text-gray-700">Fecha de Devolución</label>
          <input
            v-model="fechaDevolucion"
            type="date"
            id="fechaDevolucion"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
  
        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Registrar Préstamo
        </button>
      </form>
    </div>
  </template>