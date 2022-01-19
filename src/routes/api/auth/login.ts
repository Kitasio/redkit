import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'
import { db } from "$lib/db/redis"

export async function post(request) {
    const userData: string | number = await db.get(request.body.email)
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

    if (user['password'] !== stringHash(request.body.password)) {
        return {
            status: 401,
            body: {
                message: "Unauthorized",
            }
        }
    }

    const oldCookie = cookie.parse(request.headers.cookie || '')
    if(oldCookie.session_id) {
        db.del(oldCookie.session_id)
    }

    const cookieId = uuidv4();
    await db.setex(cookieId, 60*60*24, JSON.stringify({
        email: request.body.email,
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