<script setup lang="ts">
import GlobalNav from '@/components/GlobalNav.vue';</script>
<template>
    <div class="flex justify-between h-20 items-center lg:px-20 md:px-8 px-6">
        <NuxtLink to="/">
            <div class="flex gap-4 items-center">
                <img src="~/assets/img/logobiblioteca.jpg" alt="Image library" class="w-auto h-16"/>
                <h1 class="text-xl uppercase text-primary">Biblioteca <span class="block">Sudestada</span></h1>
            </div>
        </NuxtLink>
        <GlobalNav />
    </div>
</template>