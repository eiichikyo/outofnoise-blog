import type { Context, Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug') ?? '';

  // 只允許安全的 slug
  if (!slug || !/^[\w\-\/]+$/.test(slug)) {
    return Response.json({ error: 'invalid slug' }, { status: 400 });
  }

  const store = getStore('reactions');
  const current = Number((await store.get(slug)) ?? 0);

  if (req.method === 'POST') {
    const next = current + 1;
    await store.set(slug, String(next));
    return Response.json({ count: next });
  }

  return Response.json({ count: current });
};

export const config: Config = {
  path: '/api/reaction',
};
