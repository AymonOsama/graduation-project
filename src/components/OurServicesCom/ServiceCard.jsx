import React from 'react';
import { motion } from 'framer-motion';
// استيراد كل الأيقونات من lucide لاستخدامها ديناميكياً
import * as LucideIcons from 'lucide-react'; 
// استيراد ملف البيانات مباشرة
import servicesData from "../../data/servicesData.json";

const ServiceCard = ({ idx, activeService, setActiveService }) => {
  // 1. جلب بيانات الخدمة المحددة بناءً على الـ idx الممرر من الأب
  const service = servicesData[idx];

  // 2. التحقق من وجود الخدمة (حماية من أخطاء الـ undefined)
  if (!service) return null;

  const isActive = activeService === idx;

  // 3. تحويل اسم الأيقونة من string (مثل "Search") إلى Component حقيقي
  // نستخدم HelpCircle كأيقونة احتياطية في حال كان الاسم في الـ JSON خطأ
  const IconComponent = LucideIcons[service.iconName] || LucideIcons.HelpCircle;

  return (
    <motion.div
      layout // لإعطاء نعومة عند تغير ترتيب أو حجم الكروت
      onClick={() => setActiveService(idx)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative group cursor-pointer overflow-hidden p-8 sm:p-10 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col gap-8 min-h-[500px] backdrop-blur-md ${
        isActive 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 shadow-xl' 
          : 'bg-white border-slate-100 hover:border-blue-200 shadow-sm'
      }`}
    >
      {/* Icon Container */}
      <div className="relative mb-4">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-colors duration-500 ${
          isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-400'
        }`}>
          <IconComponent size={isActive ? 48 : 40} strokeWidth={2.2} />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1">
        {service.badge && (
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-colors ${
            isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}>
            {service.badge}
          </span>
        )}
        <h3 className={`text-3xl font-black mt-4 transition-colors ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
          {service.title}
        </h3>
        <p className={`mt-3 font-medium leading-relaxed transition-colors ${isActive ? 'text-blue-700/80' : 'text-slate-500'}`}>
          {service.description}
        </p>
      </div>

      {/* Benefits Badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {service.benefits?.map((benefit, i) => (
          <div 
            key={i} 
            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
              isActive 
                ? 'bg-blue-200/50 text-blue-800 border-blue-300' 
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            ✓ {benefit}
          </div>
        ))}
      </div>

      {/* خلفية جمالية تظهر عند النشاط فقط */}
      {isActive && (
        <motion.div 
          layoutId="card-glow"
          className="absolute -inset-2 bg-blue-400/10 blur-3xl -z-10"
        />
      )}
    </motion.div>
  );
};

export default ServiceCard;