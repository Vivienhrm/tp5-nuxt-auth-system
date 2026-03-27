<script setup>
const { session } = await useSession()

const login = ref('')
const password = ref('')
const error = ref('')

// Si on est déjà connecté, on va direct au dashboard
onMounted(() => {
  if (session.value?.user) {
    navigateTo('/connecte')
  }
})

const connect = async () => {
  error.value = ''
  
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { 
        login: login.value, 
        password: password.value 
      }
    })
    
    // Une fois connecté, on redirige vers l'accueil (qui sera protégée)
    navigateTo('/connecte')
  } catch (err) {
    error.value = err.data?.statusMessage || "Login ou mot de passe incorrect"
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Connexion</h1>
    <form @submit.prevent="connect">
      <div>
        <label>Login :</label>
        <input v-model="login" type="text" required />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    
    <p v-if="error" class="error">{{ error }}</p>
    
    <p>Pas de compte ? <NuxtLink to="/register">S'inscrire</NuxtLink></p>
  </div>
</template>

<style scoped>
.auth-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; }
.error { color: red; }
form div { margin-bottom: 15px; }
input { width: 100%; padding: 8px; margin-top: 5px; }
button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; }
</style>
