import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../Redux_Toolkit/ProductSlice";
import { addToCart, removeFromCart } from "../Redux_Toolkit/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Redux_Toolkit/wishlistSlice";
import { FaHeart, FaStar, FaArrowLeft, FaShoppingBag, FaBolt } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const product = useSelector((state) => state.products.productDetails);
  const status = useSelector((state) => state.products.status);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) setMainImage(product.images[0]);
  }, [product]);

  if (status === "pending") {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#050505]">
        <div className="w-10 h-10 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em]">Detailing...</p>
      </div>
    );
  }

  if (!product) return <div className="text-white text-center py-20 bg-[#050505] min-h-screen uppercase tracking-widest">Inventory Not Found</div>;

  const isInCart = cartItems.find((p) => p.id === product.id);
  const isInWishlist = wishlistItems.find((p) => p.id === product.id);

  return (
    // h-screen aur overflow-hidden taaki poora page fixed rahe
    <section className="h-screen bg-[#050505] text-white pt-20 pb-4 px-6 md:px-16 flex flex-col overflow-hidden relative">
      
      {/* Dynamic Background Blur */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        
        {/* Nav - Minimal */}
        <div className="mb-4 shrink-0">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-gray-500 hover:text-white transition text-[9px] uppercase tracking-[0.3em] font-black">
            <FaArrowLeft size={8} className="group-hover:-translate-x-1 transition-transform"/> Back
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center flex-grow overflow-hidden pb-4">

          {/* LEFT: Visuals - Adjusted for height */}
          <div className="flex flex-col gap-4 h-full max-h-[550px]">
            <div className="relative flex-grow bg-white/[0.02] rounded-[30px] border border-white/5 overflow-hidden group flex items-center justify-center">
              <button
                onClick={() => isInWishlist ? dispatch(removeFromWishlist(product)) : dispatch(addToWishlist(product))}
                className="absolute top-5 right-5 z-10 p-3.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white transition-all group/heart"
              >
                <FaHeart size={16} className={isInWishlist ? "text-red-500" : "text-white group-hover/heart:text-black"} />
              </button>
              <img
                src={mainImage || product?.images?.[0]}
                alt={product?.title}
                className="max-h-full w-auto object-contain p-8 mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Thumbnail Gallery - Compact */}
            <div className="flex gap-3 overflow-x-auto shrink-0 no-scrollbar py-2">
              {product?.images?.map((img, i) => (
                <div 
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`min-w-[70px] h-[70px] rounded-xl border-2 transition-all cursor-pointer bg-white/[0.02] p-1.5 flex-shrink-0 ${mainImage === img ? 'border-[#D4AF37]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-lighten" alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Content - Clean Typography */}
          <div className="flex flex-col h-full max-h-[550px] justify-center">
            <div className="mb-6 border-b border-white/5 pb-6">
              <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.5em] mb-2 block">Article #{product.id}</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-3 italic">
                {product.title}
              </h1>
              <div className="flex items-center gap-5">
                <p className="text-white text-3xl font-black tracking-tighter italic">${product.price}</p>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <FaStar className="text-[#D4AF37] text-[10px]" />
                  <span className="text-[10px] font-black tracking-widest text-gray-300">{product.rating}</span>
                </div>
              </div>
            </div>

            {/* Description - Scrollable only if text is too long */}
            <div className="mb-8 overflow-y-auto pr-4 no-scrollbar max-h-32">
              <h3 className="text-gray-500 text-[9px] uppercase tracking-[0.4em] font-black mb-2">Specifications</h3>
              <p className="text-gray-400 text-[12px] leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Action Buttons - Massive but sleek */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              {isInCart ? (
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="flex-[2] py-4 bg-red-500/10 border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
                >
                  Dismiss Bag
                </button>
              ) : (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="flex-[2] py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-95"
                >
                  <FaShoppingBag size={10} /> Secure To Bag
                </button>
              )}
              
              <button className="flex-1 py-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2">
                <FaBolt size={10} /> Instant
              </button>
            </div>

            {/* Micro-Features */}
            <div className="mt-8 flex gap-8 items-center border-t border-white/5 pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none">Complimentary</span>
                <span className="text-gray-600 text-[8px] uppercase tracking-widest">Global Logistics</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10"></div>
              <div className="flex flex-col gap-1">
                <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none">24 Months</span>
                <span className="text-gray-600 text-[8px] uppercase tracking-widest">Full Warranty</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;