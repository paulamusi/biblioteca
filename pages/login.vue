<script setup lang="ts">
const handleSubmit = (event: Event) => {
  event.preventDefault();
  console.log("Formulario enviado");
};
</script>
<template>
    <div class="bg-gradient-to-r from-primary via-[#e9cda3] to-primary flex flex-col md:flex-row justify-between items-center">

      <div class="h-fit w-auto"><img src="~/assets/img/bg-Login.jpg" alt="book open" class="object-contain w-fit"/></div>
      
      <!-- Formulario -->
      <div class="w-full flex justify-center p-6">
        <div class="w-[300px]">
          <h2 class="text-2xl font-bold mb-6 text-senf text-center">Login</h2>
          <form @submit="handleSubmit" class="space-y-4">
            <div>
              <label for="email" class="block text-senf font-medium mb-2">Email</label>
              <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label for="password" class="block text-senf font-medium mb-2">Contraseña</label>
              <input
              type="password"
              id="password"
              name="password"
              required
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
            type="submit"
            class="w-full bg-primary text-senf py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
            >
            Iniciar sesión
            </button>
          </form>
      </div>
      </div>
    </div>
  </template> 