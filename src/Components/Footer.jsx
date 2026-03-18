import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 px-6 md:px-16 py-16">
      <div id="about" className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 scroll-mt-24">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xl font-black tracking-tighter italic uppercase">
            HR<span className="text-[#D4AF37]">.</span>STORE
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
            Defining the future of luxury retail. Modern essentials for the sophisticated mind.
          </p>
          <div className="flex gap-5 text-gray-500 text-base mt-2">
            <FaInstagram className="cursor-pointer hover:text-[#D4AF37] transition-all" />
            <FaTwitter className="cursor-pointer hover:text-[#D4AF37] transition-all" />
            <FaYoutube className="cursor-pointer hover:text-[#D4AF37] transition-all" />
          </div>
        </div>

        {/* Quick Links - Shop */}
        <div>
          <h3 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Explore</h3>
          <ul className="text-gray-400 text-xs space-y-3 font-medium">
            {["Men", "Women", "Electronics", "Accessories"].map((link) => (
              <li key={link} className="hover:text-white cursor-pointer transition-colors w-fit">{link}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links - Support */}
        <div>
          <h3 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Support</h3>
          <ul className="text-gray-400 text-xs space-y-3 font-medium">
            {["Contact", "Shipping", "Returns", "FAQ"].map((link) => (
              <li key={link} className="hover:text-white cursor-pointer transition-colors w-fit">{link}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter - Compact & Minimal */}
        <div>
          <h3 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Newsletter</h3>
          <div className="relative group">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/5 text-white text-[10px] px-0 py-2 border-b border-white/10 outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-600"
            />
            <button className="absolute right-0 bottom-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-white/5 gap-4">
        <p className="text-gray-600 text-[9px] uppercase tracking-widest">
          © 2026 HR STORE — Crafted for Excellence
        </p>
        <div className="flex gap-6 text-[9px] uppercase tracking-widest text-gray-600 font-bold">
          <span className="hover:text-white cursor-pointer transition">Privacy</span>
          <span className="hover:text-white cursor-pointer transition">Terms</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;