<script setup lang="ts">

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
});

const route = useRoute()
const router = useRouter()

const componenteActivo = computed(() =>
  route.query.modo === 'registrar' ? 'registrar' : 'visualizar'
)

const mostrarRegistrar = () => {
  router.push({ query: { modo: 'registrar' } })
}

const mostrarVisualizar = () => {
  router.push({ query: { modo: 'visualizar' } })
}
</script>

<template>
    <div class="w-full">
      <AdminVisualizarPrestamosVencidos
        v-if="componenteActivo === 'visualizar'"
        @registrar="mostrarRegistrar"
      />
      <AdminRegistrarPrestamo
        v-if="componenteActivo === 'registrar'"
        @volver="mostrarVisualizar"
      />
    </div>
  </template>