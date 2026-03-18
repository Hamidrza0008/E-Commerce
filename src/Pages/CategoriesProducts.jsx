import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart, removeFromCart } from "../Redux_Toolkit/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Redux_Toolkit/wishlistSlice";
import { FaHeart, FaPlus } from "react-icons/fa";

function CategoriesProducts() {
  const products = useSelector((state) => state.products.items || []);
  const status = useSelector((state) => state.products.status);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);

  const dispatch = useDispatch();

  if (status === "pending") {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center bg-[#050505]">
        <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] animate-pulse">Refining Collection...</p>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-16 py-12 bg-[#050505] min-h-screen">
      
      {/* Dynamic Header */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black mb-2">Category</span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">
          Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white not-italic">Selection</span>
        </h2>
        <div className="w-12 h-[1px] bg-[#D4AF37] mt-4 opacity-50"></div>
      </div>

      {/* Tight Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8">
        {products.map((product) => {
          const isInCart = cartItems.find((p) => p.id === product.id);
          const isInWishlist = wishlistItems.find((p) => p.id === product.id);

          return (
            <div
              key={product.id}
              className="group relative flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden shadow-2xl"
            >
              {/* Floating Wishlist Button */}
              <button
                onClick={() =>
                  isInWishlist
                    ? dispatch(removeFromWishlist(product))
                    : dispatch(addToWishlist(product))
                }
                className="absolute top-3 right-3 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white transition-all duration-300 group/heart"
              >
                <FaHeart size={10} className={isInWishlist ? "text-red-500" : "text-white group-hover/heart:text-black"} />
              </button>

              {/* Product Image Container */}
              <NavLink 
                to={`/product/${product.id}`} 
                className="relative aspect-square overflow-hidden bg-white/[0.02] m-2 rounded-xl"
              >
                <img
                  src={product.images[0]}
                  className="w-full h-full object-contain p-4 mix-blend-lighten transform group-hover:scale-110 transition-transform duration-700"
                  alt={product.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </NavLink>

              {/* Product Info */}
              <div className="p-4 pt-0">
                <h3 className="text-white text-[11px] font-bold uppercase tracking-tight line-clamp-1 mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-[#D4AF37] font-black text-lg italic tracking-tighter">
                  ${product.price}
                </p>

                {/* Interaction Button */}
                <div className="mt-4">
                  {isInCart ? (
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="w-full py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="w-full py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
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
    </section>
  );
}

export default CategoriesProducts;