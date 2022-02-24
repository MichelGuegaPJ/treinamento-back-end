import { compare, hash } from 'bcryptjs';

import IHashProvider from './IHashProvider';

class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const cryptoPassword = await hash(payload, 8);
    return cryptoPassword;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const payLoadMatched = await compare(payload, hashed);
    return payLoadMatched;
  }
}

export default HashProvider;
