<script setup lang="ts"></script>
<template>
    <section class=" flex justify-center items-center bg-[url('~/assets/img/bg-catalog.jpg')] bg-cover  h-[30vh] w-full">
        <CatalogoDropdown 
      buttonText="Categoría: seleccionar..." 
      :items="['Opción 1', 'Opción 2', 'Opción 3']" 
    />
    <CatalogoDropdown 
      buttonText="Ordenar por: seleccionar..." 
      :items="['Opción 1', 'Opción 2', 'Opción 3']" 
    />
    </section>
    <section class="flex flex-wrap ">
        <CatalogoCard autor="Karl Marx" titulo="El capital"/>
        <CatalogoCard autor="Julio Cortazar" titulo="De cronopios y de famas"/>
        <CatalogoCard autor="Ines Vallejo" titulo="El infinito en un junco"/>
        <CatalogoCard autor="Herman Hesse" titulo="Demian"/>
        <CatalogoCard autor="Italo Calvino" titulo="El barón rampante"/>
        <CatalogoCard autor="Ray Bradbury" titulo="Farenheit 451"/>
        <CatalogoCard autor="Eckhart Tolle" titulo="El poder del ahora"/>
        <CatalogoCard autor="Sigmund Freud" titulo="La interpretacion e los sueños"/>
    </section>
</template>