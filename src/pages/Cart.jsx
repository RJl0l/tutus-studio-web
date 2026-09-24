import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500 text-center">
        <div className="w-24 h-24 bg-tutus-yellow/30 text-tutus-blue rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Your bag is empty.</h2>
        <p className="text-gray-500 mb-8 font-medium">Let's find something magical for you.</p>
        <Link to="/" className="bg-tutus-blue text-white px-8 py-3.5 rounded-full font-semibold hover:bg-tutus-blue/90 transition-all active:scale-95 shadow-md shadow-tutus-blue/20">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="mb-8 pt-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Review your bag.</h1>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm p-4 sm:p-6 mb-6">
        <div className="flex flex-col gap-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="w-20 h-20 bg-tutus-bg rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                <div className="font-medium text-gray-500 mt-1">Rp{item.price.toLocaleString('id-ID')}</div>
              </div>
              
              <div className="flex items-center gap-3 bg-tutus-bg rounded-full p-1.5">
                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-tutus-blue active:scale-95 transition-all">
                  {item.qty === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} />}
                </button>
                <span className="font-semibold text-gray-900 w-4 text-center">{item.qty}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-tutus-blue active:scale-95 transition-all">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">Total</p>
          <p className="text-3xl font-bold text-tutus-blue tracking-tight">Rp{totalPrice().toLocaleString('id-ID')}</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/" className="flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-gray-600 bg-tutus-bg hover:bg-gray-200 transition-colors flex-1 sm:flex-none">
            Back
          </Link>
          <Link to="/checkout" className="flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-white bg-tutus-blue hover:bg-tutus-blue/90 active:scale-95 transition-all flex-1 sm:flex-none shadow-md shadow-tutus-blue/20">
            Check Out
          </Link>
        </div>
      </div>
    </div>
  );
}