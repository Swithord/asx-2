import { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchNews, Article } from './api/news';
import news from '../assets/news.jpg';

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;

    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

    if (Math.abs(diffSeconds) < 60) {
        return rtf.format(-diffSeconds, 'second');
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (Math.abs(diffMinutes) < 60) {
        return rtf.format(-diffMinutes, 'minute');
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) {
        return rtf.format(-diffHours, 'hour');
    }

    const diffDays = Math.floor(diffHours / 24);
    if (Math.abs(diffDays) < 7) {
        return rtf.format(-diffDays, 'day');
    }

    // Fallback to a readable date/time for older items
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function News() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextKey, setNextKey] = useState<string | undefined>();
    const [error, setError] = useState<string | null>(null);

    // Load initial articles
    useEffect(() => {
        loadInitialNews();
    }, []);

    const loadInitialNews = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchNews(5); // Load first 5 articles
            setArticles(data.items);
            setNextKey(data.nextKey);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load news');
            console.error('Error loading news:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreNews = async () => {
        if (!nextKey || loadingMore) return;

        try {
            setLoadingMore(true);
            setError(null);
            const data = await fetchNews(5, nextKey); // Load 5 more articles
            setArticles(prev => [...prev, ...data.items]);
            setNextKey(data.nextKey);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load more news');
            console.error('Error loading more news:', err);
        } finally {
            setLoadingMore(false);
        }
    };

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto'>
                <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
                    <Navbar />
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <div className="text-xl">Loading news...</div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }

    if (error && articles.length === 0) {
        return (
            <div className='max-w-7xl mx-auto'>
                <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
                    <Navbar />
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <div className="text-center">
                            <div className="text-xl text-red-500 mb-4">Error loading news</div>
                            <div className="text-gray-600 mb-4">{error}</div>
                            <Button onClick={loadInitialNews}>Try Again</Button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
                <div className='w-full flex-grow flex flex-col gap-8 px-4 items-center'>
                    {/* Header */}
                    {/* <div className='flex flex-col gap-5 items-center'> */}
                        <div className="w-full max-w-4xl">
                            <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden">
                                <Image src={news} alt="News background" fill className="object-cover" />
                                {/* Extra dim overlay */}
                                <div className="absolute inset-0 bg-black/40" />
                                {/* Gradient to keep top darker while preserving text contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">News</h1>
                                    <div className="text-lg md:text-xl text-white/90 mt-2 drop-shadow-sm">
                                        Stay updated with the latest ASX news and events!
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Articles Grid */}
                        <div className="grid gap-6 md:gap-8 w-full max-w-4xl">
                            {articles.map((article) => (
                                <Link key={article.key} href={`/news/${article.key}`}>
                                    <article
                                        className="group border border-gray-700/50 rounded-xl p-3 md:p-5 transform transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 hover:border-gray-600 cursor-pointer "
                                    >
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Image */}
                                            <div className="w-full md:w-48 h-48 overflow-hidden rounded-lg flex-shrink-0 relative">
                                                <Image
                                                    src={article.bannerUrl}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col gap-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm text-secondary/80 font-medium tracking-wide">
                                                        {formatTimestamp(article.timestamp)}
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20">
                                                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                                                    {article.title}
                                                </h2>

                                                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed line-clamp-3">
                                                    {article.content}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {nextKey && (
                            <div className="flex justify-center pt-8">
                                <Button
                                    onClick={loadMoreNews}
                                    disabled={loadingMore}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-black text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loadingMore ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Show More</span>
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Error message for load more */}
                        {error && articles.length > 0 && (
                            <div className="text-center text-red-500 py-4">
                                {error}
                            </div>
                        )}

                        {/* No more articles message */}
                        {!nextKey && articles.length > 0 && (
                            <div className="text-center text-foreground/60 py-8">
                                <p className="text-lg">You've reached the end of our news archive.</p>
                            </div>
                        )}
                    {/* </div> */}
                    {/* <div className='flex flex-col w-2/5'>
                    <h1 className="text-3xl md:text-4xl">Upcoming Events</h1>
                    </div> */}
                </div>
                <Footer />
            </div>
        </div>
    );
}
