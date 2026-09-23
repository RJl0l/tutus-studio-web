import { useState, useEffect } from 'react'; // Add these hooks
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Info as InfoIcon, Store } from 'lucide-react';
import { useCartStore } from './store';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Info from './pages/Info';

export default function App() {
  const totalItems = useCartStore(state => state.totalItems());
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    if (totalItems === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-cream text-neutral-800 font-body">
        <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b-2 border-neutral-200">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-neutral-900">
              <span className="text-2xl">🐱👨‍🍳</span> TUTU'S STUDIO
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 font-heading font-semibold text-neutral-700">
              <Link to="/" className="hover:text-blue flex items-center gap-2"><Store size={20}/> Shop</Link>
              <Link to="/info" className="hover:text-blue flex items-center gap-2"><InfoIcon size={20}/> Info</Link>
              <Link to="/cart" className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
                <ShoppingCart size={20}/>
                <span className={`text-sm px-2 py-0.5 rounded-full transform transition-all duration-300 ${
                  isBumping ? 'scale-150 bg-blue text-white' : 'scale-100 bg-soft-yellow text-neutral-900'
                }`}>
                  {totalItems}
                </span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>

        <footer className="py-8 text-center text-sm text-neutral-500">
          <p>Tutus Studio ♡ little treats, made lovely.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}