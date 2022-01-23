export async function createCar(data: Object) {
    const url = '/api/entities/car/create-car';
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    });

    const id = await res.json();
    return id;
}