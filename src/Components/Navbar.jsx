import { ShoppingCart, Search, User, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const handleScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          offset: -20,
          duration: 200
        });
      }, 100);
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        offset: 20,
        duration: 500
      });
    }
  };

  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const WishlistCount = useSelector((state) => state.wishlist.totalQuantity);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 bg-black/10 backdrop-blur-xl border-b border-white/5 px-6 md:px-16 py-4 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* Premium Logo Section */}
      <div 
        onClick={() => navigate("/")} 
        className="group flex items-center gap-2 cursor-pointer"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#8A6D1D] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
          <span className="text-black font-black text-xl italic">H</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter uppercase text-white">
          HR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E498] font-light">COLLECTIONS</span>
        </h1>
      </div>

      {/* Futuristic Menu */}
      <ul className="hidden lg:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
        {["home", "cat", "product", "about"].map((item) => (
          <li
            key={item}
            onClick={() => handleScroll(item === "home" ? "hero" : item)}
            className="relative cursor-pointer hover:text-[#D4AF37] transition-all duration-300 group"
          >
            {item === "cat" ? "Categories" : item === "product" ? "Collections" : item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Action Icons & Profile */}
      <div className="flex items-center gap-4 md:gap-8">
        
        {/* Search & Indicators */}
        <div className="flex items-center gap-6 text-gray-400 border-r border-white/10 pr-6 mr-2">
          <Search 
            onClick={() => navigate("/search")} 
            size={20} 
            className="cursor-pointer hover:text-[#D4AF37] hover:scale-110 transition-all" 
          />

          <NavLink to="/wishlist" className="relative group">
            <Heart size={20} className="group-hover:text-red-500 transition-colors" />
            {WishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse shadow-lg">
                {WishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className="relative group">
            <ShoppingCart size={20} className="group-hover:text-[#D4AF37] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* User Button */}
        {isAuthenticated ? (
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-500 shadow-inner group"
          >
            <User size={16} className="group-hover:scale-110" />
            <span>Profile</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/AuthPage")}
            className="relative overflow-hidden px-8 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA8418] text-black text-xs font-black uppercase tracking-widest rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all"
          >
            Join Now
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;