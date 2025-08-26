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
    const url = new URL('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/news');
    if (pageSize != null) url.searchParams.set('pageSize', String(pageSize));
    if (startKey) url.searchParams.set('startKey', startKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data || !Array.isArray(data.items)) {
        throw new Error('Unexpected response format: expected an object with an "items" array');
    }

    const items: Article[] = data.items.map((item: any) => ({
        title: String(item.title ?? ''),
        key: String(item.key ?? ''),
        timestamp: String(item.timestamp ?? ''),
        bannerUrl: String(item.bannerUrl ?? ''),
        content: String(item.content ?? ''),
    }));
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