import { useCartStore } from '../store';

const products = [
  { id: 'regal', name: 'OG Chocolate', price: 25000, desc: 'white choc-walnut', code: 'ITM-01', emoji: '🍪' },
  { id: 'matcha', name: 'Red Velvet', price: 28000, desc: 'cream cheese core', code: 'ITM-02', emoji: '🍰' },
  { id: 'matcha-balls', name: 'Biscoff Crunch', price: 20000, desc: 'white choc + biscuit', code: 'ITM-03', emoji: '🥨' },
  { id: 'coffee', name: 'Oreo Matcha', price: 22000, desc: 'stuffed with oreo', code: 'ITM-04', emoji: '🍵' }
];

export default function Shop() {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="animate-in fade-in duration-700">
      
      <div className="mb-16 pb-8 border-b-2 border-tutus-blue/10 text-center sm:text-left">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 text-tutus-blue">
          Magical Taste.
        </h1>
        <p className="font-bold text-tutus-blue/60 uppercase tracking-widest text-sm">
          We're going to make you happy ♡
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <article 
            key={product.id} 
            className="bg-tutus-paper border-2 border-tutus-blue/10 p-8 sm:p-10 rounded-[2rem] group hover:border-tutus-blue hover:bg-tutus-yellow/20 transition-all cursor-pointer flex flex-col justify-between min-h-[280px] shadow-sm"
            onClick={() => addToCart(product)}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-xs text-tutus-blue/40 font-bold">{product.code}</span>
              <span className="text-4xl group-hover:scale-110 transition-transform">{product.emoji}</span>
            </div>
            
            <div>
              <h3 className="font-black text-3xl mb-1">{product.name}</h3>
              <p className="font-medium text-sm text-tutus-blue/60 lowercase">{product.desc}</p>
            </div>

            <div className="mt-8 flex justify-between items-center border-t-2 border-tutus-blue/5 pt-4 group-hover:border-tutus-blue/20 transition-colors">
               <span className="font-bold text-lg">Rp{product.price.toLocaleString('id-ID')}</span>
               <span className="font-bold text-sm tracking-widest uppercase bg-tutus-blue text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                + Add
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}