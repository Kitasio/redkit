import { Entity, Schema } from 'redis-om';

class Car extends Entity {}
export const schema = new Schema(Car, {
    make: { type: 'string' },
    model: { type: 'string' },
    images: { type: 'string' },
    year: { type: 'number'},
    description: { type: 'string' },
    sold: { type: 'boolean' },
}, {
    dataStructure: 'JSON',
})