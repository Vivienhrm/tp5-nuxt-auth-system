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
.auth-container { 
  max-width: 400px; 
  margin: 60px auto; 
  padding: 30px; 
  background: white;
  border: 1px solid #eaeaea; 
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  font-family: sans-serif;
}
h1 { color: #333; margin-top: 0; margin-bottom: 25px; text-align: center; }
.error { color: #dc3545; font-size: 0.9em; margin-top: 15px; text-align: center; }
form div { margin-bottom: 20px; }
label { display: block; margin-bottom: 5px; color: #555; font-weight: 500; font-size: 0.95em; }
input { 
  width: 100%; 
  padding: 10px 12px; 
  border: 1px solid #ccc; 
  border-radius: 6px; 
  box-sizing: border-box;
}
input:focus { outline: none; border-color: #28a745; }
button { 
  width: 100%; 
  padding: 12px; 
  background: #28a745; 
  color: white; 
  border: none; 
  border-radius: 6px; 
  font-weight: bold;
  font-size: 1em;
  cursor: pointer; 
  transition: opacity 0.2s;
}
button:hover { opacity: 0.9; }
p { text-align: center; margin-top: 20px; font-size: 0.9em; color: #666; }
a { color: #28a745; text-decoration: none; font-weight: 500; }
a:hover { text-decoration: underline; }
</style>
