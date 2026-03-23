import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux_Toolkit/ProductSlice";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../Redux_Toolkit/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Redux_Toolkit/wishlistSlice";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items || []);
  const status = useSelector((state) => state.products.status);
  const WishlistItems = useSelector((state) => state.wishlist.wishlist);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "pending") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#D4AF37] tracking-[0.3em] font-light uppercase text-sm">Refining Collection...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="product" className="px-4 md:px-12 py-24 bg-[#050505]">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12 border-l-4 border-[#D4AF37] pl-6">
        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Exclusively Curated</p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white italic font-light">Pieces</span>
        </h2>
      </div>

      {/* 5x5 Grid Layout - Desktop par 5 columns fix kar diye hain */}
      <div
        
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {products.map((product) => {
          const isInCart = cartItems.find((p) => p.id === product.id);
          const isInWishlist = WishlistItems.find((p) => p.id === product.id);

          return (
            <div
              key={product.id}
              className="relative group flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* Floating Badge */}
              <div className="absolute top-3 left-3 z-20 bg-[#D4AF37] text-black text-[7px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">
                New
              </div>

              {/* Wishlist Icon */}
              <div
                onClick={() =>
                  isInWishlist
                    ? dispatch(removeFromWishlist(product))
                    : dispatch(addToWishlist(product))
                }
                className="absolute top-3 right-3 z-30 backdrop-blur-md bg-black/40 p-2 rounded-xl border border-white/10 cursor-pointer hover:bg-white transition-all duration-300 group/heart"
              >
                <FaHeart size={10} className={isInWishlist ? "text-red-500" : "text-white/40 group-hover/heart:text-black"} />
              </div>

              {/* Image Container */}
              <NavLink to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-white/[0.02] m-1.5 rounded-xl">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-contain p-6 mix-blend-lighten transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-[8px] uppercase tracking-[0.2em] font-black border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">Quick View</span>
                </div>
              </NavLink>

              {/* Product Info - Compact for 5-column grid */}
              <div className="p-4 pt-1 flex flex-col flex-grow">
                <h3 className="text-gray-400 text-[9px] uppercase tracking-wider font-bold truncate mb-1">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-white text-base font-black tracking-tighter italic">
                    ${product.price}
                  </p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-[#D4AF37] text-[8px]" />
                    <span className="text-gray-500 text-[9px] font-bold">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Action Button - Slim & Sleek */}
                <div className="mt-4">
                  {isInCart ? (
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="w-full py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-[8px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="w-full py-2.5 rounded-xl bg-white text-black text-[8px] font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
                    >
                      <FaPlus size={7} /> Add To Bag
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

// Sub-icon for plus (if not imported)
function FaPlus({ size }) {
  return <span style={{ fontSize: size }}>+</span>;
}

export default Products;