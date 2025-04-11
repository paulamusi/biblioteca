<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Biblioteca Sudestada',
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>
<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>
