import type { Context, Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug') ?? '';

  // 允許中文，只擋空值、過長、斜線與控制字元
  if (!slug || slug.length > 200 || /[\/\\\s\x00-\x1f]/.test(slug)) {
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
