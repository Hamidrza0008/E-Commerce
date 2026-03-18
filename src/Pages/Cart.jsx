import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux_Toolkit/cartSlice";
import { FaTrash, FaShoppingBag, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartPrice = useSelector((state) => state.cart.totalPrice);

  return (
    // h-screen aur overflow-hidden taaki poora page scroll na ho
    <section className="h-screen bg-[#050505] text-white pt-20 px-6 md:px-16 flex flex-col overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full pb-6">
        
        {/* Header Section - Shrink-0 taaki ye apni jagah na chhode */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/")}
              className="p-2.5 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <FaArrowLeft size={12} />
            </button>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
              Shopping <span className="text-[#D4AF37] not-italic">Bag</span>
            </h1>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            {cartItems.length} items
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[40px] bg-white/[0.01]">
            <FaShoppingBag className="text-white/5 text-7xl mb-6" />
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-[#D4AF37] text-black font-black uppercase text-[10px] tracking-widest rounded-xl"
            >
              Back to Store
            </button>
          </div>
        ) : (
          // Main Content Area - Iski height fixed hai
          <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
            
            {/* 1. PRODUCT LIST - Sirf ye area scroll hoga */}
            <div className="flex-grow overflow-y-auto no-scrollbar pr-2 space-y-4 pb-10">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-6 bg-white/[0.03] p-5 rounded-[28px] border border-white/5 hover:border-white/10 transition-all shadow-xl"
                >
                  {/* Image - Balanced Size */}
                  <div className="w-28 h-28 md:w-32 md:h-32 bg-white/[0.02] rounded-2xl p-3 flex-shrink-0 border border-white/5">
                    <img
                      src={item.images[0]}
                      className="w-full h-full object-contain mix-blend-lighten group-hover:scale-110 transition-transform duration-500"
                      alt={item.title}
                    />
                  </div>

                  {/* Info - Clean & Bold */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-xs md:text-sm font-black uppercase tracking-tight truncate mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#D4AF37] font-black text-xl italic tracking-tighter mb-4">
                      ${item.price}
                    </p>

                    <div className="flex items-center justify-between">
                        {/* Quantity - Solid Capsule */}
                        <div className="flex items-center gap-5 bg-black/60 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                            <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-500 hover:text-white transition-all"><FaMinus size={10} /></button>
                            <span className="text-white font-black text-sm">{item.quantity}</span>
                            <button onClick={() => dispatch(addToCart(item))} className="text-gray-500 hover:text-white transition-all"><FaPlus size={10} /></button>
                        </div>
                        
                        <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-700 hover:text-red-500 transition-colors">
                            <FaTrash size={14} />
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. ORDER SUMMARY - Ye apni jagah fixed rahega */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-[#0c0c0c] p-8 rounded-[40px] border border-white/10 shadow-2xl flex flex-col">
                <h3 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-4">
                  Summary
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">${cartPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-[#D4AF37] italic">FREE</span>
                  </div>
                  <div className="h-[1px] bg-white/5 my-4"></div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-gray-400 font-black tracking-widest">TOTAL</span>
                    <span className="text-4xl font-black text-white italic tracking-tighter">
                      ${cartPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95"
                >
                  Checkout Now
                </button>
                
                <p className="mt-6 text-[8px] text-gray-700 font-bold text-center uppercase tracking-[0.3em]">
                    Premium Secure Checkout
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;