import jwt from 'jsonwebtoken';

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return secret;
}

export function generateToken(): string {
  return jwt.sign(
    { 
      isAdmin: true,
      iat: Math.floor(Date.now() / 1000)
    },
    getJWTSecret(),
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, getJWTSecret());
    return true;
  } catch (error) {
    return false;
  }
}
