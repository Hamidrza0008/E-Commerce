import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaHeart, FaStar, FaSearch, FaShoppingBag } from "react-icons/fa";
import { addToCart, removeFromCart } from "../Redux_Toolkit/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Redux_Toolkit/wishlistSlice";

export function Search() {
  const allProducts = useSelector((state) => state.products.items || []);
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const WishlistItems = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      
      {/* Dynamic Search Header */}
      <div className="pt-24 pb-12 px-6 flex flex-col items-center sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full max-w-3xl relative group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={14} />
          <input
            type="text"
            placeholder="SEARCH OUR EXCLUSIVE COLLECTION..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[11px] tracking-[0.3em] font-black uppercase focus:outline-none focus:border-[#D4AF37] focus:bg-white/[0.07] transition-all placeholder:text-gray-600 shadow-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="mt-6 flex items-center gap-3">
          <span className="h-[1px] w-8 bg-[#D4AF37]/50"></span>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">
            {filteredProducts.length} Results Found
          </p>
          <span className="h-[1px] w-8 bg-[#D4AF37]/50"></span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="px-6 md:px-16 pt-10 max-w-[1600px] mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredProducts.map((product) => {
              const isInCart = cartItems.find((p) => p.id === product.id);
              const isInWishlist = WishlistItems.find((p) => p.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => isInWishlist ? dispatch(removeFromWishlist(product)) : dispatch(addToWishlist(product))}
                    className="absolute top-3 right-3 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white transition-all group/heart"
                  >
                    <FaHeart size={10} className={isInWishlist ? "text-red-500" : "text-white group-hover/heart:text-black"} />
                  </button>

                  {/* Image */}
                  <NavLink to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-white/[0.02] m-1.5 rounded-xl">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-contain p-4 mix-blend-lighten transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </NavLink>

                  {/* Content */}
                  <div className="p-3 pt-0 flex flex-col flex-grow">
                    <h3 className="text-white text-[10px] font-bold uppercase tracking-tight line-clamp-1 mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[#D4AF37] text-sm font-black italic tracking-tighter">${product.price}</p>
                      <div className="flex items-center gap-1 opacity-50">
                        <FaStar className="text-[#D4AF37] text-[8px]" />
                        <span className="text-white text-[9px] font-bold">{product.rating || "4.5"}</span>
                      </div>
                    </div>

                    {/* Cart Action */}
                    <div className="mt-auto">
                      {isInCart ? (
                        <button
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="w-full py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2"
                        >
                          <FaShoppingBag size={8} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-[1px] bg-white/10 mb-6"></div>
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em] font-black">No Matches Found In Our Archives</p>
            <div className="w-16 h-[1px] bg-white/10 mt-6"></div>
          </div>
        )}
      </div>
    </div>
  );
}