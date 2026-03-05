const baseUrl = (process.env.CMS_BASE_URL || '').replace(/\/$/, '');
const apiKey = process.env.CMS_API_KEY || '';

export async function cmsFetch<T>(path: string, init: RequestInit = {}) {
  if (!baseUrl || !apiKey) {
    throw new Error('CMS_BASE_URL and CMS_API_KEY must be configured');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      'x-api-key': apiKey,
      'content-type': 'application/json',
      ...(init.headers || {}),
    },
    next: { tags: ['cms-posts'], revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`CMS Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<{ data: T; nextCursor?: string }>;
}

export async function getPosts(limit = 20, type = 'BLOG') {
  return cmsFetch<any[]>(`/api/public/content?type=${type}&limit=${limit}`);
}

export async function getPost(slug: string) {
  const result = await cmsFetch<any>(`/api/public/content/${slug}`);
  return result.data;
}

export async function getSDCMSMetadata() {
  try {
    const result = await cmsFetch<any[]>(`/api/public/content?type=BLOG&limit=50`);
    return { posts: result.data || [] };
  } catch {
    return { posts: [] };
  }
}
