import { Link, useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'TUT-12345';
  const method = location.state?.method || 'cash';
  
  // Replace this with the Admin's WhatsApp number (include country code, no +)
  const adminWhatsApp = "6288211594854";
  const waMessage = encodeURIComponent(`Hello Tutu's Studio! Here is my payment proof for Order ID: ${orderId}.`);
  const waLink = `https://wa.me/${adminWhatsApp}?text=${waMessage}`;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in zoom-in duration-700 text-center px-4">
      
      <div className="border-2 border-tutus-blue p-12 bg-tutus-paper shadow-xl rounded-[3rem] max-w-lg w-full">
        <div className="text-6xl mb-6">💌</div>
        
        <h1 className="font-black text-4xl mb-2">Order Sent!</h1>
        <p className="font-bold text-sm tracking-widest uppercase text-tutus-blue/60 mb-6">ID: {orderId}</p>

        {(method === 'qris' || method === 'transfer') ? (
          <div className="bg-tutus-yellow/20 p-6 rounded-2xl border-2 border-tutus-yellow mb-8">
            <h2 className="font-black uppercase tracking-widest text-sm mb-2 text-red-500">Action Required</h2>
            <p className="font-bold text-xs text-tutus-blue/80 mb-4">
              Your order is pending admin approval. Please send your payment screenshot to confirm!
            </p>
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full font-bold text-xs tracking-widest uppercase bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 active:scale-95 shadow-md transition-all"
            >
              Send Proof to Admin 💬
            </a>
          </div>
        ) : (
          <div className="border-t-2 border-tutus-blue/10 pt-6 mb-8 text-center">
            <p className="font-bold text-sm text-tutus-blue/80 leading-relaxed">
              Thank you! We will message you shortly via WhatsApp to confirm delivery and cash payment. 
            </p>
          </div>
        )}
        
        <Link to="/" className="inline-block w-full font-bold text-xs tracking-widest uppercase border-2 border-tutus-blue text-tutus-blue py-3 rounded-xl hover:bg-tutus-blue/5 active:scale-95 transition-all">
          Back to Shop
        </Link>
      </div>
      
    </div>
  );
}