import { db } from "$lib/db/redis"

export async function post({ body, locals }) {
    const userData: string | number = await db.get(body.email)
    const authenticated = locals.authenticated;
    let user: Object;
    typeof userData === 'string' ? user = JSON.parse(userData) : "Not a string"

    if (!authenticated) {
        return {
            status: 401,
            body: {
                message: 'Authentication Required'
            }
        }
    }
    if (user) {
        delete user['password']
        return {
            status: 200,
            body: user,
        }
    }
}