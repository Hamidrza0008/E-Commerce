import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../Redux_Toolkit/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import loginBg from "../Assets/loginbg.jpg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (validUser) {
        dispatch(login(validUser));
        setMessage("Login Successful ✅");
        setMsgType("success");
      } else {
        setMessage("Invalid Email or Password ❌");
        setMsgType("error");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = [...users, formData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      dispatch(register(formData));

      setMessage("Registration Successful 🎉");
      setMsgType("success");

      setIsLogin(true);
    }
  };

  // Redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isAuthenticated, navigate]);

  // Auto hide message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      {/* Card */}
      <div className="relative w-full max-w-[480px] p-8 md:p-10 mx-4 rounded-[40px] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl text-white overflow-y-auto max-h-[95vh] no-scrollbar">

        {/* Brand */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tighter italic uppercase">
            HR<span className="text-[#D4AF37]">.</span>STORE
          </h2>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.5em] mt-2 font-bold">
            {isLogin ? "Authorized Access Only" : "Elite Membership"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 bg-white/5 p-1 rounded-2xl border border-white/5">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl ${
              isLogin ? "bg-[#D4AF37] text-black" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl ${
              !isLogin ? "bg-[#D4AF37] text-black" : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <>
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="FULL NAME"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-[10px]"
                />
              </div>

              {/* Gender + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="gender"
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl text-[10px]"
                >
                  <option>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
                  <input
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    placeholder="PHONE"
                    className="w-full bg-white/5 border border-white/10 p-4 pl-10 rounded-xl text-[10px]"
                  />
                </div>
              </div>
            </>
          )}

          {/* Message */}
          {message && (
            <p
              className={`text-center text-[10px] font-bold tracking-widest ${
                msgType === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]" />
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="EMAIL"
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-[10px]"
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
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-[10px]"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
            </button>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8418] py-4 rounded-xl text-black text-[10px] font-black uppercase"
          >
            {isLogin ? "Authenticate" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}