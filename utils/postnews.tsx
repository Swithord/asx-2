// import { getToken } from './auth';

interface Post {
    key: string;
    title: string;
    content: string;
    bannerUrl: string;
}

export async function uploadImage(file: any) {
    // const token = getToken();
  
    const res = await fetch('https://tosiig6pwc.execute-api.us-east-2.amazonaws.com/default/image-upload', {
      method: 'POST',
    //   headers: { Authorization: `Bearer ${token}` },
    });
    const { uploadUrl, imageUrl } = await res.json();
  
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'image/jpeg' },
      body: file,
    });
  
    return imageUrl;
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

  