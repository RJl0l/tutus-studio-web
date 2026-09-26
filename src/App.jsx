import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Instagram, Facebook, Video } from 'lucide-react'; 
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen py-8 px-4">
        {/* Central White Container */}
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl min-h-[90vh] flex flex-col overflow-hidden border-2 border-bakery-red/10">
          
          <header className="pt-8 pb-4 flex justify-center">
            <Link to="/" className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-2 border-bakery-red shadow-sm">
              <span className="text-4xl">🐱👨‍🍳</span>
            </Link>
          </header>

          <main className="flex-1 px-6 sm:px-12 py-4">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>

          {/* Social Media Footer */}
          <footer className="py-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:scale-110 transition-transform"><Instagram size={24} /></a>
              <a href="#" className="hover:scale-110 transition-transform"><Facebook size={24} /></a>
              <a href="#" className="hover:scale-110 transition-transform"><Video size={24} /></a>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase">Click icons for socials and updates!</p>
          </footer>

        </div>
      </div>
    </BrowserRouter>
  );
}