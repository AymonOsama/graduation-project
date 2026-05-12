import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar'; 
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import UpgradeModal from '../components/UpgradeModal'; // استيراد المكون الموحد

const MainLayout = () => {
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // وظائف التحكم في الـ Modal
  const openUpgradeModal = () => setIsUpgradeOpen(true);
  const closeUpgradeModal = () => setIsUpgradeOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      
      {/* 1. المكون الموحد يوضع هنا ليكون متاحاً فوق كل شيء */}
      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={closeUpgradeModal} 
      />

      {/* 2. تمرير الوظيفة للـ NavBar إذا كان يحتوي على زر "اشترك الآن" */}
      <NavBar onUpgradeClick={openUpgradeModal} />
      
      <main className="flex-grow">
        {/* 3. استخدام context لتمرير الوظيفة لكل الصفحات (مثل صفحة الخدمات) */}
        <Outlet context={{ openUpgradeModal }} /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;