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
      
      {/* The Kitchen Order Ticket (KOT) */}
      <div className="bg-ticket-white text-ticket-black p-8 sm:p-12 shadow-2xl relative">
        {/* Ticket Header */}
        <div className="border-b-2 border-ticket-black pb-6 mb-8 text-center">
          <h1 className="font-black text-4xl tracking-tighter uppercase mb-2">Order Ticket</h1>
          <p className="font-mono text-xs uppercase tracking-widest">Table: Web // Chk: {Math.floor(Math.random() * 9000) + 1000}</p>
        </div>

        <form onSubmit={handleSubmit} className="font-mono text-sm uppercase space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="tracking-widest font-bold">Client Name</label>
              <input type="text" required onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none focus:border-brass-gold transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tracking-widest font-bold">Contact No.</label>
              <input type="tel" required onChange={e => setFormData({...formData, contactNumber: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none focus:border-brass-gold transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tracking-widest font-bold">Req. Date</label>
              <input type="date" required onChange={e => setFormData({...formData, dateNeeded: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tracking-widest font-bold">Req. Time</label>
              <input type="time" required onChange={e => setFormData({...formData, timeNeeded: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="tracking-widest font-bold">Service Type</label>
            <select onChange={e => setFormData({...formData, deliveryMethod: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none cursor-pointer">
              <option value="pick up">PICK UP (FRONT OF HOUSE)</option>
              <option value="deliver">DELIVERY (EXTERNAL)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="tracking-widest font-bold">Location Details</label>
            <input type="text" onChange={e => setFormData({...formData, location: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none focus:border-brass-gold transition-colors" placeholder="IF DELIVERY..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="tracking-widest font-bold">Payment Tender</label>
            <select onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="bg-transparent border-b border-ticket-black py-2 focus:outline-none cursor-pointer">
              <option value="cash">CASH ON HAND</option>
              <option value="qris">DIGITAL QRIS</option>
              <option value="transfer">BANK WIRE</option>
            </select>
          </div>

          {/* Ticket Items Breakdown */}
          <div className="border-t-2 border-ticket-black pt-6 mt-8">
            <h2 className="tracking-widest font-bold mb-4">Itemized Breakdown</h2>
            <div className="space-y-2 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-end border-b border-ticket-black/20 pb-1">
                  <span>{item.qty} x {item.name}</span>
                  <span>Rp{(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>BALANCE DUE</span>
              <span>Rp{totalPrice().toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-ticket-black text-ticket-white py-4 mt-8 font-bold tracking-widest hover:bg-brass-gold hover:text-ticket-black transition-colors disabled:opacity-50">
            {isSubmitting ? 'TRANSMITTING...' : 'FIRE ORDER'}
          </button>
        </form>
      </div>
    </div>
  );
}