<script setup lang="ts">
import { ref } from "vue";

const noticias = [
  { 
    id: "1", 
    titulo: "Visita del Autor Juan Pérez", 
    imagen: "/img/noticias-home.jpg", 
    texto: "El reconocido autor Juan Pérez visitará nuestra biblioteca el próximo viernes para una charla sobre su última novela. Además, firmará ejemplares y responderá preguntas del público. ¡No te lo pierdas!" 
  },
  { 
    id: "2", 
    titulo: "Nueva Colección de Libros Clásicos", 
    imagen: "/img/noticias-catalog.jpg", 
    texto: "Hemos adquirido una nueva colección de libros clásicos que ya está disponible en nuestra biblioteca. Desde ‘Don Quijote’ hasta ‘Orgullo y Prejuicio’, ven a explorar estas maravillosas obras de la literatura universal." 
  },
  { 
    id: "3", 
    titulo: "Club de Lectura: Misterios y Suspenso", 
    imagen: "/img/noticias-login.jpg", 
    texto: "Este mes nuestro club de lectura se adentra en el mundo del misterio y el suspenso con la lectura de 'Los crímenes de la calle Morgue'. Inscríbete y únete a la discusión en nuestra sala de lectura." 
  },
  { 
    id: "4", 
    titulo: "Taller de Escritura Creativa", 
    imagen: "/img/noticias-contact.jpg", 
    texto: "Si te apasiona escribir, este taller es para ti. Aprende técnicas narrativas de la mano de escritores experimentados. Inscripciones abiertas hasta el 10 de este mes. ¡Cupos limitados!" 
  },
  { 
    id: "5", 
    titulo: "Donación de Libros Infantiles", 
    imagen: "/img/noticias-catalog.jpg", 
    texto: "Gracias a la generosidad de nuestros socios, hemos recibido una gran donación de libros infantiles. Ahora los más pequeños podrán disfrutar de nuevas historias llenas de aventuras y aprendizaje." 
  },
  { 
    id: "6", 
    titulo: "Horario Extendido los Sábados", 
    imagen: "/img/noticias-login.jpg", 
    texto: "Para brindarte un mejor servicio, nuestra biblioteca abrirá hasta las 20:00 los sábados. Aprovecha este nuevo horario para estudiar, leer o descubrir nuevos libros. " 
  },
];
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-6xl font-bold mb-6 text-primary text-center">Noticias</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <NoticiasPost v-for="noticia in noticias" :key="noticia.id" :noticia="noticia" />
    </div>
  </div>
</template>