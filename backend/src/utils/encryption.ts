import argon from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await argon.hash(password);
    return hash;
  } catch (error) {
    throw error;
  }
}

export async function verifyHashedPassword(hash: string, password: string) {
  try {
    const verify = await argon.verify(hash, password);
    return verify;
  } catch (error) {
    throw error; // this error will bubble up and caught by the error handling middleware
  }
}
