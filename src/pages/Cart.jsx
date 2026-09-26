import { Link } from 'react-router-dom';
import { useCartStore } from '../store';

export default function Cart() {
  const { cart, updateQuantity, totalPrice } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[50vh] text-center bg-tutus-paper rounded-[2rem] border-2 border-tutus-blue/10 p-12">
        <h2 className="font-black text-3xl mb-4">your cart is feeling lonely...</h2>
        <p className="font-bold text-sm tracking-widest uppercase text-tutus-blue/50 mb-8">go find something yummy ♡</p>
        <Link to="/" className="font-bold tracking-widest uppercase bg-tutus-blue text-white px-8 py-3 rounded-full hover:bg-tutus-blue/90 active:scale-95 transition-all shadow-md">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="mb-12 border-b-2 border-tutus-blue/10 pb-6">
        <h1 className="font-black text-4xl tracking-tighter">Review Bag.</h1>
      </div>

      <div className="flex flex-col gap-4 mb-12">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-tutus-blue/10 bg-tutus-paper p-6 rounded-2xl group">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-black text-xl mb-1">{item.name}</h3>
              <p className="font-bold text-sm text-tutus-blue/60">Rp{item.price.toLocaleString('id-ID')}</p>
            </div>
            
            <div className="flex items-center gap-6 font-bold text-lg bg-tutus-cream border-2 border-tutus-blue/10 rounded-full px-2 py-1">
              <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-tutus-blue/10 rounded-full transition-colors active:scale-95">-</button>
              <span className="w-4 text-center">{item.qty}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-tutus-blue/10 rounded-full transition-colors active:scale-95">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border-2 border-tutus-blue/10 p-8 bg-tutus-yellow/20 rounded-[2rem]">
        <div className="flex flex-col mb-6 sm:mb-0 text-center sm:text-left">
          <span className="font-bold text-xs tracking-widest uppercase text-tutus-blue/60 mb-1">Total Balance</span>
          <span className="font-black text-3xl">Rp{totalPrice().toLocaleString('id-ID')}</span>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Link to="/" className="flex-1 sm:flex-none text-center font-bold text-xs tracking-widest uppercase border-2 border-tutus-blue px-6 py-4 rounded-xl hover:bg-tutus-blue/5 transition-colors">
            Add More
          </Link>
          <Link to="/checkout" className="flex-1 sm:flex-none text-center font-bold text-xs tracking-widest uppercase bg-tutus-blue text-white px-8 py-4 rounded-xl hover:bg-tutus-blue/90 shadow-md transition-colors">
            Check Out
          </Link>
        </div>
      </div>
    </div>
  );
}