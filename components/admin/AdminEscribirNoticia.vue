<script setup lang="ts">
</script>
<template>
    <div class="max-w-lg mx-auto p-4 border rounded-lg shadow-md"
    >
        <h1 class="text-xl font-bold">Publicar noticias/informacion</h1>
        <form>
            <div class="mb-4">
                <label for="titulo" class="block text-sm font-medium text-gray-700">Titulo</label>
                <input
                    type="text"
                    id="titulo"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Titulo"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="titulo" class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea  placeholder="descripcion" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">

                </textarea>
            </div>
            <div class="mb-4">
                <label for="titulo" class="block text-sm font-medium text-gray-700">Subir imagen</label>
                <input type="file" accept="image/*">
            </div>

            <button
                type="submit"
                class="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                Publicar
            </button>
        </form>
    </div>
</template>