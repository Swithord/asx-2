'use server';

export interface Article {
    title: string;
    key: string;
    timestamp: string; // ISO 8601, e.g. "2025-06-01T10:25:14.750899"
    bannerUrl: string;
    content: string;
}

export interface NewsPage {
    items: Article[];
    nextKey?: string;
    pageSize?: number;
}

export async function fetchNews(pageSize?: number, startKey?: string): Promise<NewsPage> {
    console.log('Fetching news with pageSize:', pageSize, 'startKey:', startKey);
    const url = new URL('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/all-news');
    if (pageSize != null) url.searchParams.set('pageSize', String(pageSize));
    if (startKey) url.searchParams.set('startKey', startKey);

    let res;
    try {
        res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }

    const data = await res.json();
    if (!data || !Array.isArray(data.items)) {
        throw new Error('Unexpected response format: expected an object with an "items" array');
    }

    function markdownToPlainText(md: string): string {
        if (!md) return '';
        let s = String(md).replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        // Remove fenced code blocks
        s = s.replace(/```[\s\S]*?```/g, '');
        s = s.replace(/~~~[\s\S]*?~~~/g, '');

        // Strip HTML tags
        s = s.replace(/<\/?[^>]+(>|$)/g, '');

        // Decode common HTML entities and numeric entities
        s = s.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (_m, e) => {
            if (e[0] === '#') {
                const isHex = e[1] === 'x' || e[1] === 'X';
                const num = isHex ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
                return isNaN(num) ? '' : String.fromCharCode(num);
            }
            const map: Record<string,string> = {nbsp:' ',amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
            return map[e] ?? '';
        });

        // Images: keep alt text, links: keep link text
        s = s.replace(/!\[([^\]]*)\]\([^\)]*\)/g, '$1');
        s = s.replace(/\[([^\]]+)\]\([^\)]*\)/g, '$1');

        // Inline code and emphasis
        s = s.replace(/`([^`]+)`/g, '$1');
        s = s.replace(/(\*\*|__)(.*?)\1/g, '$2');
        s = s.replace(/(\*|_)(.*?)\1/g, '$2');
        s = s.replace(/~~(.*?)~~/g, '$1');

        // Headings, lists, blockquotes
        s = s.replace(/^\s{0,3}#{1,6}\s*/gm, '');
        s = s.replace(/^\s*([-*+])\s+/gm, '');
        s = s.replace(/^\s*\d+\.\s+/gm, '');
        s = s.replace(/^\s*>\s?/gm, '');

        // Collapse multiple blank lines
        s = s.replace(/\n{3,}/g, '\n\n');

        return s.trim();
    }

    const items: Article[] = data.items.map((item: any) => {
        const contentMd = String(item.content ?? '');
        const content = markdownToPlainText(contentMd);
        return {
            title: String(item.title ?? ''),
            key: String(item.key ?? ''),
            timestamp: String(item.timestamp ?? ''),
            bannerUrl: String(item.bannerUrl ?? ''),
            content,
        };
    });
    console.log('Fetched news items:', items);

    return {
        items,
        nextKey: typeof data.nextKey === 'string' && data.nextKey.length ? data.nextKey : undefined,
        pageSize: typeof data.pageSize === 'number' ? data.pageSize : undefined,
    };
}

export async function createArticle(article: Article): Promise<Article> {
    const res = await fetch('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to create article: ${res.status} ${res.statusText}${body ? ` - ${body}` : ''}`);
    }

    const data = await res.json().catch(() => null);
    if (!data) return article;

    return {
        title: String(data.title ?? article.title),
        key: String(data.key ?? article.key),
        timestamp: String(data.timestamp ?? article.timestamp),
        bannerUrl: String(data.bannerUrl ?? article.bannerUrl),
        content: String(data.content ?? article.content),
    };
}

export async function getArticle(key: string): Promise<Article | null> {
    const url = new URL('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/news');
    url.searchParams.set('key', key);

    let res;
    let data;
    try {
        res = await fetch(url.toString());
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
        }
        data = await res.json().catch(() => null);
        if (!data) return null;
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }

    return {
        title: String(data.title ?? ''),
        key: String(data.key ?? ''),
        timestamp: String(data.timestamp ?? ''),
        bannerUrl: String(data.bannerUrl ?? ''),
        content: String(data.content ?? ''),
    };
}

export async function editArticle(
    key: string,
    updates: Partial<Pick<Article, 'title' | 'content' | 'bannerUrl'>>
): Promise<Article> {
    const res = await fetch('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, ...updates }),
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to edit article: ${res.status} ${res.statusText}${body ? ` - ${body}` : ''}`);
    }

    const data = await res.json().catch(() => null);
    if (!data) {
        throw new Error('No data returned from edit article request');
    }

    return {
        title: String(data.title ?? ''),
        key: String(data.key ?? ''),
        timestamp: String(data.timestamp ?? ''),
        bannerUrl: String(data.bannerUrl ?? ''),
        content: String(data.content ?? ''),
    };
}