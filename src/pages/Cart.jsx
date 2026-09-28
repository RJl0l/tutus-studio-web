import { Link } from 'react-router-dom';
import { useCartStore } from '../store';

export default function Cart() {
  // Make sure updateQuantity is extracted right here
  const { cart, updateQuantity, totalPrice } = useCartStore();

  /* ... empty cart state ... */

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      {/* ... header ... */}
      
      <div className="flex flex-col gap-4 mb-12">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-tutus-blue/10 bg-tutus-paper p-6 rounded-2xl group">
            
            <div className="mb-4 sm:mb-0">
              <h3 className="font-black text-xl mb-1">{item.name}</h3>
              <p className="font-bold text-sm text-tutus-blue/60">Rp{item.price.toLocaleString('id-ID')}</p>
            </div>
            
            {/* The working + and - buttons */}
            <div className="flex items-center gap-6 font-bold text-lg bg-tutus-cream border-2 border-tutus-blue/10 rounded-full px-2 py-1">
              <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-tutus-blue/10 rounded-full transition-colors active:scale-95">-</button>
              <span className="w-4 text-center">{item.qty}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-tutus-blue/10 rounded-full transition-colors active:scale-95">+</button>
            </div>

          </div>
        ))}
      </div>
      
      {/* ... checkout totals ... */}
    </div>
  );
}