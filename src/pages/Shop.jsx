import { useCartStore } from '../store';
import { flyToCart } from '../fx';

const products = [
  { id: 'regal', name: 'OG Chocolate', price: 25000, desc: 'white choc-walnut', code: 'ITM-01', emoji: '🍪', isSoldOut: false },
  { id: 'matcha', name: 'Red Velvet', price: 28000, desc: 'cream cheese core', code: 'ITM-02', emoji: '🍰', isSoldOut: false },
  { id: 'matcha-balls', name: 'Biscoff Crunch', price: 20000, desc: 'white choc + biscuit', code: 'ITM-03', emoji: '🥨', isSoldOut: false },
  { id: 'coffee', name: 'Oreo Matcha', price: 22000, desc: 'stuffed with oreo', code: 'ITM-04', emoji: '🍵', isSoldOut: false } // <-- Set to true to test the sold-out state!
];

const ticker = ['MADE TO BE OBSESSED', "We're going to make you happy", 'Magical Taste.'];
const floaters = [
  { e: '🍪', cls: 'top-2 right-[8%] text-7xl', d: '0s', k: 30 },
  { e: '🍰', cls: 'top-24 right-[26%] text-5xl', d: '-1.5s', k: -20 },
  { e: '🥨', cls: 'bottom-4 right-[4%] text-6xl', d: '-3s', k: -36 },
  { e: '🍵', cls: 'bottom-0 right-[30%] text-4xl', d: '-4s', k: 18 },
];

export default function Shop() {
  const addToCart = useCartStore(state => state.addToCart);
  const cart = useCartStore(state => state.cart);

  const heroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2);
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const cardMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', x * 100 + '%');
    el.style.setProperty('--my', y * 100 + '%');
    el.style.setProperty('--rx', (0.5 - y) * 7 + 'deg');
    el.style.setProperty('--ry', (x - 0.5) * 7 + 'deg');
  };
  const cardLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  const add = (product, el) => {
    if (product.isSoldOut) return;
    addToCart(product);
    flyToCart(el.querySelector('[data-emoji]'), product.emoji);
  };

  return (
    <div>
      <section onPointerMove={heroMove} className="relative mb-10 pt-4 pb-10 text-center sm:text-left">
        <div className="hidden sm:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {floaters.map(f => (
            <span key={f.e} className={`absolute ${f.cls}`} style={{ transform: `translate(calc(var(--px, 0) * ${f.k}px), calc(var(--py, 0) * ${f.k}px))`, transition: 'transform .3s ease-out' }}>
              <span className="floaty inline-block" style={{ animationDelay: f.d }}>{f.e}</span>
            </span>
          ))}
        </div>
        <h1 className="relative text-6xl sm:text-8xl font-black tracking-tighter mb-5 text-tutus-blue leading-[0.95]">
          {['Magical', 'Taste.'].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-bottom pb-2 mr-[0.22em]">
              <span className="inline-block word-rise" style={{ animationDelay: `${100 + i * 140}ms` }}>{w}</span>
            </span>
          ))}
        </h1>
        <p className="relative font-bold text-tutus-blue/60 uppercase tracking-widest text-sm word-rise" style={{ animationDelay: '450ms' }}>
          We're going to make you happy ♡
        </p>
      </section>

      <div className="marquee overflow-hidden rounded-full bg-tutus-blue text-tutus-cream py-3 mb-14 -rotate-1 shadow-lg" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(n => (
            <div key={n} className="flex shrink-0">
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i} className="font-black uppercase tracking-widest text-sm px-6 whitespace-nowrap">
                  {t} <span className="text-tutus-yellow px-2">♡</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, i) => {
          const inBag = cart.find(c => c.id === product.id)?.qty || 0;
          return (
            <article
              key={product.id}
              role="button"
              tabIndex={product.isSoldOut ? -1 : 0}
              aria-disabled={product.isSoldOut}
              onPointerMove={cardMove}
              onPointerLeave={cardLeave}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), add(product, e.currentTarget))}
              style={{ animationDelay: `${300 + i * 110}ms` }}
              className={`animate-in bg-tutus-paper border-2 border-tutus-blue/10 p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between min-h-[280px] shadow-sm ${
                product.isSoldOut
                  ? 'opacity-60 grayscale cursor-not-allowed'
                  : 'tilt group hover:border-tutus-blue hover:bg-tutus-yellow/20 cursor-pointer'
              }`}
              onClick={e => add(product, e.currentTarget)}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-tutus-blue/40 font-bold">{product.code}</span>
                <span data-emoji className={`text-5xl inline-block ${!product.isSoldOut && 'transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12'}`}>{product.emoji}</span>
              </div>

              <div>
                <h3 className="font-black text-3xl mb-1">{product.name}</h3>
                <p className="font-medium text-sm text-tutus-blue/60 lowercase">{product.desc}</p>
              </div>

              <div className="mt-8 flex justify-between items-center border-t-2 border-tutus-blue/5 pt-4">
                <span className="font-bold text-lg">Rp{product.price.toLocaleString('id-ID')}</span>
                <span className="flex items-center gap-2">
                  {inBag > 0 && <span key={inBag} className="pop font-bold text-xs bg-tutus-yellow text-tutus-blue border border-tutus-blue rounded-full px-3 py-1">{inBag} in bag</span>}
                  <span className={`font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                    product.isSoldOut
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-tutus-blue text-white sm:opacity-60 sm:translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}>
                    {product.isSoldOut ? 'All Gone 💔' : '+ Add'}
                  </span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}