import { connect, client } from '$lib/db/client'
import { schema } from '$lib/schemas/car'
import { Repository } from 'redis-om';

async function createCar(data) {
    await connect()
    const repository = new Repository(schema, client)
    const car = repository.createEntity(data);
    const id = await repository.save(car);
    return id;
}

export async function post(request) {
    const id = await createCar(request.body);
    return {
        body: {
            id
        }
    }
}