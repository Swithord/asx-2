// import { getToken } from './auth';

interface Post {
    key: string;
    title: string;
    content: string;
    bannerUrl: string;
}

export async function uploadImage(file: File) {
  try {
    // Get the presigned URL from your API
    const res = await fetch('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/image-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get upload URL: ${res.status} ${res.statusText}`);
    }

    const { uploadUrl, imageUrl } = await res.json();

    if (!uploadUrl || !imageUrl) {
      throw new Error('Invalid response from image upload API');
    }

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error(`Failed to upload image: ${uploadRes.status} ${uploadRes.statusText}`);
    }

    return imageUrl;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

export async function createPost({ key, title, content, bannerUrl }: Post) {
//   const token = getToken();

  const res = await fetch('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/news', {
    method: 'POST',
    headers: {
    //   'Authorization': `Bearer ${token}`,
      // 'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key,
      title,
      content,
      bannerUrl
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create post');
  }

  return await res.json();
}

  