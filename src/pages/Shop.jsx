import { useState } from 'react';
import { useCartStore } from '../store';

const products = [
  { id: 'regal', name: 'Regal Dessert Cup', price: 10000, emoji: '🍮', desc: 'Soft cream & regal crumbs.' },
  { id: 'matcha', name: 'Matcha Dessert Cup', price: 11000, emoji: '🍵', desc: 'Creamy matcha goodness.' },
  { id: 'matcha-balls', name: 'Matcha Balls', price: 12000, emoji: '🍡', desc: 'Little matcha-coated bites.' },
  { id: 'coffee', name: 'Coffee Cup', price: 12000, emoji: '☕', desc: 'Your little caffeine fix.' }
];

export default function Shop() {
  const addToCart = useCartStore(state => state.addToCart);
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    // Reset the button text back to normal after 1.2 seconds
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center pb-10 pt-4">
        <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-2">Hello, sweet thing!</h1>
        <p className="text-neutral-600">pick something yummy</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <article key={product.id} className="bg-white rounded-2xl border-2 border-blue/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue transition-all duration-200 flex flex-col overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-soft-yellow to-cream flex items-center justify-center text-6xl">
              {product.emoji}
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-heading font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-neutral-500 mb-4 flex-1">{product.desc}</p>
              <div className="font-heading font-bold text-blue text-lg mb-4">
                Rp{product.price.toLocaleString('id-ID')}
              </div>
              
              <button 
                onClick={() => handleAdd(product)}
                className={`w-full font-heading font-bold py-2.5 rounded-full transition-all duration-200 border-2 border-blue ${
                  addedId === product.id 
                    ? 'bg-blue text-white shadow-none translate-y-1' 
                    : 'bg-cream text-blue shadow-[3px_3px_0_#315EAE] hover:bg-soft-yellow hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#315EAE] active:translate-y-1 active:shadow-none'
                }`}
              >
                {addedId === product.id ? 'Added! ♡' : 'Add to cart'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}