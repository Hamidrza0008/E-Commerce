import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCatagoriesProducts } from "../Redux_Toolkit/ProductSlice";

function Categories() {
  const categories = [
    {
      id: 1,
      name: "Men",
      api: "mens-shirts",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Women",
      api: "womens-dresses",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Children",
      api: "tops",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Electronics",
      api: "smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" // Updated to higher quality
    },
    {
      id: 5,
      name: "Shoes",
      api: "mens-shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Watches",
      api: "mens-watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "Accessories",
      api: "sunglasses",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const dispatch = useDispatch();

  const handleClick = (name) => {
    dispatch(fetchCatagoriesProducts(name));
  };

  return (
    <section
      id="cat"
      className="px-6 md:px-16 py-24 bg-[#050505] scroll-mt-24"
    >
      {/* Header with Luxury Accent */}
      <div className="flex flex-col items-center mb-20 text-center">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-bold mb-4">Curated Selections</span>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
          Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E498]">Genre</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6">
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to={"/product/catagories"}
            onClick={() => handleClick(cat.api)}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] border border-white/5 shadow-2xl transition-all duration-700 hover:border-[#D4AF37]/40"
          >
            {/* Background Image with Ken Burns Effect */}
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:brightness-[0.4] grayscale-[40%] group-hover:grayscale-0"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
              <div className="overflow-hidden">
                <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  New Arrival
                </p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter transition-all duration-500 group-hover:text-[#F9E498] group-hover:-translate-y-2">
                {cat.name}
              </h3>

              <div className="w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-full mt-2"></div>

              <button className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-[#D4AF37] transition-all flex items-center gap-2">
                Discover More <span className="text-lg">→</span>
              </button>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 group-hover:m-4 transition-all duration-500"></div>
          </NavLink>
        ))}

        {/* Dynamic Empty State for Aesthetic Balance */}
        <div className="hidden lg:flex flex-col justify-center items-center p-8 rounded-2xl bg-white/5 border border-dashed border-white/10 opacity-40 hover:opacity-100 transition-opacity">
            <p className="text-white font-light italic text-center text-sm">More collections <br/> coming soon...</p>
        </div>
      </div>
    </section>
  );
}

export default Categories;