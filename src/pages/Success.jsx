import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in zoom-in duration-700 text-center px-4">
      
      <div className="border-2 border-tutus-blue p-12 sm:p-16 bg-tutus-paper shadow-xl rounded-[3rem] max-w-lg w-full">
        <div className="text-6xl mb-6">💌</div>
        
        <h1 className="font-black text-4xl mb-4">
          Yay, ordered!
        </h1>
        
        <p className="font-bold text-sm tracking-widest uppercase text-tutus-blue/60 mb-8">
          We're making it magical.
        </p>

        <div className="border-t-2 border-tutus-blue/10 pt-8 mb-10 text-left space-y-4">
          <p className="font-bold text-sm text-tutus-blue/80 leading-relaxed text-center">
            Thank you! We will message you shortly via WhatsApp to confirm your details. 
          </p>
        </div>
        
        <Link to="/" className="inline-block w-full font-bold text-sm tracking-widest uppercase bg-tutus-blue text-white py-4 rounded-xl hover:bg-tutus-blue/90 active:scale-95 shadow-md transition-all">
          Back to Shop
        </Link>
      </div>
      
    </div>
  );
}