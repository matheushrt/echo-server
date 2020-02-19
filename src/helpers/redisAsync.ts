import redis from 'redis';
import { promisify } from 'util';

export const client = redis.createClient();

client.on('error', function(error) {
  console.error(error);
});

export const setAsync = promisify(client.set).bind(client);
export const getAsync = promisify(client.get).bind(client);
export const hmsetAsync = promisify(client.hmset).bind(client);
export const hgetallAsync = promisify(client.hgetall).bind(client);
