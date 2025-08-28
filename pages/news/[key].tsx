import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getArticle, Article } from '../api/news';
import ReactMarkdown from 'react-markdown'
import Markdown from 'react-markdown';

interface ArticlePageProps {
    article?: Article;
    error?: string;
}

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
}

export default function ArticlePage({ article, error }: ArticlePageProps) {
    const router = useRouter();
    const { key } = router.query;

    if (error) {
        return (
            <div className='max-w-7xl mx-auto'>
                <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
                    <Navbar />
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <div className="text-center">
                            <div className="text-xl text-red-500 mb-4">Article Not Found</div>
                            <div className="text-gray-600 mb-4">{error}</div>
                            <Link href="/news">
                                <Button>Back to News</Button>
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className='max-w-7xl mx-auto'>
                <div className='container flex flex-col items-center justify-between min-h-screen mx-auto gap-5 sm:gap-10 md:gap-15'>
                    <Navbar />
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <div className="text-xl">Loading article...</div>
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
                <div className='w-full flex-grow flex flex-col gap-8 px-4 max-w-4xl mx-auto'>
                    {/* Back to News Link */}
                    <Link 
                        href="/news" 
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 w-fit"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to News
                    </Link>

                    {/* Article Content */}
                    <article className="flex flex-col gap-8">
                        {/* Article Header */}
                        <header className="flex flex-col gap-4">
                            <div className="text-sm text-secondary/80 font-medium tracking-wide">
                                {formatTimestamp(article.timestamp)}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                {article.title}
                            </h1>
                        </header>

                        {/* Article Image */}
                        <div className="w-full h-64 md:h-96 lg:max-h-[500px] overflow-hidden rounded-xl relative">
                            <Image 
                                src={article.bannerUrl} 
                                alt={article.title} 
                                fill
                                className="object-cover" 
                                priority
                            />
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-lg md:prose-xl prose-invert max-w-none">
                            <div className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                                <Markdown>
                                    {article.content}
                                </Markdown>
                            </div>
                        </div>

                        {/* Article Footer */}
                        <footer className="border-t border-gray-700/50 pt-8 mt-8">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm text-foreground/60">
                                    Published on {formatTimestamp(article.timestamp)}
                                </div>
                                <div className="flex gap-3">
                                    {/* <Link href="/news">
                                        <Button variant="outline" className="border-gray-700/50 hover:border-gray-600">
                                            More News
                                        </Button>
                                    </Link> */}
                                    <Button 
                                        onClick={() => router.back()}
                                        className="bg-primary hover:bg-primary/90 text-black"
                                    >
                                        Return
                                    </Button>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>
                <Footer />
            </div>
        </div>
    );
}

// Server-side rendering to fetch the article
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { key } = context.params!;
    
    try {
        const article = await getArticle(key as string);
        
        if (!article) {
            return {
                props: {
                    error: `Article with key "${key}" not found.`
                }
            };
        }

        return {
            props: {
                article
            }
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        return {
            props: {
                error: 'Failed to load article. Please try again later.'
            }
        };
    }
};
