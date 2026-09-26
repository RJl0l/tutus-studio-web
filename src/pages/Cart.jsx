import { Link } from 'react-router-dom';
import { useCartStore } from '../store';

export default function Cart() {
  const { cart, updateQuantity, totalPrice } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center min-h-[50vh] text-center border border-white/10 p-12">
        <h2 className="font-black text-4xl uppercase tracking-tighter mb-4 text-white/30">Station Empty</h2>
        <p className="font-mono text-sm tracking-widest uppercase text-white/50 mb-8">No items boarded on the line.</p>
        <Link to="/" className="font-mono text-xs tracking-widest uppercase border border-brass-gold text-brass-gold px-8 py-3 hover:bg-brass-gold hover:text-kitchen-black transition-colors">
          Return to Pass
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="mb-12 border-b border-white/10 pb-6">
        <h1 className="font-black text-5xl uppercase tracking-tighter">Review Prep List</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 group">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-black text-2xl uppercase tracking-tighter group-hover:text-brass-gold transition-colors">{item.name}</h3>
              <p className="font-mono text-sm tracking-widest text-white/50 uppercase">Rp{item.price.toLocaleString('id-ID')}</p>
            </div>
            
            <div className="flex items-center gap-6 font-mono text-lg">
              <div className="flex items-center border border-white/20">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-2 hover:bg-white/10 transition-colors active:scale-95">-</button>
                <span className="px-4 py-2 border-x border-white/20 min-w-[3rem] text-center">{item.qty}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-2 hover:bg-white/10 transition-colors active:scale-95">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border border-white/10 p-8 bg-white/5">
        <div className="flex flex-col mb-6 sm:mb-0 text-center sm:text-left">
          <span className="font-mono text-xs tracking-widest uppercase text-white/50 mb-1">Total Balance</span>
          <span className="font-black text-3xl tracking-tighter text-brass-gold">Rp{totalPrice().toLocaleString('id-ID')}</span>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Link to="/" className="flex-1 sm:flex-none text-center font-mono text-xs tracking-widest uppercase border border-white/20 px-6 py-4 hover:bg-white hover:text-kitchen-black transition-colors">
            Modify
          </Link>
          <Link to="/checkout" className="flex-1 sm:flex-none text-center font-mono text-xs tracking-widest uppercase bg-ticket-white text-ticket-black px-8 py-4 hover:bg-brass-gold transition-colors font-bold">
            Proceed to Ticket
          </Link>
        </div>
      </div>
    </div>
  );
}