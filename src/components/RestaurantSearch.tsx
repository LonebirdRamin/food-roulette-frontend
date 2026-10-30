'use client';

import { useRef, useState } from 'react';
import type { Menu } from '../lib/menus';
import { googleMapsLink, safeExternalUrl, searchRestaurants, type RestaurantResults } from '../lib/restaurants';

type Props = { menu: Menu; onBack: () => void };

export function RestaurantSearch({ menu, onBack }: Props) {
  const [view, setView] = useState<'location' | 'results'>('location');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState<RestaurantResults | null>(null);
  const requestId = useRef(0);

  function back() {
    requestId.current++;
    if (view === 'results') { setView('location'); setResults(null); setMessage(''); setBusy(false); }
    else onBack();
  }

  async function runSearch(lat: number, lon: number, id: number) {
    setBusy(true); setMessage('');
    try {
      const found = await searchRestaurants(menu.nameTh, lat, lon);
      if (requestId.current !== id) return;
      setResults(found); setView('results');
    } catch {
      if (requestId.current === id) setMessage('Could not find places right now. Please check the connection and try again.');
    } finally {
      if (requestId.current === id) setBusy(false);
    }
  }

  function useLocation() {
    if (!navigator.geolocation) { setMessage('Location is unavailable in this browser. Try a supported browser over a secure connection.'); return; }
    const id = ++requestId.current;
    setBusy(true); setMessage('');
    navigator.geolocation.getCurrentPosition(
      position => { if (requestId.current === id) void runSearch(position.coords.latitude, position.coords.longitude, id); },
      error => {
        if (requestId.current !== id) return;
        setBusy(false);
        setMessage(error.code === 1
          ? 'Location access was denied. Enable location permission in your browser settings, then try again.'
          : 'Could not determine your location. Check your device settings and try again.');
      },
      { timeout: 10000, maximumAge: 0 },
    );
  }

  return <section className="search-screen" aria-label="Nearby restaurant search">
    <div className="search-header"><button className="back-button" onClick={back}>← Back</button><span className="search-brand">FOOD<span>.</span> ROULETTE</span></div>
    {view === 'location' ? <div className="location-panel">
      <div className="location-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
      </div>
      <span className="search-kicker">LET&apos;S FIND YOUR FOOD ✦</span>
      <h1>Good food is nearby!</h1>
      <p>Allow location access so we can find places near you that may serve <strong lang="th">{menu.nameTh}</strong>.</p>
      <div className="location-card">
        <p className="location-radius"><span aria-hidden="true">✦</span> Searching within 5 km</p>
        <button className="primary-button" disabled={busy} onClick={useLocation}>{busy ? 'Finding places…' : 'Use my current location →'}</button>
        <p className="location-privacy">Your browser will ask for permission first.</p>
      </div>
      {message && <p className="search-error" role="alert">{message}</p>}
    </div> : <div className="results-content">
      <div className="results-heading">
        <span className="search-kicker">A LITTLE SOMETHING NEARBY ✦</span>
        <h1>Let&apos;s eat!</h1>
        <p className="results-intro">Places that may serve <strong lang="th">{menu.nameTh}</strong>.<br />Check the menu before ordering.</p>
        <p className="results-count">✦ &nbsp;{results?.restaurants.length ?? 0} places within 5 km · nearest first</p>
      </div>
      {results?.restaurants.length === 0 ? <div className="empty-results"><p>No suitable places found nearby.</p><p>Try again or choose another dish.</p><button onClick={back} className="search-secondary">Try again</button></div> : <div className="places-container">
        <div className="google-attribution"><img src="/google-maps-attribution.svg" alt="Google Maps" /></div>
        {results?.restaurants.map(place => <article className="place-card" key={place.placeId}>
          <div className="place-heading"><h2>{place.name}</h2><span className="distance-pill">{(place.distanceMeters / 1000).toFixed(1)} km</span></div>
          {place.address && <p>{place.address}</p>}
          {place.rating != null && <p>★ {place.rating.toFixed(1)} / 5</p>}
          <a className="maps-button" href={googleMapsLink(place)} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
          {place.attributions?.map((a, i) => a.provider && <p className="provider-attribution" key={i}>{safeExternalUrl(a.providerUri) ? <a href={safeExternalUrl(a.providerUri)!} target="_blank" rel="noopener noreferrer">{a.provider}</a> : a.provider}</p>)}
        </article>)}
      </div>}
      <p className="distance-note">Distances are straight-line distances, not travel distances.</p>
    </div>}
  </section>;
}
