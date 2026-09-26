import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCartStore } from '../store';

// ⚠️ REPLACE WITH YOUR REAL GOOGLE SCRIPT URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVp_qOAHToMQt3Z9CZeVXQX4jk4n_P570zFUD4EXlK15pevtGXevnO5rUHKWdOd-2u/exec"; 

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', contactNumber: '', dateNeeded: '', timeNeeded: '', 
    deliveryMethod: 'pick up', location: '', paymentMethod: 'cash' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const orderData = { ...formData, items: cart.map(i => `${i.name} x${i.qty}`).join(", "), totalPrice: totalPrice() };

    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(orderData) });
      clearCart();
      navigate('/success');
    } catch { setIsSubmitting(false); }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      
      <div className="bg-tutus-paper border-2 border-tutus-blue p-8 sm:p-12 shadow-xl rounded-[2rem] relative">
        <div className="border-b-2 border-tutus-blue/20 pb-6 mb-8 text-center">
          <h1 className="font-black text-3xl uppercase mb-2">Order Form 📝</h1>
          <p className="font-bold text-xs uppercase tracking-widest text-tutus-blue/60">Fill out to confirm your treats</p>
        </div>

        <form onSubmit={handleSubmit} className="font-bold text-sm space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="tracking-widest uppercase text-xs text-tutus-blue/70">Name</label>
              <input type="text" required onChange={e => setFormData({...formData, name: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tracking-widest uppercase text-xs text-tutus-blue/70">WhatsApp No.</label>
              <input type="tel" required onChange={e => setFormData({...formData, contactNumber: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tracking-widest uppercase text-xs text-tutus-blue/70">Date Needed</label>
              <input type="date" required onChange={e => setFormData({...formData, dateNeeded: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue text-tutus-blue" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tracking-widest uppercase text-xs text-tutus-blue/70">Time Needed</label>
              <input type="time" required onChange={e => setFormData({...formData, timeNeeded: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue text-tutus-blue" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="tracking-widest uppercase text-xs text-tutus-blue/70">Deliver or Pick Up?</label>
            <select onChange={e => setFormData({...formData, deliveryMethod: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue cursor-pointer">
              <option value="pick up">Pick Up</option>
              <option value="deliver">Delivery</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="tracking-widest uppercase text-xs text-tutus-blue/70">Location Details</label>
            <input type="text" onChange={e => setFormData({...formData, location: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue transition-colors" placeholder="If delivery..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="tracking-widest uppercase text-xs text-tutus-blue/70">Payment Method</label>
            <select onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="bg-tutus-cream border-2 border-tutus-blue/20 rounded-xl px-4 py-3 focus:outline-none focus:border-tutus-blue cursor-pointer">
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="border-t-2 border-tutus-blue/20 pt-6 mt-8 bg-tutus-yellow/10 p-6 rounded-2xl">
            <h2 className="tracking-widest uppercase text-xs text-tutus-blue/70 mb-4">Your Order</h2>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-end border-b border-tutus-blue/10 pb-2">
                  <span>{item.qty}x {item.name}</span>
                  <span>Rp{(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xl font-black">
              <span>TOTAL</span>
              <span>Rp{totalPrice().toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-tutus-blue text-white py-4 mt-8 font-bold tracking-widest uppercase rounded-xl hover:bg-tutus-blue/90 active:scale-95 transition-all shadow-md disabled:opacity-50">
            {isSubmitting ? 'Sending...' : 'Submit Order ♡'}
          </button>
        </form>
      </div>
    </div>
  );
}