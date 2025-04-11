<script setup lang="ts">
import { ref } from "vue";
import { useSupabaseClient } from "#imports";

const client = useSupabaseClient()
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const successMsg = ref("");

async function loginUser() {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.error("Supabase error:", error.message); 
      throw error;
    }
    successMsg.value = "Te has logueado correctamente";
    errorMsg.value = "";
    navigateTo("/");
  } catch (error) {
    errorMsg.value = (error as Error).message || "Error signing up"; 
    successMsg.value = "";
    return;
  }
}
async function registerUser() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.error("Supabase error:", error.message); 
      throw error;
    }
    successMsg.value = "Check your email for confirmation";
    errorMsg.value = "";
  } catch (error) {
    errorMsg.value = (error as Error).message || "Error signing up"; 
    successMsg.value = "";
  }
}
</script>
<template>
    <div class="bg-gradient-to-r from-primary via-[#e9cda3] to-primary flex flex-col md:flex-row justify-between items-center">

      <div class="h-fit w-auto"><img src="~/assets/img/bg-Login.jpg" alt="book open" class="object-contain w-fit"/></div>
      <div class="w-full flex justify-center p-6">
        <div class="w-[300px]">
          <h2 class="text-2xl font-bold mb-6 text-senf text-center">Login</h2>
          <form @submit.prevent ="loginUser" class="space-y-4">
            <div>
              <label for="email" class="block text-senf font-medium mb-2">Email</label>
              <input
              v-model="email"
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
              v-model="password"
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
<!--       <div>
        <form @submit.prevent ="registerUser">
            <input v-model="email" type="email" placeholder="Email"/>
            <input v-model="password"  type="password" placeholder="Password"/>
            <button type="submit">Registrarse</button>
            <p v-if="successMsg" class="text-green-600">{{ successMsg }}</p>
            <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>
        </form>
      </div> -->
      </div>
    </div>
  </template> 