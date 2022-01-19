import { parse } from 'cookie';
import { Tedis } from 'tedis';

const db = new Tedis({ host: '127.0.0.1', port: 6379 })

export async function handle({ request, resolve }) {
    const cookies = parse(request.headers.cookie || '');

    if (cookies.session_id) {
        const sessionData = await db.get(cookies.session_id)
        let session: JSON;
        if (typeof sessionData === 'string') {
            session = JSON.parse(sessionData);
        }
        if (session) {
            request.locals.authenticated = true;
            request.locals.email = session['email'];
            return resolve(request)
        }
    }

    request.locals.authenticated = false;
    return resolve(request)
}

export function getSession(request) {
    return request?.locals?.authenticated
        ? {
            user: {
                authenticated: request.locals.authenticated,
                email: request.locals.email,
            }
        }
        : {
            user: {
                authenticated: request.locals.authenticated,
                email: '',
            }
        }
}