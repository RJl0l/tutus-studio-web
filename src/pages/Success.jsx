import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in zoom-in duration-700 text-center px-4">
      
      <div className="border border-brass-gold p-12 sm:p-16 relative bg-kitchen-charcoal shadow-2xl max-w-lg w-full">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brass-gold -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brass-gold translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brass-gold -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brass-gold translate-x-1 translate-y-1"></div>
        
        <h1 className="font-black text-5xl sm:text-6xl tracking-tighter uppercase mb-4 text-ticket-white">
          Order<br/>Fired.
        </h1>
        
        <p className="font-mono text-sm tracking-widest uppercase text-brass-gold mb-8">
          Ticket transmitted to the kitchen.
        </p>

        <div className="border-t border-white/10 pt-8 mb-10 text-left space-y-4">
          <p className="font-mono text-xs tracking-widest uppercase text-white/60 leading-relaxed">
            <span className="text-brass-gold font-bold">Status:</span> Pending Confirmation<br/><br/>
            The brigade has received your ticket. Stand by for final verification and payment processing via WhatsApp. 
          </p>
        </div>
        
        <Link to="/" className="inline-block w-full font-mono text-xs font-bold tracking-widest uppercase bg-ticket-white text-ticket-black py-4 hover:bg-brass-gold transition-colors">
          Return to Menu
        </Link>
      </div>
      
    </div>
  );
}