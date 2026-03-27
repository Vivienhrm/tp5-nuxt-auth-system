export default eventHandler(async (event) => {
    // Détruire la session
    await event.context.session.delete()

    return {
        success: true,
        message: "Déconnexion réussie !"
    }
})
