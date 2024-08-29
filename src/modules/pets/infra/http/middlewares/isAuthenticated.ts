import { FastifyReply, FastifyRequest } from 'fastify';

export async function authPetMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { orgId } = await request.jwtVerify() as { orgId: string };

    request.orgId = orgId;
  } catch {
    return reply
      .code(401)
      .send({ error: 'Invalid credentials' });
  }
}
