import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from './store';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

export default function App() {
  const totalItems = useCartStore(state => state.totalItems());

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-brass-gold selection:text-kitchen-black">
        
        <header className="border-b border-white/10 sticky top-0 bg-kitchen-black/90 backdrop-blur-md z-50">
          <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter uppercase leading-none">Tutu's</span>
              <span className="font-mono text-xs tracking-widest text-brass-gold">TANGERANG, ID</span>
            </Link>

            <Link to="/cart" className="flex items-center gap-3 group">
              <span className="font-mono text-sm tracking-widest uppercase hidden sm:block group-hover:text-brass-gold transition-colors">
                Order Ticket
              </span>
              <div className="relative">
                <ShoppingBag size={20} className="group-hover:text-brass-gold transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 font-mono text-[10px] bg-ticket-white text-kitchen-black px-1.5 py-0.5 font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>

        <footer className="border-t border-white/10 py-8 text-center">
          <p className="font-mono text-xs tracking-widest text-white/40 uppercase">
            © 2026 Tutu's Studio // Service 01
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}