import React, { useState } from 'react';
import loginWallpaper from '../../assets/loginPagesWallpaper.jpg';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // تأكد من تثبيت react-hot-toast للتنبيهات

const Signup = () => {
  // --- States لإدارة البيانات ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // 2. التحقق من ملء جميع الحقول (اختياري لزيادة التأكيد)
    if (!formData.email || !formData.password || !formData.firstName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // 🌐 PLACE YOUR API CALL HERE (e.g., const res = await axios.post('/api/signup', formData))
      console.log("Form Data Submitted to API:", formData);
      
      // هنا تضع كود النجاح (مثل التوجيه لصفحة الـ Login)
      // toast.success("Registration successful!");
      
    } catch (error) {
      // ❌ التعامل مع خطأ الـ API هنا
      // toast.error(error.message);
    }
  };

  return (
    <div 
      style={{ backgroundImage: `url(${loginWallpaper})` }}
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative font-sans"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 p-10 md:p-14 z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-black tracking-tighter mb-4"
          >
            Register
          </motion.h2>
          <div className="h-2 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Form */}
        <form className="space-y-7 md:space-y-9" onSubmit={handleSignup}>
          
          <div className="grid grid-cols-1 gap-7">
            
            {/* First & Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {/* First Name */}
              <div className="group space-y-2">
                <div className="relative">
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="First Name"
                    className="w-full pl-2 pr-10 py-3 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                    required
                  />
                  <User className="absolute right-2 top-3 text-black/60 group-focus-within:text-blue-500 transition-colors" size={22} />
                </div>
              </div>

              {/* Last Name */}
              <div className="group space-y-2">
                <div className="relative">
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Last Name"
                    className="w-full pl-2 pr-10 py-3 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                    required
                  />
                  <User className="absolute right-2 top-3 text-black/60 group-focus-within:text-blue-500 transition-colors" size={22} />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="group space-y-2">
              <div className="relative">
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  placeholder="Email Address"
                  className="w-full pl-2 pr-10 py-3 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                  required
                />
                <Mail className="absolute right-2 top-3 text-black/60 group-focus-within:text-blue-500 transition-colors" size={22} />
              </div>
            </div>

            {/* Password Input */}
            <div className="group space-y-2">
              <div className="relative">
                <input 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-2 pr-10 py-3 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                  required
                />
                <Lock className="absolute right-2 top-3 text-black/60 group-focus-within:text-blue-500 transition-colors" size={22} />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="group space-y-2">
              <div className="relative">
                <input 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password" 
                  placeholder="Confirm Password"
                  className="w-full pl-2 pr-10 py-3 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                  required
                />
                <Lock className="absolute right-2 top-3 text-black/60 group-focus-within:text-blue-500 transition-colors" size={22} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-[0_15px_30px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center justify-center gap-3 group relative cursor-pointer text-xl tracking-widest active:scale-95">
            SIGN UP
            <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-10 text-black/70 text-base font-bold">
          Already have an account? <Link to="/login" className="text-blue-600 font-black cursor-pointer hover:text-blue-800 hover:underline underline-offset-8 transition-all">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;