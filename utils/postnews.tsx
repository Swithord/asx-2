import { upload } from '@vercel/blob/client';

interface Post {
    key: string;
    title: string;
    content: string;
    bannerUrl: string;
}

export async function uploadImage(file: File): Promise<string> {
    const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
    });
    return blob.url;
}

export async function createPost({ key, title, content, bannerUrl }: Post): Promise<void> {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, title, content, bannerUrl }),
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to create post: ${res.status}${body ? ` - ${body}` : ''}`);
    }
}
