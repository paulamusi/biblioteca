<script setup lang="ts">
</script>
<template>
    <section class="h-[40vh] w-full"><img src="~/assets/img/bg-home.jpg" alt="Image library" class="object-cover w-full h-full"/></section>
    <section class="flex gap-5 justify-between lg:px-20 md:px-10 px-6 py-10 font-lato">
        <NuxtLink to="/quienesSomos">
            <HomeButton text="¿Quienes somos?"/>
        </NuxtLink>
        <NuxtLink to="/catalogo">
            <HomeButton text="Catálogo"/>
        </NuxtLink>
        <NuxtLink to="/noticias">
            <HomeButton text="Noticias"/>
        </NuxtLink>
    </section>
    <section class="flex bg-primary text-white lg:p-20 md:p-10 p-6 font-lato">
        <GlobalContacto/>
    </section>
</template>