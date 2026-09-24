import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'TUT-XXXXXX-XXX';

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-sm p-10 max-w-md w-full text-center border border-gray-100">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" strokeWidth={1.5} />
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3">Yay, it's ordered!</h1>
        <p className="text-gray-500 font-medium mb-8">
          Thank you for choosing us. We'll contact you shortly via WhatsApp to confirm delivery details.
        </p>
        
        <div className="bg-tutus-bg rounded-2xl p-4 mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
          <p className="font-mono font-bold text-lg text-tutus-blue">{orderId}</p>
        </div>

        <Link to="/" className="inline-block w-full bg-tutus-blue text-white font-semibold py-4 rounded-full hover:bg-tutus-blue/90 active:scale-95 transition-all shadow-md shadow-tutus-blue/20">
          Back to Shop
        </Link>
      </div>
    </div>
  );
}