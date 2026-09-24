import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCartStore } from '../store';

// ⚠️ REPLACE THIS WITH YOUR REAL GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVp_qOAHToMQt3Z9CZeVXQX4jk4n_P570zFUD4EXlK15pevtGXevnO5rUHKWdOd-2u/exec"; 

export default function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ customerName: '', whatsapp: '', paymentMethod: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (cart.length === 0) return <Navigate to="/cart" replace />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Please tell us your name.";
    const phoneOk = /^[0-9+\s-]{8,15}$/.test(formData.whatsapp.trim());
    if (!formData.whatsapp.trim() || !phoneOk) newErrors.whatsapp = "Please enter a valid WhatsApp number.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Please choose a payment method.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;
    setIsSubmitting(true);

    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const orderId = `TUT-${dateStr}-${Math.floor(Math.random() * 900) + 100}`;
    const orderData = {
      orderId, timestamp: now.toLocaleString("id-ID"),
      customerName: formData.customerName.trim(), whatsapp: formData.whatsapp.trim(),
      items: cart.map(i => `${i.name} x${i.qty}`).join(", "),
      totalItems: totalItems(), totalPrice: totalPrice(), paymentMethod: formData.paymentMethod
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(orderData)
      });
      clearCart();
      navigate('/success', { state: { orderId } });
    } catch (err) {
      setSubmitError("Oops! Something went wrong while sending your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="pb-8 pt-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Checkout.</h1>
      </div>

      <form onSubmit={handleSubmit} className="relative pb-28 lg:pb-16" noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          
          <div className="flex flex-col gap-6">
            <section className="bg-white rounded-[2rem] shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight mb-6">Delivery Details</h2>
              <div className="mb-5">
                <label className="block font-semibold text-sm text-gray-700 mb-2">Full Name</label>
                <input 
                  name="customerName" type="text" placeholder="John Doe"
                  value={formData.customerName} onChange={handleChange}
                  className={`w-full p-3.5 rounded-2xl bg-tutus-bg border border-transparent focus:outline-none focus:border-tutus-blue focus:ring-4 focus:ring-tutus-blue/10 transition-all ${errors.customerName ? 'ring-4 ring-red-500/10 border-red-500' : ''}`}
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-2 font-medium">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-2">WhatsApp Number</label>
                <input 
                  name="whatsapp" type="tel" placeholder="08xx-xxxx-xxxx"
                  value={formData.whatsapp} onChange={handleChange}
                  className={`w-full p-3.5 rounded-2xl bg-tutus-bg border border-transparent focus:outline-none focus:border-tutus-blue focus:ring-4 focus:ring-tutus-blue/10 transition-all ${errors.whatsapp ? 'ring-4 ring-red-500/10 border-red-500' : ''}`}
                />
                {errors.whatsapp && <p className="text-red-500 text-sm mt-2 font-medium">{errors.whatsapp}</p>}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight mb-6">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {['QRIS', 'Bank Transfer', 'Cash'].map(method => (
                  <label key={method} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-tutus-blue bg-tutus-blue/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                    <input 
                      type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleChange}
                      className="w-5 h-5 accent-tutus-blue"
                    />
                    <span className="font-semibold text-gray-800">{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm mt-3 font-medium">{errors.paymentMethod}</p>}
            </section>
          </div>

          <aside className="bg-white rounded-[2rem] shadow-sm p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold tracking-tight mb-4">Summary</h2>
            <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-gray-100">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">
                    {item.name} <br/><span className="text-xs text-gray-400">{item.qty} × Rp{item.price.toLocaleString('id-ID')}</span>
                  </span>
                  <span className="font-bold text-gray-900">Rp{(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-lg mb-8">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-tutus-blue text-xl">Rp{totalPrice().toLocaleString('id-ID')}</span>
            </div>

            <button type="submit" disabled={isSubmitting} className="hidden lg:block w-full bg-tutus-blue text-white font-semibold py-4 rounded-full hover:bg-tutus-blue/90 disabled:opacity-70 active:scale-95 transition-all shadow-md shadow-tutus-blue/20">
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
            {submitError && <p className="hidden lg:block text-red-500 text-sm mt-4 text-center font-medium">{submitError}</p>}
          </aside>
        </div>

        {/* Apple-style Glassmorphism Mobile Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 p-4 pb-8 shadow-lg z-50 flex items-center justify-between gap-6">
          <div className="flex flex-col pl-2">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Total</span>
            <span className="font-bold text-tutus-blue text-xl leading-none">Rp{totalPrice().toLocaleString('id-ID')}</span>
          </div>
          <button type="submit" disabled={isSubmitting} className="flex-1 bg-tutus-blue text-white font-semibold py-3.5 px-6 rounded-full hover:bg-tutus-blue/90 disabled:opacity-70 active:scale-95 transition-all text-center shadow-md shadow-tutus-blue/20">
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}