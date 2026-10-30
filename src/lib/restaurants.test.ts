import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { searchRestaurants, googleMapsLink, safeExternalUrl } from './restaurants.ts';

test('sends the selected dish and coordinates to the frontend search route', async () => {
  let sent = '';
  const fetcher: typeof fetch = async (url, options) => {
    assert.equal(url, '/api/restaurants/search');
    sent = String(options?.body);
    return Response.json({ query: 'ผัดไทย', radiusMeters: 5000, restaurants: [] });
  };
  const data = await searchRestaurants('ผัดไทย', 13.75, 100.5, fetcher);
  assert.equal(data.restaurants.length, 0);
  assert.deepEqual(JSON.parse(sent), { menuName: 'ผัดไทย', latitude: 13.75, longitude: 100.5, radiusMeters: 5000 });
});

test('reports failed search and rejects unexpected data', async () => {
  await assert.rejects(searchRestaurants('food', 0, 0, async () => new Response(null, { status: 503 })));
  await assert.rejects(searchRestaurants('food', 0, 0, async () => Response.json({ restaurants: 'wrong' })));
});

test('builds a safe map link and rejects unsafe external URLs', () => {
  assert.match(googleMapsLink({ placeId: 'abc', name: 'ร้านอาหาร', latitude: 13.75, longitude: 100.5 }), /^https:\/\/www\.google\.com\/maps\/search\/\?/);
  assert.equal(safeExternalUrl('javascript:alert(1)'), null);
  assert.equal(safeExternalUrl('https://example.com/'), 'https://example.com/');
});
