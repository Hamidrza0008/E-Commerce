import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux_Toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaSignOutAlt, FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/AuthPage");
  };

  return (
    // h-screen aur pt-20 (kam padding) taaki screen ke bahar na jaye content
    <section className="h-screen bg-[#050505] text-white pt-20 pb-6 px-6 flex justify-center items-center overflow-hidden relative">
      
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[250px] bg-gradient-to-b from-[#D4AF37]/5 to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Profile Card - Compact height */}
        <div className="w-full bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[35px] overflow-hidden shadow-2xl">
          
          {/* Header Banner - Reduced height */}
          <div className="h-24 bg-[#D4AF37]/5 flex items-end justify-center">
            <div className="relative group translate-y-10">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  className="w-24 h-24 rounded-2xl border-4 border-[#050505] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="profile"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl border-4 border-[#050505] shadow-2xl bg-[#111] flex items-center justify-center text-[#D4AF37]">
                  <FaUserCircle size={45} />
                </div>
              )}
            </div>
          </div>

          {/* User Identity - Tight Spacing */}
          <div className="mt-12 text-center px-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">
              {user?.name || "Member Name"}
            </h2>
            <p className="text-[#D4AF37] text-[8px] font-black uppercase tracking-[0.4em] mt-1 opacity-70">
              Elite Access • Since 2026
            </p>
          </div>

          {/* Information Grid - 2x2 Layout, Small Padding */}
          <div className="px-6 py-8 grid grid-cols-2 gap-3">
            <InfoItem icon={<FaCalendarAlt size={12}/>} label="Age" value={user?.age || "N/A"} />
            <InfoItem icon={<FaUserCircle size={12}/>} label="Gender" value={user?.gender || "N/A"} />
            <InfoItem icon={<FaPhoneAlt size={12}/>} label="Contact" value={user?.phone || "N/A"} />
            <InfoItem icon={<FaMapMarkerAlt size={12}/>} label="City" value={user?.address || "N/A"} />

            {/* Email - Slim Style */}
            <div className="col-span-2 bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <FaEnvelope size={10} />
               </div>
               <div className="text-left overflow-hidden">
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Email</p>
                  <p className="text-[11px] font-medium text-gray-300 truncate">{user?.email}</p>
               </div>
            </div>
          </div>

          {/* Action Footer - Tight Padding */}
          <div className="p-6 bg-white/[0.01] border-t border-white/5 flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-all active:scale-95">
              <FaUserEdit size={12} /> Edit Account
            </button>
            
            <button
              onClick={handleLogout}
              className="px-5 py-3.5 bg-red-500/10 text-red-500 border border-red-500/10 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              <FaSignOutAlt size={12} />
            </button>
          </div>

        </div>

        {/* Minimal Footer */}
        <p className="mt-4 text-[8px] text-gray-700 uppercase tracking-[0.6em] font-bold">
          Encrypted Session
        </p>

      </div>
    </section>
  );
}

// Sub-component - Even more compact
function InfoItem({ icon, label, value }) {
  return (
    <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-center gap-3 group">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-[#D4AF37] transition-colors">
        {icon}
      </div>
      <div className="text-left overflow-hidden">
        <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">{label}</p>
        <p className="text-[11px] font-black text-gray-300 truncate italic uppercase">{value}</p>
      </div>
    </div>
  );
}

export default Profile;