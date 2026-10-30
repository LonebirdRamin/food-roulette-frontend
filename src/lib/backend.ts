export type BackendHealth = { status: 'ok' };

/** Ask the backend for its health status and validate the response at runtime. */
export async function getBackendHealth(baseUrl: string, fetcher: typeof fetch = fetch): Promise<BackendHealth> {
  const url = new URL('/api/health', baseUrl);
  const response = await fetcher(url, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error('Backend health request failed');

  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null || !('status' in data) || data.status !== 'ok') {
    throw new Error('Unexpected backend health response');
  }
  return { status: 'ok' };
}
