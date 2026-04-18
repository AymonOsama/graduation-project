import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ChevronRight } from 'lucide-react'; 
import toast from 'react-hot-toast';

// Static Assets and Data
import loginWallpaper from '../../assets/loginPagesWallpaper.jpg';
import Users from '../../data/users.json';

const Login = () => {
    const navigate = useNavigate();

    // --- State Management ---
    const [countsTry, setCountsTry] = useState(1); // Track failed login attempts
    const [rememberMe, setRememberMe] = useState(false); // Track "Remember Me" checkbox status
    const [formData, setFormData] = useState({
        email: "",
        password: "" 
    });

    // --- Lifecycle: Check Persistent Storage ---
    useEffect(() => {
        // Retrieve saved user data from LocalStorage if it exists
        const rememberedUser = localStorage.getItem("rememberedUser");
        if (rememberedUser) {
            const userData = JSON.parse(rememberedUser);
            // Auto-fill form and check the "Remember Me" box
            setFormData({
                email: userData.email,
                password: userData.password
            });
            setRememberMe(true);
        }
    }, []);

    // --- Form Handlers ---
    const handleChange = (e) => {
        // Sync input changes with the formData state
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onclickLogin = (e) => {
        e.preventDefault();

        // Authentication: Find user matching both email and password from JSON data
        const foundUser = Users.users.find(
            user => user.email === formData.email && user.password === formData.password
        );

        if (foundUser) {
            // Persistent Login Logic
            if (rememberMe) {
                console.log("Saving user credentials to LocalStorage...");
                localStorage.setItem("rememberedUser", JSON.stringify(foundUser));
            } else {
                // Clear storage if user chooses not to be remembered
                sessionStorage.setItem("rememberedUser", JSON.stringify(foundUser));
            }

            toast.success("Login successful!");
            
            // Brief delay to ensure storage operations and toast are processed before redirecting
            setTimeout(() => {
                navigate("/home");
            }, 100); 
            
        } else {
            // Error Handling: Invalid credentials
            toast.error("Invalid email or password. Please try again.");

            // Security Logic: Lock out after 3 failed attempts
            const nextCount = countsTry + 1;
            setCountsTry(nextCount);

            if (nextCount > 3) {
                toast.error("Too many failed attempts. Redirecting to recovery...");
                navigate("/forget-password");
            }
        }
    };

    return (
        <div 
            style={{ backgroundImage: `url(${loginWallpaper})` }}
            className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative font-sans"
        >
            {/* Dark Visual Overlay for better readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 p-10 md:p-14 z-10"
            >
                {/* Header Section */}
                <div className="text-center mb-10 md:mb-12">
                    <motion.h2 className="text-5xl md:text-6xl font-black text-black tracking-tighter mb-4">
                        Login
                    </motion.h2>
                    <div className="h-2 w-20 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Main Login Form */}
                <form className="space-y-10 md:space-y-12" onSubmit={onclickLogin}>
                    
                    <div className="grid grid-cols-1 gap-10">
                        {/* Email Input Field */}
                        <div className="group space-y-2">
                            <div className="relative">
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email" 
                                    placeholder="Email Address"
                                    className="w-full pl-2 pr-12 py-4 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                                    required
                                />
                                <Mail className="absolute right-2 top-4 text-black/60 group-focus-within:text-blue-500 transition-colors" size={24} />
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div className="group space-y-2">
                            <div className="relative">
                                <input 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password" 
                                    placeholder="Password"
                                    className="w-full pl-2 pr-12 py-4 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
                                    required
                                />
                                <Lock className="absolute right-2 top-4 text-black/60 group-focus-within:text-blue-500 transition-colors" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Secondary Actions: Remember Me & Forgot Password */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-black">
                        <label className="text-black/80 flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 accent-blue-500 cursor-pointer" 
                            />
                            Remember me
                        </label>
                        <Link to="/forget-password" size={24} className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors tracking-tight">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-5 md:py-6 rounded-[2rem] shadow-[0_15px_30px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center justify-center gap-3 group relative cursor-pointer text-xl tracking-widest active:scale-95"
                    >
                        SIGN IN
                        <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </form>

                {/* Footer Section: Signup Link */}
                <p className="text-center mt-12 md:mt-14 text-black/70 text-base font-bold">
                    New here? <Link to="/signup" className="text-blue-600 font-black cursor-pointer hover:text-blue-800 hover:underline underline-offset-8 transition-all">Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;