import { useEffect, useRef, useState } from 'react';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Emoji arcs from a product card into the bag icon in the header
export function flyToCart(fromEl, emoji) {
  const to = document.getElementById('bag-icon');
  if (!fromEl || !to || reduced()) return;
  const a = fromEl.getBoundingClientRect(), b = to.getBoundingClientRect();
  const s = document.createElement('span');
  s.textContent = emoji;
  Object.assign(s.style, { position: 'fixed', left: a.left + 'px', top: a.top + 'px', fontSize: '36px', zIndex: 100, pointerEvents: 'none' });
  document.body.appendChild(s);
  const dx = b.left - a.left, dy = b.top - a.top;
  s.animate([
    { transform: 'translate(0,0) scale(1) rotate(0)' },
    { transform: `translate(${dx * 0.5}px,${dy * 0.5 - 90}px) scale(1.3) rotate(120deg)`, offset: 0.5 },
    { transform: `translate(${dx}px,${dy}px) scale(.3) rotate(320deg)`, opacity: 0.6 },
  ], { duration: 750, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = () => s.remove();
}

// Number that counts smoothly to its new value
export function CountUp({ value }) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current, t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 500, 1);
      const cur = Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3)));
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return v.toLocaleString('id-ID');
}

// One-shot confetti in theme colours
export function Confetti() {
  useEffect(() => {
    if (reduced()) return;
    const box = document.createElement('div');
    Object.assign(box.style, { position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 60 });
    document.body.appendChild(box);
    const colors = ['#22489C', '#FEE492', '#FFFFFF'];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('i'), size = 6 + Math.random() * 8;
      Object.assign(p.style, { position: 'absolute', top: '-20px', left: Math.random() * 100 + 'vw', width: size + 'px', height: size * (Math.random() > 0.5 ? 1 : 0.5) + 'px', background: colors[i % 3], border: '1px solid #22489C', borderRadius: Math.random() > 0.5 ? '50%' : '2px' });
      box.appendChild(p);
      p.animate([
        { transform: 'translateY(0) rotate(0)' },
        { transform: `translate(${(Math.random() - 0.5) * 220}px,${window.innerHeight + 40}px) rotate(${Math.random() * 720}deg)` },
      ], { duration: 1800 + Math.random() * 1800, delay: Math.random() * 500, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'forwards' });
    }
    const t = setTimeout(() => box.remove(), 4300);
    return () => { clearTimeout(t); box.remove(); };
  }, []);
  return null;
}