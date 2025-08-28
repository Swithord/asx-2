import { Article } from '../pages/api/news';
import Image from 'next/image';
import Link from 'next/link';

interface LatestProps {
    news: Article[];
}

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

export default function Latest({ news }: LatestProps) {
    return (
        <div className="container flex flex-col gap-5">
            <h1 className="text-3xl md:text-4xl">Latest</h1>
            <div className="flex gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:-mx-4 px-4 md:px-0 py-2">
                {news.map((item) => (
                    <Link key={item.key} href={`/news/${item.key}`}>
                        <div
                            className="group min-w-[280px] md:min-w-[320px] lg:min-w-0 lg:flex-1 snap-start flex flex-col md:flex-row border border-gray-700/50 rounded-xl p-4 md:p-5 transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10 hover:-translate-y-2 hover:border-gray-600 cursor-pointer bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
                        >
                            {/* Mobile: Image at top, Desktop: Image on left */}
                            <div className="flex flex-col md:flex-col md:justify-between mb-4 md:mb-0 md:mr-4">
                                <div className="w-full h-[160px] md:w-[120px] md:h-[120px] overflow-hidden rounded-lg mb-3 md:mb-0 flex-shrink-0 relative">
                                    <Image 
                                        src={item.bannerUrl} 
                                        alt={item.title} 
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="text-sm text-secondary/80 font-medium tracking-wide">
                                    {formatTimestamp(item.timestamp)}
                                </div>
                            </div>
                            
                            {/* Content section */}
                            <div className="flex flex-col gap-3 flex-1">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed line-clamp-3 md:line-clamp-4">
                                    {item.content}
                                </p>
                            </div>
                            
                            {/* Subtle arrow indicator for interaction */}
                            <div className="flex items-end justify-end mt-3 md:mt-0 md:ml-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20">
                                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* View All News Button */}
            <div className="flex justify-center">
                <Link 
                    href="/news"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-background text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
                >
                    <span>View All News</span>
                    <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}