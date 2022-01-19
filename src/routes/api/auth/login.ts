import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'
import { Tedis } from 'tedis'

const db = new Tedis({host: '127.0.0.1', port: 6379})

export async function post({body}) {
    const userData: string | number = await db.get(body.email)
    let user: Object;
    typeof userData === 'string' ? user = JSON.parse(userData) : "Not a string"

    if (!user) {
        return {
            status: 401,
            body: {
                message: "User or Password incorrect"
            }
        }
    }

    if (user['password'] !== stringHash(body.password)) {
        return {
            status: 401,
            body: {
                message: "Unauthorized",
            }
        }
    }

    const cookieId = uuidv4();
    await db.set(cookieId, JSON.stringify({
        email: body.email,
    }))

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', cookieId, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/'
        })
    }

    return {
        status: 200,
        headers,
        body: {
            message: "Success",
        }
    }
}