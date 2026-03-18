import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const media = [
    {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
      subheading: "Exclusive Collection 2026",
      heading: "Forge Your <br /> <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]'>Identity</span>",
      description: "Clothing is the first chapter of your story. Discover pieces designed for the modern elite."
    },
    {
      src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop",
      subheading: "Unapologetic Attitude",
      heading: "Own The <br /> <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]'>Moment</span>",
      description: "Command attention without saying a word. Our sharp silhouettes define pure confidence."
    },
    // Nayi Image 3: Premium Black Suit / Sharp Look
    {
      src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1920&auto=format&fit=crop", 
      subheading: "Mastering The Classics",
      heading: "The <br /> <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]'>Black Label</span>",
      description: "Tailored to perfection for those who lead. Experience the pinnacle of bespoke craftsmanship."
    },
    // Nayi Image 4: High-End Minimalist Fashion
    {
      src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1920&auto=format&fit=crop",
      subheading: "Curated Excellence",
      heading: "Beyond <br /> <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]'>Boundaries</span>",
      description: "Fashion that speaks of your ambition. Redefining luxury through minimalist innovation."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % media.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [media.length]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden text-white pt-28 bg-[#050505]">
      
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {media.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              index === current ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
          >
            <img src={item.src} alt="fashion" className="w-full h-full object-cover grayscale-[10%]" />
          </div>
        ))}
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/70 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          
          {/* Animated Subheading */}
          <p 
            key={`sub-${current}`} 
            className="text-[#D4AF37] uppercase tracking-[0.6em] font-black text-[10px] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {media[current].subheading}
          </p>

          {/* Animated Heading */}
          <h1 
            key={`head-${current}`}
            className="text-6xl md:text-[100px] font-black leading-[0.85] mb-8 tracking-tighter uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards"
            dangerouslySetInnerHTML={{ __html: media[current].heading }}
          />

          {/* Animated Description */}
          <p 
            key={`desc-${current}`}
            className="text-gray-400 text-sm md:text-base font-bold tracking-widest uppercase mb-10 max-w-lg border-l-4 border-[#D4AF37] pl-8 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200"
          >
            {media[current].description}
          </p>

          <div className="flex gap-6 items-center">
            <button 
              onClick={() => navigate("/search")}
              className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 hover:bg-[#D4AF37] hover:scale-105 active:scale-95 shadow-2xl"
            >
              Explore Store
            </button>
            <button className="hidden sm:block px-10 py-5 border border-white/10 hover:border-white text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md hover:bg-white/5">
              View Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Side Progress Indicators */}
      <div className="absolute bottom-20 right-12 flex flex-col gap-6 z-30 items-end">
        {media.map((_, index) => (
          <div key={index} onClick={() => setCurrent(index)} className="group cursor-pointer flex items-center gap-4">
            <span className={`text-[10px] font-black transition-all ${index === current ? "text-[#D4AF37] scale-125" : "text-white/20 opacity-0 group-hover:opacity-100"}`}>
              0{index + 1}
            </span>
            <div className={`transition-all duration-700 h-[2px] rounded-full ${index === current ? "w-16 bg-[#D4AF37]" : "w-6 bg-white/10"}`} />
          </div>
        ))}
      </div>

      {/* Carbon Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </section>
  );
}

export default Hero;