import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.redisClient.set(`refreshToken:${userId}`, refreshToken, 'EX', 5184000); // Expire in 60 days
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    return this.redisClient.get(`refreshToken:${userId}`);
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.redisClient.del(`refreshToken:${userId}`);
  }

  async checkRefreshTokenExpiration(userId: string): Promise<boolean> {
    const expirationTimestamp: number | null =
      await this.getRefreshTokenExpirationFromRedis(userId);

    return expirationTimestamp !== null && expirationTimestamp > Math.floor(Date.now() / 1000);
  }

  private async getRefreshTokenExpirationFromRedis(userId: string): Promise<number | null> {
    const ttl = await this.redisClient.ttl(`refreshToken:${userId}`);

    return ttl >= 0 ? Math.floor(Date.now() / 1000) + ttl : null;
  }
}
