'use client';

import { useState } from 'react';
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
  const choose = () => setSelected(randomMenu(menus));

  return <>
    <div className="rotate-notice" role="status">
      <span className="rotate-icon" aria-hidden="true">↻</span>
      <h1>Give your phone a little turn!</h1>
      <p>Rotate your phone upright to find something delicious.</p>
    </div>
    <main className="screen">
    {searchOpen && selected ? <RestaurantSearch menu={selected} onBack={() => setSearchOpen(false)} /> : <>
    <header className="topbar">
      <div className="text-[13px] font-black tracking-[1.5px]">FOOD<span className="text-[var(--orange)]">.</span> ROULETTE</div>
      <div className="rounded-full bg-[#ffe5c8] px-3 py-[9px] text-[10px] font-bold tracking-[1px] text-[#a13d19]">{selected ? "LET'S EAT!" : "WHAT'S FOR LUNCH?"}</div>
    </header>
    {!selected ? <section className="welcome">
      <div className="inline-block rounded-full bg-[#ffdf71] px-[13px] py-2 text-[11px] font-bold tracking-[1px] text-[#6f3b18]">GOOD FOOD, GOOD MOOD ✦</div>
      <h1 className="greeting"><span>Feeling</span><span>Haaangry?</span></h1>
      <p className="m-0 text-[15px] leading-[1.55] text-[#765f54]">Can&apos;t decide what to eat?<br />Let&apos;s find something delicious.</p>
      <FoodIllustration />
      <button className="primary-button" onClick={choose}>Let&apos;s eat! <span aria-hidden="true">→</span></button>
      <p className="hint">A LITTLE SURPRISE IS ON THE MENU</p>
    </section> : <section className="result">
      <div className="text-[11px] font-bold tracking-[1.4px] text-[#a44720]">✦ THE FOOD GODS HAVE SPOKEN ✦</div>
      <h1 className="result-title"><span>How about</span><span>this one?</span></h1>
      <p className="m-0 text-[15px] leading-[1.55] text-[#765f54]">Your next delicious idea is ready.</p>
      <FoodIllustration />
      <div className="dish-card" aria-live="polite">
        <div className="text-[10px] font-bold tracking-[1.8px] text-[#a9481d]">TODAY&apos;S PICK</div>
        <h2 lang="th">{selected.nameTh}</h2>
        <p>{selected.nameEn}</p>
        <button className="primary-button" onClick={choose}><span aria-hidden="true">↻</span> Surprise me again</button>
      </div>
      <button className="nearby-button" onClick={() => setSearchOpen(true)}>Find nearby restaurants <span aria-hidden="true">→</span></button>
      <p className="nearby-note">Places may serve this dish.</p>
    </section>}
    <footer>{selected ? 'GOOD FOOD IS JUST A SPIN AWAY ✦' : 'Made for hungry people, by hungry people.'}</footer>
    </>}
    </main>
  </>;
}
