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
      <div className="min-h-screen flex flex-col font-sans">
        
        <header className="border-b-2 border-tutus-blue/10 sticky top-0 bg-tutus-cream/90 backdrop-blur-md z-50">
          <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-3xl">🐱</span>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight uppercase leading-none">Tutu's Studio</span>
                <span className="font-medium text-xs text-tutus-blue/60">MADE TO BE OBSESSED</span>
              </div>
            </Link>

            <Link to="/cart" className="flex items-center gap-3 group bg-tutus-paper border-2 border-tutus-blue/10 px-4 py-2 rounded-full hover:border-tutus-blue transition-colors">
              <span className="font-bold text-sm uppercase hidden sm:block">
                Your Bag
              </span>
              <div className="relative">
                <ShoppingBag size={20} className="text-tutus-blue" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 font-bold text-[10px] bg-tutus-yellow text-tutus-blue w-5 h-5 flex items-center justify-center rounded-full border border-tutus-blue">
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

        <footer className="py-8 text-center border-t-2 border-tutus-blue/10">
          <p className="font-bold text-sm tracking-widest text-tutus-blue/40 uppercase">
            ♡ Tutu's Studio ♡
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}