import { useCartStore } from '../store';

const products = [
  { id: 'regal', name: 'OG CHOCOLATE', price: 25000, desc: 'WHITE CHOC-WALNUT', code: 'ITM-01' },
  { id: 'matcha', name: 'RED VELVET', price: 28000, desc: 'CREAM CHEESE CORE', code: 'ITM-02' },
  { id: 'matcha-balls', name: 'BISCOFF CRUNCH', price: 20000, desc: 'WHITE CHOC + BISCUIT', code: 'ITM-03' },
  { id: 'coffee', name: 'OREO MATCHA', price: 22000, desc: 'OREO CROWN', code: 'ITM-04' }
];

export default function Shop() {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* The Editorial Hero Section */}
      <div className="mb-20 border-b border-white/10 pb-12">
        <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
          Every Second<br/>Counts.
        </h1>
        <p className="font-mono text-brass-gold uppercase tracking-widest text-sm max-w-md">
          Chaos to order. Unpolished preparation. Meticulous execution.
        </p>
      </div>

      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <h2 className="font-mono text-lg tracking-widest uppercase">The Menu</h2>
        <span className="font-mono text-xs text-white/50">SERVICE 01</span>
      </div>

      {/* The Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
        {products.map(product => (
          <article 
            key={product.id} 
            className="bg-kitchen-black p-8 sm:p-12 group hover:bg-kitchen-charcoal transition-colors cursor-pointer flex flex-col justify-between min-h-[300px]"
            onClick={() => addToCart(product)}
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-xs text-white/40">{product.code}</span>
              <span className="font-mono text-sm tracking-widest text-brass-gold">Rp{product.price.toLocaleString('id-ID')}</span>
            </div>
            
            <div>
              <h3 className="font-black text-3xl sm:text-4xl uppercase tracking-tighter mb-2">{product.name}</h3>
              <p className="font-mono text-sm text-white/60 uppercase">{product.desc}</p>
            </div>

            <div className="mt-12 overflow-hidden">
              <div className="font-mono text-xs tracking-widest uppercase text-brass-gold translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                [ + Add to Ticket ]
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}