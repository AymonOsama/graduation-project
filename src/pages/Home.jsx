import React from 'react';

// ----------------------------------------------------------------------
// SECTIONS COMPONENTS
// شيلنا ProductCard من هنا لأنه خلاص مستخدم جوه Section2
import Section1 from '../components/HomeCom/Section1';
import Section2 from '../components/HomeCom/Section2';
import Section3 from '../components/HomeCom/Section3';
import Section4 from '../components/HomeCom/Section4';
import Section5 from '../components/HomeCom/Section5';
// لو عندك موشن عايز تضيفه للسكاشن من بره استدعي motion
import { motion } from 'framer-motion'; 

// ----------------------------------------------------------------------
const Home = () => {
    return (
        <div className="flex flex-col bg-white">
            
            {/* --- SECTION 1: HERO (Dark & Dynamic) --- */}
            <Section1 />

            {/* --- SECTION 2: FEATURED PRODUCTS --- */}
            {/* تأكد إن Section2 جواه الـ Import بتاع ProductCard */}
            <Section2 />

            {/* --- SECTION 3: PROMO BANNER --- */}
            <Section3/>

            {/* --- SECTION 4: MOST LIKED PRODUCTS --- */}
            <Section4 />

            {/* --- SECTION 5: BRANDS --- */}
            <Section5 />
            

        </div>
        
        

    );
};

export default Home;