import { variables } from '$lib/variables'
import { Tedis } from 'tedis';

export const db = new Tedis({ host: variables.REDIS_HOST, port: variables.REDIS_PORT, password: variables.REDIS_PASS })