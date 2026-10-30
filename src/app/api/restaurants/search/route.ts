export async function POST(request: Request) {
  const backend = process.env.BACKEND_API_URL;
  if (!backend) return Response.json({ error: 'Search is unavailable.' }, { status: 503 });
  let body: unknown;
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid search request.' }, { status: 400 }); }
  try {
    const response = await fetch(new URL('/api/restaurants/search', backend), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      cache: 'no-store', signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return Response.json({ error: 'Search is unavailable. Please try again.' }, { status: response.status === 400 ? 400 : 502 });
    return Response.json(await response.json(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Search is unavailable. Please try again.' }, { status: 502 });
  }
}
