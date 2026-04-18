import React from 'react';
import ProductCard from '../ProductCard';
import { motion } from 'framer-motion'; 

const Section2 = () => {
    // أنيميشن الحاوية للأطفال (الكروت)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // الكروت تظهر ورا بعض بفرق بسيط
            }
        }
    };

    return (
        <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-12">
            
            {/* Header Section: Responsive alignment */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6"
            >
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight italic uppercase leading-none">
                        Featured <span className="text-blue-600">Deals</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-md">
                        Smart comparisons for the best hardware in the market.
                    </p>
                </div>

                <motion.button 
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-3 text-blue-600 font-black uppercase text-xs sm:text-sm tracking-[0.2em] hover:text-blue-800 transition-all cursor-pointer bg-blue-50/50 md:bg-transparent px-4 py-2 md:p-0 rounded-lg"
                >
                    View All Collections 
                    <span className="w-6 h-[2px] bg-blue-600 group-hover:w-10 transition-all"></span>
                </motion.button>
            </motion.div>

            {/* Products Grid: Responsive Columns */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                // grid-cols-1: موبايل | sm:grid-cols-2: تابلت | lg:grid-cols-3: لابتوب
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
            >
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </motion.div>
        </section>
    );
};

export default Section2;