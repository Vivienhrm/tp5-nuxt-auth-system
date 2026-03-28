export default eventHandler(async (event) => {
    // Détruire la session
    if (event.context.session) {
        event.context.session.user = null
    }

    return {
        success: true,
        message: "Déconnexion réussie !"
    }
})
