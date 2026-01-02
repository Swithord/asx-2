import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { verifyToken } from '@/utils/auth';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Pencil } from 'lucide-react';
import { Article, editArticle, fetchNews, getArticle } from './api/news';
import { createPost, uploadImage } from '@/utils/postnews';

interface AdminProps {
  isAuthenticated: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const token = req.cookies['admin-token'] || '';
    const isAuthenticated = verifyToken(token);
    
    return {
        props: {
            isAuthenticated,
        },
    };
}

export default function Admin({ isAuthenticated }: AdminProps) {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const [postKey, setPostKey] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [nextKey, setNextKey] = useState<string | undefined>();

    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadArticles();
        }
    }, [isAuthenticated]);

    const loadArticles = async () => {
        try {
            setLoadingArticles(true);
            const data = await fetchNews(50); // Load more articles for admin view
            setArticles(data.items);
            setNextKey(data.nextKey);
        } catch (error) {
            toast.error('Failed to load articles');
            console.error('Error loading articles:', error);
        } finally {
            setLoadingArticles(false);
        }
    };
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            
            if (response.ok) {
                toast.success('Login successful!');
                window.location.reload();
            } else {
                toast.error('Invalid password');
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBannerFile(e.target.files[0]);
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        let bannerUrl = '';

        try {
            
            // Upload banner image if provided
            if (bannerFile) {
                toast.info('Uploading image...');
                bannerUrl = await uploadImage(bannerFile);
            }
        } catch (error) {
            toast.error('Image upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
            setIsSubmitting(false);
            return;
        }

        try {
            // Create the post
            toast.info('Creating post...');
            await createPost({
                key: postKey,
                title,
                content,
                bannerUrl,
            });

            toast.success('Post created successfully!');
            
            // Reset form
            setPostKey('');
            setTitle('');
            setContent('');
            setBannerFile(null);
            setIsDialogOpen(false);
        } catch (error) {
            toast.error('Failed to create post: ' + (error instanceof Error ? error.message : 'Unknown error'));
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = async (article: Article) => {
        let fullArticle = await getArticle(article.key);
        if (!fullArticle) {
            toast.error('Failed to load article for editing');
            return;
        }
        setEditingArticle(article);
        setTitle(article.title);
        setContent(fullArticle.content);
        setBannerFile(null);
        setIsEditDialogOpen(true);
    };

    const handleEditPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingArticle) return;
        
        setIsSubmitting(true);
        let bannerUrl = editingArticle.bannerUrl;

        try {
            // Upload new banner image if provided
            if (bannerFile) {
                toast.info('Uploading image...');
                bannerUrl = await uploadImage(bannerFile);
            }
        } catch (error) {
            toast.error('Image upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
            setIsSubmitting(false);
            return;
        }

        try {
            toast.info('Updating post...');
            await editArticle(editingArticle.key, {
                title,
                content,
                bannerUrl,
            });

            toast.success('Post updated successfully!');
            
            // Reset form
            setEditingArticle(null);
            setTitle('');
            setContent('');
            setBannerFile(null);
            setIsEditDialogOpen(false);

            // Reload articles
            loadArticles();
        } catch (error) {
            toast.error('Failed to update post: ' + (error instanceof Error ? error.message : 'Unknown error'));
            console.error('Error updating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-8">
                    <div className="w-full max-w-md space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold">Admin Login</h1>
                        </div>
                        
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="w-full"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='flex flex-col min-h-screen gap-5 items-center'>
            <Navbar />
            <div className="container flex-grow flex-col flex max-w-4xl items-center gap-5">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <Alert className='bg-transparent border border-gray-700'>
                            <InfoIcon className="h-5 w-5 text-white" />
                            <AlertTitle className="text-white">Use the button below to create a new post for the news section.</AlertTitle>
                            <AlertDescription>
                                Markdown is supported - i.e. *use this for italics*, **this for bold**, and [links](https://example.com).
                            </AlertDescription>
                        </Alert>
                        <div className="flex gap-2">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <span className="mr-2">+</span> Create Post
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Create New Post</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details to create a new post
                                        </DialogDescription>
                                        </DialogHeader>
                                    <form onSubmit={handleCreatePost} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="postKey">Post Key <span className="text-sm text-gray-400">(will show up in the URL)</span></Label>
                                            <Input
                                                id="postKey"
                                                placeholder="unique-post-key"
                                                value={postKey}
                                                onChange={(e) => setPostKey(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                placeholder="Post title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="content">Content</Label>
                                            <Textarea
                                                id="content"
                                                placeholder="Post content..."
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                                rows={8}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="banner">Banner Image</Label>
                                            <Input
                                                id="banner"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                         <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsDialogOpen(false)}
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Creating...' : 'Create Post'}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="w-full space-y-4">
                    <div className="text-2xl font-semibold">All Articles</div>
                    {loadingArticles ? (
                        <div className="text-center py-8">Loading articles...</div>
                    ) : (
                        <div className="space-y-2">
                            {articles.map((article) => (
                                <div
                                    key={article.key}
                                    className="flex items-center gap-4 p-3 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                                >
                                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                                        <Image
                                            src={article.bannerUrl}
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold truncate">{article.title}</h3>
                                        <p className="text-sm text-gray-400 truncate">{article.content}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditClick(article)}
                                        className="flex-shrink-0"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                            <DialogDescription>
                                Update the post details
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditPost} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                    id="edit-title"
                                    placeholder="Post title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-content">Content</Label>
                                <Textarea
                                    id="edit-content"
                                    placeholder="Post content..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                    rows={8}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-banner">Banner Image (leave empty to keep current)</Label>
                                <Input
                                    id="edit-banner"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditDialogOpen(false);
                                        setEditingArticle(null);
                                        setTitle('');
                                        setContent('');
                                        setBannerFile(null);
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Post'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Footer />
        </div>
    );
}