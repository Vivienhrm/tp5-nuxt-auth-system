<script setup>
const { session } = await useSession()

onMounted(() => {
  if (session.value?.user) {
    navigateTo('/connecte')
  }
})
</script>

<template>
  <div class="home-container">
    <h1>Bienvenue sur le TP5</h1>
    <p>Système d'authentification Nuxt 3/4 + MySQL</p>
    
    <div class="actions">
      <NuxtLink to="/login" class="btn login">Se connecter</NuxtLink>
      <NuxtLink to="/register" class="btn register">Créer un compte</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
.actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.btn {
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}
.login { background-color: #28a745; }
.register { background-color: #007bff; }
</style>
