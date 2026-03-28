<script setup>
const { session } = await useSession()

const login = ref('')
const password = ref('')
const message = ref('')
const error = ref('')

// Si on est déjà connecté, on va direct au dashboard
onMounted(() => {
  if (session.value?.user) {
    navigateTo('/connecte')
  }
})

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
.success { color: #28a745; font-size: 0.95em; margin-top: 15px; text-align: center; }
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
input:focus { outline: none; border-color: #007bff; }
button { 
  width: 100%; 
  padding: 12px; 
  background: #007bff; 
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
a { color: #007bff; text-decoration: none; font-weight: 500; }
a:hover { text-decoration: underline; }
</style>
