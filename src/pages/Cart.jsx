import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store';

export default function Cart() {
  const { cart, updateQty, totalItems, totalPrice } = useCartStore();
  const itemsCount = totalItems();
  const totalCost = totalPrice();

  if (cart.length === 0) {
    return (
      <div className="animate-in fade-in flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl text-blue/20 mb-4"><ShoppingCart size={64} /></div>
        <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-2">your cart is feeling lonely...</h2>
        <p className="text-neutral-500 mb-6">go find something yummy ♡</p>
        <Link to="/" className="bg-blue text-white font-heading font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-all">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="pb-8 pt-4">
        <h1 className="font-heading text-3xl font-bold text-neutral-900">Your little cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start pb-16">
        
        {/* Cart Items List */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border-2 border-neutral-100 flex items-center gap-4">
              <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-soft-yellow to-cream rounded-xl flex items-center justify-center text-3xl">
                {item.emoji}
              </div>
              
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg leading-tight">{item.name}</h3>
                <div className="font-heading font-bold text-blue mt-1">
                  Rp{item.price.toLocaleString('id-ID')}
                </div>
                
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-cream border-2 border-blue/20 flex items-center justify-center text-blue hover:bg-soft-yellow transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="font-bold min-w-[20px] text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-cream border-2 border-blue/20 flex items-center justify-center text-blue hover:bg-soft-yellow transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 self-stretch justify-between">
                <div className="font-heading font-bold text-lg">
                  Rp{(item.price * item.qty).toLocaleString('id-ID')}
                </div>
                <button 
                  onClick={() => updateQty(item.id, -item.qty)} 
                  className="text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm underline underline-offset-2"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="bg-white rounded-2xl shadow-sm border-2 border-neutral-100 p-6 sticky top-28">
          <h2 className="font-heading text-xl font-bold mb-4">Summary</h2>
          
          <div className="flex justify-between items-center py-3 border-b border-neutral-100 text-neutral-600">
            <span>Total items</span>
            <span className="font-medium">{itemsCount} items</span>
          </div>
          
          <div className="flex justify-between items-center py-4 text-lg">
            <span className="font-heading font-bold text-neutral-900">Total</span>
            <span className="font-heading font-bold text-blue">Rp{totalCost.toLocaleString('id-ID')}</span>
          </div>

          <Link to="/checkout" className="mt-4 w-full block text-center bg-blue text-white font-heading font-semibold py-3 rounded-full hover:bg-blue-800 active:scale-[0.98] transition-all">
            Continue to checkout
          </Link>
        </aside>

      </div>
    </div>
  );
}