<script setup lang="ts">

</script>
<template>
    <section class="w-full h-[60vh] flex flex-wrap items-start justify-center lg:px-20 md:px-10 px-6 py-10 font-lato bg-[url('~/assets/img/bg-home.jpg')] bg-cover bg-center">
        <NuxtLink to="/quienesSomos">
            <HomeButton text="¿Quienes somos?"/>
        </NuxtLink>
        <NuxtLink to="/noticias">
            <HomeButton text="Noticias"/>
        </NuxtLink>
    </section>
    <section class="flex flex-col md:flex-row p-6 font-lato lg:p-20 md:p-10">
        <h3 class="text-4xl fon-bold">Recomendados</h3>
        <HomeSlider />
    </section>
    <section class="flex items-start bg-primary text-white lg:p-20 md:p-10 p-6 font-lato">
        <GlobalContacto/>
    </section>

</template>