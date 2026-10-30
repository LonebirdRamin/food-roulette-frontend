'use client';

import { useEffect, useRef, useState } from 'react';
import { RestaurantSearch } from './RestaurantSearch';
import { menus, randomMenu, type Menu } from '../lib/menus';

function FoodIllustration() {
  return <div className="illustration" aria-hidden="true">
    <div className="sun" /><div className="plate" /><div className="food" />
    <div className="herbs">✿</div><div className="egg"><div className="yolk" /></div>
    <div className="sparkle">✦</div>
  </div>;
}

export function Roulette() {
  const [selected, setSelected] = useState<Menu | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const spinningRef = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const choose = () => {
    if (spinningRef.current) return;
    const result = randomMenu(menus);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSelected(result);
      return;
    }

    spinningRef.current = true;
    setSpinning(true);
    setSelected(randomMenu(menus));
    // Increasing pauses make the draw feel like it is slowing to a stop.
    let delay = 0;
    timers.current = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 60, 70, 85, 110, 150, 210, 300, 420, 550, 450].map((pause, index, pauses) => {
      delay += pause;
      return window.setTimeout(() => {
        if (index === pauses.length - 1) {
          setSelected(result);
          setSpinning(false);
          spinningRef.current = false;
          timers.current = [];
        } else {
          setSelected(randomMenu(menus));
        }
      }, delay);
    });
  };

  return <>
    <div className="rotate-notice" role="status">
      <span className="rotate-icon" aria-hidden="true">↻</span>
      <h1>Give your phone a little turn!</h1>
      <p>Rotate your phone upright to find something delicious.</p>
    </div>
    <main className="screen">
    {searchOpen && selected ? <RestaurantSearch menu={selected} onBack={() => setSearchOpen(false)} /> : <>
    <header className="topbar">
      <div className="text-[13px] font-black tracking-[1.5px]">FOOD<span className="text-(--orange)">.</span> ROULETTE</div>
      <div className="rounded-full bg-[#ffe5c8] px-3 py-2.25 text-[10px] font-bold tracking-[1px] text-[#a13d19]">{selected ? "LET'S EAT!" : "WHAT'S FOR LUNCH?"}</div>
    </header>
    {!selected ? <section className="welcome">
      <div className="inline-block rounded-full bg-[#ffdf71] px-3.25 py-2 text-[11px] font-bold tracking-[1px] text-[#6f3b18]">GOOD FOOD, GOOD MOOD ✦</div>
      <h1 className="greeting"><span>Feeling</span><span>Haaangry?</span></h1>
      <p className="m-0 text-[15px] leading-[1.55] text-[#765f54]">Can&apos;t decide what to eat?<br />Let&apos;s find something delicious.</p>
      <FoodIllustration />
      <button className="primary-button" onClick={choose}>Let&apos;s eat! <span aria-hidden="true">→</span></button>
      <p className="hint">A LITTLE SURPRISE IS ON THE MENU</p>
    </section> : <section className="result">
      <div className="text-[11px] font-bold tracking-[1.4px] text-[#a44720]">{spinning ? '✦ THE FOOD GODS ARE THINKING ✦' : '✦ THE FOOD GODS HAVE SPOKEN ✦'}</div>
      <h1 className="result-title"><span>{spinning ? 'Finding' : 'How about'}</span><span>{spinning ? 'your food...' : 'this one?'}</span></h1>
      <p className="m-0 text-[15px] leading-[1.55] text-[#765f54]">{spinning ? 'Let the roulette decide!' : 'Your next delicious idea is ready.'}</p>
      <FoodIllustration />
      <div className={`dish-card${spinning ? ' dish-card-spinning' : ''}`}>
        <div className="text-[10px] font-bold tracking-[1.8px] text-[#a9481d]">{spinning ? 'SPINNING...' : "TODAY'S PICK"}</div>
        <div aria-hidden={spinning}>
        <h2 lang="th">{selected.nameTh}</h2>
        <p>{selected.nameEn}</p>
        </div>
        <span className="sr-only" role="status">{spinning ? 'Choosing a dish' : `Today's pick: ${selected.nameTh}, ${selected.nameEn}`}</span>
        <button className="primary-button" onClick={choose} disabled={spinning}><span aria-hidden="true">↻</span> {spinning ? 'Spinning...' : 'Surprise me again'}</button>
      </div>
      <button className="nearby-button" onClick={() => setSearchOpen(true)} disabled={spinning}>Find nearby restaurants <span aria-hidden="true">→</span></button>
      <p className="nearby-note">Places may serve this dish.</p>
    </section>}
    <footer>{selected ? 'GOOD FOOD IS JUST A SPIN AWAY ✦' : 'Made for hungry people, by hungry people.'}</footer>
    </>}
    </main>
  </>;
}
