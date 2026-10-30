import { getBackendHealth } from '../../../lib/backend';

/** Check the backend through Next.js without exposing connection details to the browser. */
export async function GET() {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return Response.json({ error: 'Backend URL is not configured' }, { status: 503 });
  }

  try {
    return Response.json(await getBackendHealth(backendUrl), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Backend is unavailable' }, { status: 502 });
  }
}
