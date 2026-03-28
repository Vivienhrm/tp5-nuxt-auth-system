<script setup>
// Protéger la page avec le middleware
definePageMeta({
  middleware: 'auth'
})

const { session, remove } = await useSession()

const logout = async () => {
  try {
    // 1. On avertit le Backend pour qu'il détruise la session serveur
    await $fetch('/api/auth/logout', { method: 'DELETE' })
    // 2. On nettoie aussi la session côté Front
    await remove()
    // 3. Redirection
    navigateTo('/login')
  } catch (err) {
    console.error("Erreur déconnexion:", err)
  }
}
</script>

<template>
  <div class="dashboard auth-card">
    <h1>Page Connecté</h1>
    <p v-if="session?.user">Bienvenue, <strong>{{ session.user.login }}</strong> !</p>
    
    <button @click="logout" class="btn-logout">Se déconnecter</button>
  </div>
</template>

<style scoped>
.auth-card { 
  max-width: 600px; 
  margin: 50px auto; 
  padding: 30px; 
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0; 
  text-align: center; 
  font-family: sans-serif;
}
h1 { color: #333; margin-top: 0; }
.btn-logout { 
  margin-top: 25px; 
  padding: 10px 20px; 
  background: #dc3545; 
  color: white; 
  border: none; 
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer; 
  transition: opacity 0.2s;
}
.btn-logout:hover { opacity: 0.85; }
</style>
