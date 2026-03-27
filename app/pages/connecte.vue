<script setup>
// Protéger la page avec le middleware
definePageMeta({
  middleware: 'auth'
})

const { session, remove } = await useSession()

const logout = async () => {
  try {
    // Utilisation de la méthode native de @sidebase/nuxt-session
    await remove()
    // On redirige vers login ensuite
    navigateTo('/login')
  } catch (err) {
    console.error("Erreur déconnexion:", err)
  }
}
</script>

<template>
  <div class="dashboard">
    <h1>Page Connecté</h1>
    <p v-if="session?.user">Bienvenue, <strong>{{ session.user.login }}</strong> !</p>
    
    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<style scoped>
.dashboard { max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; text-align: center; }
button { margin-top: 20px; padding: 10px 20px; background: #dc3545; color: white; border: none; cursor: pointer; }
</style>
