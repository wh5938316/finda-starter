import * as crypto from 'crypto';

interface JwtHeader {
  alg: string;
  typ: string;
}

interface JwtPayload {
  [key: string]: any;
  iat: number;
  exp?: number;
  sub?: string;
}

/**
 * 签名JWT
 * @param payload JWT的数据负载
 * @param secret 密钥
 * @param expiresIn 过期时间（秒）
 * @returns 签名后的JWT
 */
export function signJwt(
  payload: Omit<JwtPayload, 'iat'>,
  secret: string,
  expiresIn?: number,
): string {
  const header: JwtHeader = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
  };

  if (expiresIn) {
    fullPayload.exp = now + expiresIn;
  }

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');

  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * 验证JWT
 * @param token JWT令牌
 * @param secret 密钥
 * @returns 解码后的payload，如果无效则返回null
 */
export function verifyJwt(token: string, secret: string): JwtPayload | null {
  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }

  const [headerBase64, payloadBase64, signatureBase64] = parts;

  // 验证签名
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest('base64url');

  if (expectedSignature !== signatureBase64) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString());

    // 检查过期时间
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * 从JWT中解码payload，不验证签名
 * @param token JWT令牌
 * @returns 解码后的payload，如果解析失败则返回null
 */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    return JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  } catch (error) {
    return null;
  }
}
