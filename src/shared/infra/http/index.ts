import FastifyCORS from '@fastify/cors';
import FastifyJWT from '@fastify/jwt';
import { Prisma } from '@prisma/client';
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { env } from 'src/config/env';
import { AppError } from 'src/shared/errors/AppError';
import { ZodError } from 'zod';
import { appRoutes } from './routes';

export const fastify = Fastify();

fastify.register(FastifyCORS);
fastify.register(FastifyJWT, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d'
  }
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
