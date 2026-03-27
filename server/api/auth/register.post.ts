import bcrypt from 'bcrypt'

export default eventHandler(async (event) => {
    const body = await readBody(event)
    const { login, password } = body

    if (!login || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Le login et le mot de passe sont requis."
        })
    }

    try {
        const db = useDb()

        // 1. Hacher le mot de passe (10 rounds de salt)
        const hashedPassword = await bcrypt.hash(password, 10)

        // 2. Insérer dans la base de données
        await db.execute(
            'INSERT INTO users (login, password) VALUES (?, ?)',
            [login, hashedPassword]
        )

        return {
            success: true,
            message: "Utilisateur créé avec succès !"
        }
    } catch (error: any) {
        // Si l'erreur est liée à un login déjà existant (colonne UNIQUE)
        if (error.code === 'ER_DUP_ENTRY') {
            throw createError({
                statusCode: 409,
                statusMessage: "Ce login est déjà utilisé."
            })
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la création de l'utilisateur.",
            data: error.message
        })
    }
})
