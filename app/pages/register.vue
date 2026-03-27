<script setup>
const login = ref('')
const password = ref('')
const message = ref('')
const error = ref('')

const register = async () => {
  message.value = ''
  error.value = ''
  
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { 
        login: login.value, 
        password: password.value 
      }
    })
    
    message.value = "Inscription réussie ! Redirection..."
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
  } catch (err) {
    error.value = err.data?.statusMessage || "Erreur pendant l'inscription"
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Création de compte</h1>
    <form @submit.prevent="register">
      <div>
        <label>Login :</label>
        <input v-model="login" type="text" required />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
    
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    
    <p>Déjà un compte ? <NuxtLink to="/login">Se connecter</NuxtLink></p>
  </div>
</template>

<style scoped>
.auth-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; }
.success { color: green; }
.error { color: red; }
form div { margin-bottom: 15px; }
input { width: 100%; padding: 8px; margin-top: 5px; }
button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
</style>
