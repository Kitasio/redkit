import { connect, client } from '$lib/db/client'
import { schema } from '$lib/schemas/car'
import { Repository } from 'redis-om';

async function getCar(id) {
    await connect()
    const repository = new Repository(schema, client)
    let data = await repository.fetch(id)
    return data
}

export async function post(request) {
    const data = await getCar(request.body);
    return {
        body: {
            data,
        }
    }
}