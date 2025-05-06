<script setup lang="ts">
import type { Usuario } from "~/types/types";
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
const route = useRoute()
const router = useRouter()
const { buscarUsuarioPorId } = useUsuarios()

const componenteActivo = computed(() => {
  if (route.query.modo === 'registrar') return 'registrar'
  if (route.query.modo === 'editar') return 'editar'
  return 'visualizar'
})

const usuarioSeleccionado = ref<Usuario | null>(null)

watchEffect(async () => {
  if (route.query.modo === 'editar' && route.query.id) {
    const id = Number(route.query.id)
    const usuario = await buscarUsuarioPorId(id)
    if (usuario) {
      usuarioSeleccionado.value = usuario
    } else {
      usuarioSeleccionado.value = null
      router.push({ query: { modo: 'visualizar' } })
    }
  } else {
    usuarioSeleccionado.value = null
  }
})

const mostrarRegistrar = () => {
  router.push({ query: { modo: 'registrar' } })
}
const mostrarVisualizar = () => {
  router.push({ query: { modo: 'visualizar' } })
}
const mostrarEditar = (usuario: Usuario) => {
  router.push({ query: { modo: 'editar', id: usuario.id } })
}
</script>

<template>
    <div class="w-full">
      <AdminVisualizarUsuarios 
        v-if="componenteActivo === 'visualizar'" 
        @cambiarComponente="mostrarRegistrar"
        @editarUsuario="mostrarEditar"
      />
      <AdminRegistrarUsuario 
        v-if="componenteActivo === 'registrar'"
        @volver="mostrarVisualizar"
      />
      <AdminEditarUsario
        v-if="componenteActivo === 'editar' && usuarioSeleccionado"
        :usuario="usuarioSeleccionado"
        @volver="mostrarVisualizar"
      />
    </div>
  </template>