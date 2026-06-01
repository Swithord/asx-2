import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/utils/auth';
import { getIndex, createArticleBlob } from '@/utils/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const pageSize = Number(req.query.pageSize) || 10;
        const startKey = typeof req.query.startKey === 'string' ? req.query.startKey : undefined;
        const data = await getIndex(pageSize, startKey);
        return res.status(200).json(data);
    }

    if (req.method === 'POST') {
        const token = req.cookies['admin-token'] || '';
        if (!verifyToken(token)) return res.status(401).json({ message: 'Unauthorized' });

        const { key, title, content, bannerUrl } = req.body;
        if (!key || !title || !content) {
            return res.status(400).json({ message: 'key, title, and content are required' });
        }

        const article = await createArticleBlob({ key, title, content, bannerUrl: bannerUrl ?? '' });
        return res.status(201).json(article);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
