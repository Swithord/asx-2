import { put, list, del } from '@vercel/blob';

export interface Article {
    title: string;
    key: string;
    timestamp: string;
    bannerUrl: string;
    content: string;
}

export interface NewsPage {
    items: Article[];
    nextKey?: string;
    pageSize?: number;
}

const INDEX_PATH = 'posts/index.json';

export function markdownToPlainText(md: string): string {
    if (!md) return '';
    let s = String(md).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    s = s.replace(/```[\s\S]*?```/g, '');
    s = s.replace(/~~~[\s\S]*?~~~/g, '');
    s = s.replace(/<\/?[^>]+(>|$)/g, '');
    s = s.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (_m, e) => {
        if (e[0] === '#') {
            const isHex = e[1] === 'x' || e[1] === 'X';
            const num = isHex ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
            return isNaN(num) ? '' : String.fromCharCode(num);
        }
        const map: Record<string, string> = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
        return map[e] ?? '';
    });
    s = s.replace(/!\[([^\]]*)\]\([^\)]*\)/g, '$1');
    s = s.replace(/\[([^\]]+)\]\([^\)]*\)/g, '$1');
    s = s.replace(/`([^`]+)`/g, '$1');
    s = s.replace(/(\*\*|__)(.*?)\1/g, '$2');
    s = s.replace(/(\*|_)(.*?)\1/g, '$2');
    s = s.replace(/~~(.*?)~~/g, '$1');
    s = s.replace(/^\s{0,3}#{1,6}\s*/gm, '');
    s = s.replace(/^\s*([-*+])\s+/gm, '');
    s = s.replace(/^\s*\d+\.\s+/gm, '');
    s = s.replace(/^\s*>\s?/gm, '');
    s = s.replace(/\n{3,}/g, '\n\n');
    return s.trim();
}

async function readIndex(): Promise<Article[]> {
    try {
        const { blobs } = await list({ prefix: INDEX_PATH });
        if (!blobs.length) return [];
        const latest = blobs.sort((a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];
        const res = await fetch(latest.url, { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

async function writeIndex(articles: Article[]): Promise<void> {
    await put(INDEX_PATH, JSON.stringify(articles), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
    });
}

export async function getIndex(pageSize = 10, startKey?: string): Promise<NewsPage> {
    const all = await readIndex();
    let start = 0;
    if (startKey) {
        const idx = all.findIndex(a => a.key === startKey);
        if (idx !== -1) start = idx + 1;
    }
    const items = all.slice(start, start + pageSize);
    const hasMore = start + pageSize < all.length;
    const nextKey = hasMore ? items[items.length - 1]?.key : undefined;
    return { items, nextKey };
}

export async function getArticleBlob(key: string): Promise<Article | null> {
    try {
        const { blobs } = await list({ prefix: `posts/${key}.json` });
        if (!blobs.length) return null;
        const latest = blobs.sort((a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];
        const res = await fetch(latest.url, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function createArticleBlob(article: Omit<Article, 'timestamp'>): Promise<Article> {
    const full: Article = { ...article, timestamp: new Date().toISOString() };

    await put(`posts/${full.key}.json`, JSON.stringify(full), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
    });

    const index = await readIndex();
    index.unshift({ ...full, content: markdownToPlainText(full.content) });
    await writeIndex(index);

    return full;
}

export async function deleteArticleBlob(key: string): Promise<void> {
    const { blobs } = await list({ prefix: `posts/${key}.json` });
    if (blobs.length) await del(blobs.map(b => b.url));

    const index = await readIndex();
    const filtered = index.filter(a => a.key !== key);
    if (filtered.length !== index.length) await writeIndex(filtered);
}

export async function editArticleBlob(
    key: string,
    updates: Partial<Pick<Article, 'title' | 'content' | 'bannerUrl'>>
): Promise<Article> {
    const existing = await getArticleBlob(key);
    if (!existing) throw new Error(`Article "${key}" not found`);

    const updated: Article = { ...existing, ...updates };

    await put(`posts/${key}.json`, JSON.stringify(updated), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
    });

    const index = await readIndex();
    const i = index.findIndex(a => a.key === key);
    if (i !== -1) {
        index[i] = { ...updated, content: markdownToPlainText(updated.content) };
        await writeIndex(index);
    }

    return updated;
}
