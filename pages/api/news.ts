// Re-export types so existing imports keep working
export type { Article, NewsPage } from '@/utils/storage';

// These functions are for client-side use only.
// Server-side code (getServerSideProps) should import from @/utils/storage directly.

import type { Article, NewsPage } from '@/utils/storage';

export async function fetchNews(pageSize?: number, startKey?: string): Promise<NewsPage> {
    const params = new URLSearchParams();
    if (pageSize != null) params.set('pageSize', String(pageSize));
    if (startKey) params.set('startKey', startKey);

    const res = await fetch(`/api/posts?${params}`);
    if (!res.ok) throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    return await res.json();
}

export async function getArticle(key: string): Promise<Article | null> {
    const res = await fetch(`/api/posts/${encodeURIComponent(key)}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    return await res.json();
}

export async function editArticle(
    key: string,
    updates: Partial<Pick<Article, 'title' | 'content' | 'bannerUrl'>>
): Promise<Article> {
    const res = await fetch(`/api/posts/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Failed to edit article: ${res.status} ${res.statusText}`);
    return await res.json();
}
