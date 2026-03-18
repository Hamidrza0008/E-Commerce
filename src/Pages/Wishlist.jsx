import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux_Toolkit/cartSlice";
import { removeFromWishlist, clearWishlist } from "../Redux_Toolkit/wishlistSlice";
import { FaHeart, FaTrash, FaArrowLeft, FaShoppingCart, FaPlus } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const WishlistItems = useSelector((state) => state.wishlist.wishlist);

  return (
    // min-h-screen rakha hai aur overflow-hidden hata diya taaki normal scroll ho sake
    <section className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 md:px-16 relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header - Compact but Bold */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <button 
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-[#D4AF37] transition-all flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold"
              >
                <FaArrowLeft size={10} /> Back
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              The <span className="italic text-[#D4AF37]">Wishlist</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-lg"
            >
              <FaShoppingCart /> View Cart
            </button>
            {WishlistItems.length > 0 && (
              <button
                onClick={() => dispatch(clearWishlist())}
                className="group flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-[10px] uppercase font-bold tracking-widest"
              >
                <FaTrash size={12} /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Grid - Cards ka size bada kar diya hai */}
        {WishlistItems.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[40px] bg-white/[0.01]">
            <FaHeart className="text-white/5 text-8xl mb-4" />
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-black">Your collection is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-8 px-10 py-4 border border-[#D4AF37] text-[#D4AF37] font-black uppercase text-[10px] tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {WishlistItems.map((product) => {
              const isInCart = cartItems.find((p) => p.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-[#0a0a0a] rounded-[30px] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  {/* Remove Button - Top Right */}
                  <button
                    onClick={() => dispatch(removeFromWishlist(product))}
                    className="absolute top-4 right-4 z-20 p-3 bg-black/50 backdrop-blur-xl rounded-full text-white/50 hover:text-red-500 border border-white/10 transition-all"
                  >
                    <FaTrash size={12} />
                  </button>

                  {/* Image Area - Ab thoda bada hai */}
                  <NavLink to={`/product/${product.id}`} className="block relative aspect-square bg-white/[0.02] m-2 rounded-[24px] overflow-hidden">
                    <img
                      src={product.images[0]}
                      className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-700 mix-blend-lighten"
                      alt={product.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </NavLink>

                  {/* Info Area */}
                  <div className="p-6 pt-2">
                    <h3 className="text-white text-xs font-bold uppercase tracking-tight line-clamp-1 mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[#D4AF37] font-black text-xl italic tracking-tighter mb-5">
                      ${product.price}
                    </p>

                    <div className="flex flex-col gap-2">
                      {isInCart ? (
                        <button
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="w-full py-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all"
                        >
                          Remove From Bag
                        </button>
                      ) : (
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="w-full py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
                        >
                          <FaPlus size={8} /> Add To Bag
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;