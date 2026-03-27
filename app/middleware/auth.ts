export default defineNuxtRouteMiddleware(async (to, from) => {
    const sessionData = useSession()
    const { session } = sessionData instanceof Promise ? await sessionData : sessionData

    // Si l'utilisateur n'est pas connecté
    if (!session.value?.user) {
        return navigateTo('/login')
    }
})
