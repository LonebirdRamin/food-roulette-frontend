export type Attribution = { provider: string | null; providerUri: string | null };
export type Restaurant = {
  placeId: string; name: string; address: string | null; latitude: number; longitude: number;
  distanceMeters: number; rating: number | null; googleMapsUrl: string | null;
  menuMatchStatus: string; attributions: Attribution[];
};
export type RestaurantResults = { query: string; radiusMeters: number; restaurants: Restaurant[] };

export async function searchRestaurants(menuName: string, latitude: number, longitude: number, fetcher: typeof fetch = fetch): Promise<RestaurantResults> {
  const response = await fetcher('/api/restaurants/search', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ menuName, latitude, longitude, radiusMeters: 5000 }),
    cache: 'no-store', signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Search is unavailable. Please try again.');
  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null || !('restaurants' in data) || !Array.isArray(data.restaurants)) {
    throw new Error('The search returned an unexpected response. Please try again.');
  }
  return data as RestaurantResults;
}

export function safeExternalUrl(value: string | null): string | null {
  try { const url = new URL(value ?? ''); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
}

export function googleMapsLink(place: Pick<Restaurant, 'placeId' | 'name' | 'latitude' | 'longitude'>): string {
  const params = new URLSearchParams({ api: '1', query: `${place.name} ${place.latitude},${place.longitude}`, query_place_id: place.placeId });
  return `https://www.google.com/maps/search/?${params}`;
}
