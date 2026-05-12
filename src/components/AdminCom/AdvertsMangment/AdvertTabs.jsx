import React from 'react';
import { motion } from 'framer-motion';

const AdvertTabs = ({ tabs, activeTab, onTabChange }) => {

  return (

    // Main Tabs Container
    <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-sm w-fit">

      {tabs.map((tab) => {

        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (

          // Single Tab Button
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center gap-3 px-8 py-4 rounded-[2rem]
              text-sm font-black transition-all duration-500 cursor-pointer
              ${isActive
                ? 'text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >

            {/* Animated Active Background */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600 rounded-[2rem] shadow-lg shadow-blue-200"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6
                }}
              />
            )}

            {/* Tab Content */}
            <span className="relative z-10 flex items-center gap-3">

              {/* Tab Icon */}
              <Icon
                size={18}
                strokeWidth={isActive ? 3 : 2}
              />

              {/* Tab Label */}
              <span className="uppercase tracking-widest">
                {tab.label}
              </span>

            </span>

          </button>

        );
      })}

    </div>

  );
};

export default AdvertTabs;