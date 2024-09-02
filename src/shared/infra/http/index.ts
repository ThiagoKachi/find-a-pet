import FastifyCORS from '@fastify/cors';
import helmet from '@fastify/helmet';
import FastifyJWT from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import { Prisma } from '@prisma/client';
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { Redis } from 'ioredis';
import redisConfig from 'src/config/cache';
import { env } from 'src/config/env';
import { AppError } from 'src/shared/errors/AppError';
import { ZodError } from 'zod';
import { appRoutes } from './routes';

export const fastify = Fastify();

fastify.register(helmet, { global: true });
fastify.register(fastifyMultipart);
fastify.register(FastifyCORS);
fastify.register(FastifyJWT, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d'
  }
});

fastify.register(rateLimit, {
  global: true,
  max: 100,
  redis: new Redis(
    redisConfig.config.redis,
  ),
  errorResponseBuilder: () => {
    throw new AppError('Too many requests', 429);
  },
});

fastify.register(appRoutes);

fastify.setErrorHandler((err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (err instanceof AppError) {
    reply.status(err.statusCode).send({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);

  if (err instanceof ZodError) {
    return reply.status(400).send({
      status: 'error',
      message: err.issues
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return reply.status(404).send({
      status: 'error',
      message: `[${err.code}] - ${err.meta?.modelName} - ${err.meta?.cause}`,
    });
  }

  reply.status(500).send({
    status: 'error',
    message: 'Internal server error'
  });

  return reply;
});
