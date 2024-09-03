import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  }
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
      username: process.env.REDIS_USERNAME || undefined,
      family: 6,
    }
  },
  driver: 'redis',
} as ICacheConfig;
