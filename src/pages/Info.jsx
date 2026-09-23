import { MapPin, Calendar, Clock, Store, Map } from 'lucide-react';

export default function Info() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="pb-10 pt-4 text-center">
        <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">When & where?</h1>
        <p className="text-neutral-600">here's where your little treats will find you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
        
        {/* Pickup Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-neutral-100 flex flex-col">
          <div className="w-14 h-14 bg-blue/10 text-blue rounded-full flex items-center justify-center mb-6">
            <Store size={28} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-blue mb-6">Pickup</h2>
          
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-start gap-3 border-b border-neutral-100 pb-4">
              <MapPin className="text-neutral-400 mt-0.5 shrink-0" size={20} />
              <span className="text-neutral-700">[Pickup location — to be announced]</span>
            </div>
            <div className="flex items-start gap-3 border-b border-neutral-100 pb-4">
              <Calendar className="text-neutral-400 mt-0.5 shrink-0" size={20} />
              <span className="text-neutral-700">[Pickup date]</span>
            </div>
            <div className="flex items-start gap-3 pb-2">
              <Clock className="text-neutral-400 mt-0.5 shrink-0" size={20} />
              <span className="text-neutral-700">[Pickup time]</span>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 mt-6 pt-4 border-t border-neutral-100">
            Look for the Tutus Studio booth and show your order confirmation.
          </p>
        </div>

        {/* Delivery Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-neutral-100 flex flex-col">
          <div className="w-14 h-14 bg-blue/10 text-blue rounded-full flex items-center justify-center mb-6">
            <Map size={28} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-blue mb-6">Delivery</h2>
          
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-start gap-3 border-b border-neutral-100 pb-4">
              <MapPin className="text-neutral-400 mt-0.5 shrink-0" size={20} />
              <span className="text-neutral-700">[Delivery area]</span>
            </div>
            <div className="flex items-start gap-3 border-b border-neutral-100 pb-4">
              <Calendar className="text-neutral-400 mt-0.5 shrink-0" size={20} />
              <span className="text-neutral-700">[Delivery date]</span>
            </div>
            <div className="flex items-start gap-3 pb-2">
              <Clock className="text-neutral-400 mt-0.5 shrink-0" size={20} />
              <span className="text-neutral-700">[Delivery time]</span>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 mt-6 pt-4 border-t border-neutral-100">
            Delivery details will be announced through our official information channel.
          </p>
        </div>

      </div>
    </div>
  );
}