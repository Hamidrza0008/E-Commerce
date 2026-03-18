import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../Redux_Toolkit/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import loginBg from "../Assets/loginbg.jpg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    profilePic: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      dispatch(login({ email: formData.email, password: formData.password }));
    } else {
      // Basic validation check
      if(!formData.address) return alert("Please provide your delivery address.");
      
      dispatch(register(formData));
      alert("Registration Successful. Access Granted.");
      setIsLogin(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      {/* Auth Card */}
      <div className="relative w-full max-w-[480px] p-8 md:p-10 mx-4 rounded-[40px] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl text-white overflow-y-auto max-h-[95vh] no-scrollbar">

        {/* Brand Area */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tighter italic uppercase">
            HR<span className="text-[#D4AF37]">.</span>STORE
          </h2>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.5em] mt-2 font-bold">
            {isLogin ? "Authorized Access Only" : "Elite Membership"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex mb-8 bg-white/5 p-1 rounded-2xl border border-white/5">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${isLogin ? "bg-[#D4AF37] text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${!isLogin ? "bg-[#D4AF37] text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Register
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col gap-4">
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="FULL NAME"
                  className="w-full bg-white/5 border border-white/10 text-white text-[10px] tracking-widest p-4 pl-12 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700 uppercase"
                />
              </div>

              {/* Gender & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="gender"
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 text-gray-500 text-[10px] tracking-widest p-4 rounded-xl focus:outline-none focus:border-[#D4AF37] appearance-none uppercase"
                >
                  <option className="bg-[#111]">Gender</option>
                  <option className="bg-[#111]" value="Male">Male</option>
                  <option className="bg-[#111]" value="Female">Female</option>
                </select>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
                  <input
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    placeholder="PHONE"
                    className="w-full bg-white/5 border border-white/10 text-white text-[10px] tracking-widest p-4 pl-10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>

              {/* Address Field (Naya Add Kiya Hai) */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-5 text-gray-600 text-[10px]" />
                <textarea
                  name="address"
                  onChange={handleChange}
                  rows="2"
                  placeholder="RESIDENTIAL ADDRESS"
                  className="w-full bg-white/5 border border-white/10 text-white text-[10px] tracking-widest p-4 pl-12 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700 uppercase resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-white/5 border border-white/10 text-white text-[10px] tracking-widest p-4 pl-12 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700 uppercase"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
            <input
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              className="w-full bg-white/5 border border-white/10 text-white text-[10px] tracking-widest p-4 pl-12 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#D4AF37] transition-colors"
            >
              {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F9E498] to-[#AA8418] py-4 rounded-xl text-black text-[10px] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all active:scale-95"
          >
            {isLogin ? "Authenticate" : "Confirm Membership"}
          </button>

          {isLogin && (
            <p className="text-center text-[9px] text-gray-600 uppercase tracking-[0.2em] mt-6 cursor-pointer hover:text-white transition-all">
              Security Protocol: Forgot Password?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}