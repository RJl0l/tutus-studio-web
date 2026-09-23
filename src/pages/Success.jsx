import { useLocation, Link, Navigate } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  // If someone tries to access /success directly without ordering, send them to shop
  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="animate-in fade-in flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-blue text-5xl mb-4 animate-bounce">♡</div>
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">Yay, it's ordered!</h1>
      <p className="text-neutral-600 mb-6">your little treats are officially on their way to you.</p>
      
      <div className="bg-soft-yellow text-neutral-900 font-heading font-bold px-6 py-2 rounded-full mb-8">
        Order #{orderId}
      </div>
      
      <p className="text-sm text-neutral-500 mb-8">Thank you for supporting Tutus Studio ♡</p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link to="/info" className="bg-blue text-white font-heading font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-all">
          See pickup & delivery info
        </Link>
        <Link to="/" className="bg-transparent text-blue border-2 border-blue font-heading font-semibold px-8 py-3 rounded-full hover:bg-blue hover:text-white transition-all">
          Back to shop
        </Link>
      </div>
    </div>
  );
}