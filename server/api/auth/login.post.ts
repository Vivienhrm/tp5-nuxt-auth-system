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

        // 1. Chercher l'utilisateur en base
        const [rows]: any = await db.execute(
            'SELECT id, login, password FROM users WHERE login = ?',
            [login]
        )

        const user = rows[0]

        // 2. Si pas d'utilisateur trouvé
        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: "Login ou mot de passe incorrect."
            })
        }

        // 3. Vérifier le mot de passe haché
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw createError({
                statusCode: 401,
                statusMessage: "Login ou mot de passe incorrect."
            })
        }

        // 4. Stocker les infos dans la session (@sidebase/nuxt-session)
        // On ne stocke jamais le mot de passe en session
        event.context.session.user = {
            id: user.id,
            login: user.login
        }

        return {
            success: true,
            message: "Connexion réussie !",
            user: event.context.session.user
        }
    } catch (error: any) {
        // Si l'erreur vient d'un createError déjà lancé, on la renvoie
        if (error.statusCode) throw error

        throw createError({
            statusCode: 500,
            statusMessage: "Erreur pendant la connexion.",
            data: error.message
        })
    }
})
