import * as crypto from 'crypto';

/**
 * 哈希密码
 * @param password 明文密码
 * @returns 哈希后的密码
 */
export async function hashPassword(password: string): Promise<string> {
  // 生成随机盐值
  const salt = crypto.randomBytes(16).toString('hex');

  // 使用scrypt算法哈希密码 (Node.js内置)
  return new Promise<string>((resolve, reject) => {
    const keyLen = 64;
    crypto.scrypt(password, salt, keyLen, (err, derivedKey) => {
      if (err) reject(err);
      // 格式: salt:hash
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * 验证密码
 * @param params 包含哈希和明文密码的对象
 * @returns 密码是否匹配
 */
export async function verifyPassword(params: { hash: string; password: string }): Promise<boolean> {
  const { hash, password } = params;
  const [salt, key] = hash.split(':');

  if (!salt || !key) return false;

  return new Promise<boolean>((resolve, reject) => {
    const keyLen = 64;
    crypto.scrypt(password, salt, keyLen, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }

      // 安全比较，防止时序攻击
      resolve(crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey));
    });
  });
}

/**
 * 生成安全的随机令牌
 * @param length 令牌长度，默认为32
 * @returns 生成的令牌
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
