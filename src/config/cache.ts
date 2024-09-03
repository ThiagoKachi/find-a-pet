import { RedisOptions } from 'ioredis';

const tlsOptions = process.env.NODE_ENV === 'prod' ? { rejectUnauthorized: true } : undefined;

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
      ...(tlsOptions && { tls: tlsOptions }),
    }
  },
  driver: 'redis',
} as ICacheConfig;
