import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCartStore } from '../store';

// Update this line near the top of src/pages/Checkout.jsx
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVp_qOAHToMQt3Z9CZeVXQX4jk4n_P570zFUD4EXlK15pevtGXevnO5rUHKWdOd-2u/exec";

export default function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ customerName: '', whatsapp: '', paymentMethod: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Please tell us your name.";
    
    const phoneOk = /^[0-9+\s-]{8,15}$/.test(formData.whatsapp.trim());
    if (!formData.whatsapp.trim() || !phoneOk) {
      newErrors.whatsapp = "Please enter a valid WhatsApp number (e.g., 08xx-xxxx).";
    }
    
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
      orderId,
      timestamp: now.toLocaleString("id-ID"),
      customerName: formData.customerName.trim(),
      whatsapp: formData.whatsapp.trim(),
      items: cart.map(i => `${i.name} x${i.qty}`).join(", "),
      totalItems: totalItems(),
      totalPrice: totalPrice(),
      paymentMethod: formData.paymentMethod
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
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
        <h1 className="font-heading text-3xl font-bold text-neutral-900">Ready to check out?</h1>
      </div>

      <form onSubmit={handleSubmit} className="relative pb-28 lg:pb-16" noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          
          <div className="flex flex-col gap-6">
            {/* Details Section */}
            <section className="bg-white rounded-2xl shadow-sm border-2 border-neutral-100 p-6 sm:p-8">
              <h2 className="font-heading text-xl font-bold mb-6">Your details</h2>
              
              <div className="mb-4">
                <label htmlFor="customerName" className="block font-semibold text-sm mb-2">Name</label>
                <input 
                  id="customerName" name="customerName" type="text"
                  value={formData.customerName} onChange={handleChange}
                  className={`w-full p-3 rounded-xl border-2 bg-cream font-body focus:outline-none focus:border-blue transition-colors ${errors.customerName ? 'border-red-500' : 'border-neutral-200'}`}
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label htmlFor="whatsapp" className="block font-semibold text-sm mb-2">WhatsApp number</label>
                <input 
                  id="whatsapp" name="whatsapp" type="tel" placeholder="08xx-xxxx-xxxx"
                  value={formData.whatsapp} onChange={handleChange}
                  className={`w-full p-3 rounded-xl border-2 bg-cream font-body focus:outline-none focus:border-blue transition-colors ${errors.whatsapp ? 'border-red-500' : 'border-neutral-200'}`}
                />
                {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white rounded-2xl shadow-sm border-2 border-neutral-100 p-6 sm:p-8">
              <h2 className="font-heading text-xl font-bold mb-6">How would you like to pay?</h2>
              <div className="flex flex-col gap-3">
                {['QRIS', 'Bank Transfer', 'Cash'].map(method => (
                  <label key={method} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${formData.paymentMethod === method ? 'border-blue bg-blue/5' : 'border-neutral-200 hover:border-blue/50'}`}>
                    <input 
                      type="radio" name="paymentMethod" value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      className="w-5 h-5 accent-blue"
                    />
                    <span className="font-medium">{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
            </section>

            {/* Mobile Error Output */}
            {submitError && <p className="lg:hidden text-red-500 text-sm bg-red-50 p-3 rounded-lg">{submitError}</p>}
          </div>

          {/* Order Summary Sidebar & Desktop Submit */}
          <aside className="bg-white rounded-2xl shadow-sm border-2 border-neutral-100 p-6 lg:sticky lg:top-28">
            <h2 className="font-heading text-xl font-bold mb-4">Your order</h2>
            
            <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-neutral-100">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-600">
                    {item.name} <br/><span className="text-xs text-neutral-400">{item.qty} × Rp{item.price.toLocaleString('id-ID')}</span>
                  </span>
                  <span className="font-medium">Rp{(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center py-2 text-lg mb-6">
              <span className="font-heading font-bold text-neutral-900">Total</span>
              <span className="font-heading font-bold text-blue">Rp{totalPrice().toLocaleString('id-ID')}</span>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="hidden lg:block w-full bg-blue text-white font-heading font-semibold py-3 rounded-full hover:bg-blue-800 disabled:opacity-70 disabled:hover:bg-blue transition-all"
            >
              {isSubmitting ? 'Placing order...' : 'Place order'}
            </button>
            
            {submitError && <p className="hidden lg:block text-red-500 text-sm mt-3 bg-red-50 p-3 rounded-lg">{submitError}</p>}
          </aside>
        </div>

        {/* Mobile Fixed Bottom Checkout Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-50 flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-0.5">Total</span>
            <span className="font-heading font-bold text-blue text-xl leading-none">Rp{totalPrice().toLocaleString('id-ID')}</span>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-blue text-white font-heading font-semibold py-3.5 px-4 rounded-full hover:bg-blue-800 disabled:opacity-70 active:scale-95 transition-all text-center shadow-md"
          >
            {isSubmitting ? 'Placing...' : 'Place order'}
          </button>
        </div>
      </form>
    </div>
  );
}