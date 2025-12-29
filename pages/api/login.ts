import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '@/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = generateToken();
    
    res.setHeader(
      'Set-Cookie',
      `admin-token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
    );
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ message: 'Invalid password' });
}