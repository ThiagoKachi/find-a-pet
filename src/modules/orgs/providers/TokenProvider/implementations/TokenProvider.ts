
import { sign } from 'jsonwebtoken';
import { env } from 'src/config/env';
import { ITokenProvider } from '../models/ITokenProvider';

class TokenProvider implements ITokenProvider {
  public async generateToken(payload: string | object | Buffer): Promise<string> {
    return sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
  }
}

export default TokenProvider;
