import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { verifyToken } from '@/utils/auth';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage, createPost } from '@/utils/postnews';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, InfoIcon } from 'lucide-react';

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
    
    // Post form state
    const [postKey, setPostKey] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        try {
            let bannerUrl = '';
            
            // Upload banner image if provided
            if (bannerFile) {
                toast.info('Uploading image...');
                bannerUrl = await uploadImage(bannerFile);
            }

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
            toast.error('Failed to create post. Please try again.');
            console.error('Error creating post:', error);
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
            </div>
            <Footer />
        </div>
    );
}