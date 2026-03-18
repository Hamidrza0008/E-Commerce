import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Redux_Toolkit/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCheckCircle, FaTruck, FaCreditCard, FaWallet, FaBox, FaArrowLeft } from "react-icons/fa";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      dispatch(clearCart());
      navigate("/");
    }, 2500);
  };

  return (
    // pt-16 aur pb-4 kiya hai taaki upar-niche se jagah bache
    <section className="h-screen bg-[#050505] text-white pt-16 pb-4 px-6 md:px-16 flex flex-col overflow-hidden relative">
      
      {/* Success Overlay */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              <FaCheckCircle size={40} className="text-black" />
            </div>
            <h1 className="text-3xl font-black uppercase italic">Order Placed</h1>
            <p className="text-gray-500 text-[10px] tracking-widest mt-2 uppercase font-bold">Redirecting to showroom...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
            <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-lg hover:text-[#D4AF37] transition-all">
                <FaArrowLeft size={10} />
            </button>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Secure Checkout</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-full overflow-hidden">
          
          {/* LEFT: Forms (Scrollable) */}
          <div className="lg:col-span-7 overflow-y-auto no-scrollbar pr-2 space-y-4">
            
            {/* SHIPPING */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[28px]">
              <div className="flex items-center gap-3 mb-6">
                 <FaTruck className="text-[#D4AF37]" size={16} />
                 <h3 className="text-sm font-black uppercase tracking-widest italic">Shipping Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <CustomInput placeholder="Full Name" />
                <CustomInput placeholder="Phone Number" />
                <div className="md:col-span-2">
                  <CustomInput placeholder="Detailed Address" />
                </div>
                <CustomInput placeholder="City" />
                <CustomInput placeholder="Pin Code" />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[28px]">
              <div className="flex items-center gap-3 mb-6">
                 <FaCreditCard className="text-[#D4AF37]" size={16} />
                 <h3 className="text-sm font-black uppercase tracking-widest italic">Payment Method</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <PaymentOption active={paymentMethod === "UPI"} onClick={() => setPaymentMethod("UPI")} icon={<FaWallet size={14}/>} label="UPI" />
                <PaymentOption active={paymentMethod === "CARD"} onClick={() => setPaymentMethod("CARD")} icon={<FaCreditCard size={14}/>} label="CARD" />
                <PaymentOption active={paymentMethod === "COD"} onClick={() => setPaymentMethod("COD")} icon={<FaBox size={14}/>} label="COD" />
              </div>
            </div>
          </div>

          {/* RIGHT: Summary (Squeezed to fit) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <div className="bg-[#0c0c0c] border border-white/10 p-6 rounded-[35px] flex flex-col h-full max-h-[500px]">
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 border-b border-white/5 pb-3">Cart Overview</h2>

              {/* Items List - Internal Scroll */}
              <div className="flex-grow overflow-y-auto no-scrollbar space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-white/[0.01] p-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={item.images[0]} className="w-10 h-10 object-contain mix-blend-lighten bg-white/5 rounded-lg" alt="item" />
                      <div className="truncate">
                        <p className="text-[9px] font-black uppercase truncate w-24">{item.title}</p>
                        <p className="text-[8px] text-gray-600 font-bold tracking-widest uppercase">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-black italic text-xs text-[#D4AF37]">${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Bottom Totals */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-[#D4AF37]">Complimentary</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase pb-1">Total</span>
                  <span className="text-4xl font-black italic tracking-tighter leading-none">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* ACTION BUTTON - Elevated slightly */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-white text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#D4AF37] transition-all active:scale-95 shadow-2xl"
              >
                Confirm Transaction
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Reusable Small Components
function CustomInput({ ...props }) {
  return (
    <input {...props} className="w-full bg-white/[0.02] border border-white/5 p-3 rounded-xl text-[10px] font-bold placeholder:text-gray-700 focus:outline-none focus:border-[#D4AF37]/40 transition-all uppercase tracking-wider" />
  );
}

function PaymentOption({ active, onClick, icon, label }) {
  return (
    <div onClick={onClick} className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${active ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37]' : 'border-white/5 bg-white/[0.01] text-gray-700'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default Checkout;