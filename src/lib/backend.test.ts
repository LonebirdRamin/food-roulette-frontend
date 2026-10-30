import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { getBackendHealth } from './backend.ts';

test('reads and validates a successful backend health response', async () => {
  let requestedUrl = '';
  const fetcher: typeof fetch = async (url) => {
    requestedUrl = String(url);
    return Response.json({ status: 'ok' });
  };
  assert.deepEqual(await getBackendHealth('http://localhost:8080/', fetcher), { status: 'ok' });
  assert.equal(requestedUrl, 'http://localhost:8080/api/health');
});

test('rejects failed and unexpected backend responses', async () => {
  await assert.rejects(getBackendHealth('http://localhost:8080', async () => new Response(null, { status: 500 })));
  await assert.rejects(getBackendHealth('http://localhost:8080', async () => Response.json({ status: 'unknown' })));
});
