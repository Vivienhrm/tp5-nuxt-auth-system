export default defineNuxtRouteMiddleware((to, from) => {
    // useSession() est fourni par @sidebase/nuxt-session
    const { session } = useSession()

    // Si l'utilisateur n'est pas connecté (pas d'info 'user' en session)
    if (!session.value?.user) {
        // Rediriger vers la page de connexion
        return navigateTo('/login')
    }
})
