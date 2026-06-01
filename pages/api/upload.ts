import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const jsonResponse = await handleUpload({
            body: req.body as HandleUploadBody,
            request: req,
            onBeforeGenerateToken: async () => {
                const token = req.cookies['admin-token'] || '';
                if (!verifyToken(token)) throw new Error('Unauthorized');
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'],
                    addRandomSuffix: true,
                };
            },
            onUploadCompleted: async () => {},
        });
        return res.status(200).json(jsonResponse);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}
