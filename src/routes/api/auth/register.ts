import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'
import { db } from "$lib/db/redis"

export async function post({body}) {
    const userData: string | number = await db.get(body.email)
    let user: Object;
    typeof userData === 'string' ? user = JSON.parse(userData) : "Not a string"

    if (user) {
        return {
            status: 409,
            body: {
                message: "User already exists"
            }
        }
    }

    await db.set(body.email, JSON.stringify({
        email: body.email,
        password: stringHash(body.password),
        name: body.name,
    }))

    const cookieId = uuidv4();
    await db.setex(cookieId, 60*60*24, JSON.stringify({
        email: body.email,
    }))

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', cookieId, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
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