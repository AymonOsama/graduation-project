import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from 'lucide-react';

const MegaMenu = ({ isOpen, setIsOpen, categories }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="absolute left-0 top-20 w-full bg-white border-b border-gray-100 shadow-2xl z-50 hidden lg:block"
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-12 p-8 gap-8">
                        <div className="col-span-8 grid grid-cols-2 gap-8">
                            {categories.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-xs uppercase tracking-[0.2em] text-blue-600 font-black">
                                        {section.title}
                                    </h3>
                                    <div className="grid gap-2">
                                        {section.items.map((item, i) => {
                                            // التحويل لـ slug عشان يطابق الـ Route اللي في الـ Main
                                            const urlSlug = item.name.toLowerCase().replace(/\s+/g, '-');

                                            return (
                                                <Link 
                                                    key={i} 
                                                    // التعديل الجوهري هنا: نستخدم المسار الجديد مع الـ slug
                                                    to={`/categoriesPgPd/${urlSlug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all group/item"
                                                >
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Featured Section */}
                        <div className="col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <span className="bg-white/20 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">Featured</span>
                                <h4 className="text-2xl font-black mt-4 leading-tight">Build Your <br/> Dream Rig</h4>
                                <p className="text-blue-100 text-xs mt-2 font-medium">Use our comparison tool to find the best hardware deals.</p>
                            </div>
                            <Link to="/categories" onClick={() => setIsOpen(false)} className="relative z-10 mt-6 bg-white text-blue-600 text-center py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                                View All Categories
                            </Link>
                            <Box size={150} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;