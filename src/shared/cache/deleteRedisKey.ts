import redisConfig from 'src/config/cache';

import { Redis } from 'ioredis';

const redisClient = new Redis(redisConfig.config.redis);

export async function deleteKeysByPrefix(prefix: string) {
  let cursor = '0';

  do {
    const [newCursor, keys] = await redisClient.scan(cursor, 'MATCH', `${prefix}*`);
    cursor = newCursor;
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } while (cursor !== '0');
}
