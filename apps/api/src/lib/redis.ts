import { Redis } from '@upstash/redis';
import env from './env.js';
import type { SecondaryStorage } from 'better-auth';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const prefix = 'better-auth:';

export const redisSecondaryStorage: SecondaryStorage = {
  get(key) {
    return redis.get(`${prefix}${key}`);
  },

  getAndDelete(key) {
    return redis.getdel(`${prefix}${key}`);
  },

  async increment(key, ttl) {
    if (!Number.isInteger(ttl) || ttl <= 0) {
      throw new TypeError('Redis increment TTL must be a positive integer');
    }
    const [value] = await redis
      .multi()
      .incr(`${prefix}${key}`)
      .expire(`${prefix}${key}`, ttl, 'NX')
      .exec();
    return value;
  },

  async set(key, value, ttl) {
    if (ttl) {
      await redis.set(`${prefix}${key}`, value, { ex: ttl });
    } else {
      await redis.set(`${prefix}${key}`, value);
    }
  },

  async delete(key) {
    await redis.del(`${prefix}${key}`);
  },
};
