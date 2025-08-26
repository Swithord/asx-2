import { Article } from '../pages/api/news';
import Image from 'next/image';

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
            <div className="flex gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:-mx-4 px-4 md:px-0 py-2">
                {news.map((item) => (
                    <div
                        key={item.key}
                        className="min-w-[260px] md:min-w-0 snap-start flex border border-gray-700 rounded-lg p-5 transform transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-1 hover:z-10 cursor-pointer"
                    >
                        <div className="flex flex-col justify-between">
                            <div className="w-[100px] h-[100px] overflow-hidden flex-shrink-0">
                                <Image src={item.bannerUrl} alt={item.title} width={100} height={100} className="object-cover" />
                            </div>
                            <div className="text-base text-secondary">{formatTimestamp(item.timestamp)}</div>
                        </div>
                        <div className="flex flex-col gap-3 ml-4">
                            <div className="text-xl md:text-2xl">{item.title}</div>
                            <p className="text-lg md:text-xl">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}