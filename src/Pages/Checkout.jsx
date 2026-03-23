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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      setError("Please fill all shipping details ❗");
      return;
    }

    setError("");
    setOrderSuccess(true);

    setTimeout(() => {
      dispatch(clearCart());
      navigate("/");
    }, 2500);
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white pt-16 pb-6 px-6 md:px-16 flex flex-col relative">

      {/* SUCCESS */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(212,175,55,0.4)]">
              <FaCheckCircle size={45} className="text-black" />
            </div>
            <h1 className="text-4xl font-black uppercase italic">Order Placed</h1>
            <p className="text-gray-400 text-xs tracking-widest mt-3 uppercase font-bold">
              Redirecting to Home...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-3 bg-white/5 rounded-xl hover:text-[#D4AF37]">
            <FaArrowLeft size={14} />
          </button>

          <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#D4AF37]">
            Secure Checkout
          </h2>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* SHIPPING */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px]">
              <div className="flex items-center gap-3 mb-8">
                <FaTruck className="text-[#D4AF37]" size={20} />
                <h3 className="text-lg font-black uppercase tracking-widest italic">
                  Shipping Info
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input name="name" onChange={handleChange} placeholder="Full Name"
                  className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm" />

                <input name="phone" onChange={handleChange} placeholder="Phone Number"
                  className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm" />

                <div className="md:col-span-2">
                  <input name="address" onChange={handleChange} placeholder="Detailed Address"
                    className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm" />
                </div>

                <input name="city" onChange={handleChange} placeholder="City"
                  className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm" />

                <input name="pincode" onChange={handleChange} placeholder="Pin Code"
                  className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm" />
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-4">{error}</p>
              )}
            </div>

            {/* PAYMENT */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px]">
              <div className="flex items-center gap-3 mb-8">
                <FaCreditCard className="text-[#D4AF37]" size={20} />
                <h3 className="text-lg font-black uppercase tracking-widest italic">
                  Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div onClick={() => setPaymentMethod("UPI")}
                  className={`p-5 rounded-2xl border cursor-pointer flex flex-col items-center gap-3 ${
                    paymentMethod === "UPI"
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-white/5 text-gray-500"
                  }`}>
                  <FaWallet size={20} />
                  <span className="text-xs font-black">UPI</span>
                </div>

                <div onClick={() => setPaymentMethod("CARD")}
                  className={`p-5 rounded-2xl border cursor-pointer flex flex-col items-center gap-3 ${
                    paymentMethod === "CARD"
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-white/5 text-gray-500"
                  }`}>
                  <FaCreditCard size={20} />
                  <span className="text-xs font-black">CARD</span>
                </div>

                <div onClick={() => setPaymentMethod("COD")}
                  className={`p-5 rounded-2xl border cursor-pointer flex flex-col items-center gap-3 ${
                    paymentMethod === "COD"
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-white/5 text-gray-500"
                  }`}>
                  <FaBox size={20} />
                  <span className="text-xs font-black">COD</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#0c0c0c] border border-white/10 p-8 rounded-[35px] flex flex-col h-fit sticky top-20">

            <h2 className="text-xs font-black uppercase text-gray-500 mb-6 border-b border-white/5 pb-3">
              Cart Overview
            </h2>

            {/* ITEMS */}
            <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images?.[0] || item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-contain bg-white/5 rounded-xl p-1"
                    />

                    <div>
                      <p className="text-sm font-black uppercase w-36 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="text-base font-black text-[#D4AF37]">
                    ${item.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between mb-6">
              <span className="text-gray-400">Total</span>
              <span className="text-3xl font-black text-[#D4AF37]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase hover:bg-[#D4AF37] transition-all"
            >
              Confirm Transaction
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Checkout;