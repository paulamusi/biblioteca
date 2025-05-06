<script setup lang="ts">
import { useUsuarios } from "~/composables/useUsuarios";
import type { Usuario } from "~/types/types";

const { agregarUsuario } = useUsuarios();

const emit = defineEmits(["volver"]);
const volver = () => {
  emit("volver");
};

const nombre = ref("");
const apellido = ref("");
const direccion = ref("");
const telefono = ref(null);
const cedula = ref(null);

const submitForm = async () => {
  try {
    const nuevoUsuario: Usuario = {
      nombre: nombre.value,
      apellido: apellido.value,
      direccion: direccion.value || null,
      telefono: telefono.value,
      cedula: cedula.value,
      comentarios: "no comment",
      created_at: new Date().toISOString(), 
    };

    await agregarUsuario(nuevoUsuario);

    nombre.value = "";
    apellido.value = "";
    direccion.value = "";
    telefono.value = null;
    cedula.value = null;

    alert("Usuario registrado correctamente");
  } catch (error) {
    alert("Error al registrar el usuario: " + (error as Error).message);
  }
};
</script>

<template>
    <div class="w-full flex flex-col items-center p-4">
        <button @click="volver" class="self-end mb-10">
        ← Volver a usuarios
        </button>
    <div class="w-full max-w-lg p-4 border rounded-lg shadow-md flex flex-col justify-center">
        <h2 class="text-2xl font-semibold mb-4">Registrar Usuario</h2>

        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="titulo" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    v-model="nombre"
                    type="text"
                    id="titulo"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nombre"
                    required
                />
            </div>

            <div class="mb-4">
                <label for="autor" class="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                    v-model="apellido"
                    type="text"
                    id="autor"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Apellido"
                    required
                />
            </div>

            <div class="mb-4">
                <label for="region" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                    v-model="direccion"
                    type="text"
                    id="region"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Dirección"
                />
            </div>

            <div class="mb-4">
                <label for="pais" class="block text-sm font-medium text-gray-700">Telefono</label>
                <input
                    v-model="telefono"
                    type="number"
                    id="pais"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Telefono"
                />
            </div>
            <div class="mb-4">
                <label for="pais" class="block text-sm font-medium text-gray-700">Cedula</label>
                <input
                    v-model="cedula"
                    type="number"
                    id="pais"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Cedula"
                />
            </div>

            <button
                type="submit"
                class="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                Registrar usuario
            </button>
        </form>
    </div>
</div>
</template>