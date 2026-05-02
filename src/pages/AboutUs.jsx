import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import photo1 from "../assets/About 1.png";
import photo2 from "../assets/About 2.png";
import photo3 from "../assets/About 3.png";

/**
 * Animated Divider
 */
const Divider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-6 py-12 flex justify-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="h-[2px] w-2/3 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full origin-center"
      />
    </div>
  );
};

const AboutUs = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      
      {/* HEADER BADGE & HERO SECTION */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="pt-24 pb-16 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          
          {/* Enhanced About Us Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-14"
          >
            {/* Left Side Decor */}
            <div className="hidden sm:flex items-center gap-2">
              <motion.div 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: 1 }} 
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[2px] w-20 md:w-32 bg-gradient-to-r from-transparent to-blue-500 rounded-full origin-right" 
              />
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </div>

            {/* Main Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-10 py-3 border-[2px] border-blue-500/30 rounded-full bg-white shadow-[0_10px_25px_rgba(59,130,246,0.1)] inline-flex items-center"
            >
              <span className="text-xl md:text-2xl font-black text-blue-600 uppercase tracking-widest">
                About Us
              </span>
            </motion.div>

            {/* Right Side Decor */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <motion.div 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: 1 }} 
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[2px] w-20 md:w-32 bg-gradient-to-l from-transparent to-blue-500 rounded-full origin-left" 
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]"
          >
            Discover Our Mission at{" "}
            <span className="text-blue-600">Comparo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
          >
            We help you make smarter decisions with clear comparisons.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 bg-blue-600 text-white px-10 py-4 rounded-2xl flex items-center gap-3 mx-auto font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all text-lg"
          >
            Contact Us
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={22} />
            </motion.div>
          </motion.button>
        </div>
      </motion.section>

      {/* SECTION 1 - MISSION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-800">Our Mission</h2>
            <p className="text-slate-500 text-xl leading-relaxed">
              At Comparo, we believe everyone deserves the right information before making a decision.
              We simplify complex choices by giving you easy-to-read comparisons, ratings, and pros & cons.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2.5rem]"
          >
            <motion.img
              src={photo1}
              alt="Mission"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 2 - VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2.5rem] order-last md:order-first"
          >
            <motion.img
              src={photo2}
              alt="Values"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-800">Our Values</h2>
            <div className="space-y-8">
              {[
                { num: 1, title: "Transparency", desc: "We provide honest and unbiased reviews." },
                { num: 2, title: "Accuracy", desc: "Our comparisons are detailed and reliable." },
                { num: 3, title: "User-first", desc: "We focus on your needs to save you time and money." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200 transition-all cursor-pointer"
                >
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    className="text-blue-600 font-black text-3xl flex-shrink-0"
                  >
                    0{item.num}
                  </motion.span>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 3 - WORK */}
      <section className="max-w-7xl mx-auto px-6 py-24 pb-32">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-800">How We Work</h2>
            <div className="space-y-8">
              {[
                { num: 1, title: "Researching", desc: "Researching products, services, and tools thoroughly." },
                { num: 2, title: "Analysis", desc: "Breaking down features, pros, and cons clearly." },
                { num: 3, title: "Comparison", desc: "Giving you side-by-side comparisons to make the best choice." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg shadow-blue-200">
                    {item.num}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2.5rem]"
          >
            <motion.img
              src={photo3}
              alt="Work"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;