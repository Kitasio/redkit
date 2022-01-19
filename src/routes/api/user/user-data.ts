import { Tedis } from 'tedis'

const db = new Tedis({ host: '127.0.0.1', port: 6379 })

export async function post({ body, locals }) {
    const userData: string | number = await db.get(body.email)
    let user: Object;
    typeof userData === 'string' ? user = JSON.parse(userData) : "Not a string"

    if (!locals.authenticated) {
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