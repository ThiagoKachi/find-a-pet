import { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { orgId } = await request.jwtVerify() as { orgId: string };
    const { id } = request.params as { id: string };

    if (id !== orgId) {
      return reply
        .code(401)
        .send({ error: 'Unauthorized' });
    }

    request.orgId = orgId;
  } catch {
    return reply
      .code(401)
      .send({ error: 'Invalid credentials' });
  }
}
