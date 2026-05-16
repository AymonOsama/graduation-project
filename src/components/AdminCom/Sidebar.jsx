import React from 'react';
import { PackageSearch, Image as AdIcon, Users as UsersIcon, ShieldCheck, X, MessageSquareWarning } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userRole, onClose }) => {
  // مصفوفة العناصر الأساسية للسايدبار
  const menuItems = [
    { id: 'products', label: 'Edit Products', icon: <PackageSearch size={20} /> },
    { id: 'adverts', label: 'Edit Adverts', icon: <AdIcon size={20} /> },
    { id: 'users', label: 'Edit Users', icon: <UsersIcon size={20} /> },
    // إضافة قسم الشكاوى والمقترحات هنا
    { id: 'complaints', label: 'Complaints & Suggestions', icon: <MessageSquareWarning size={20} /> },
  ];

  // إضافة صلاحيات السوبر أدمن في نهاية القائمة
  if (userRole === 'super_admin') {
    menuItems.push({ id: 'admins', label: 'Manage Admins', icon: <ShieldCheck size={20} /> });
  }

  const handleItemClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <aside className="w-72 lg:w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 z-[100] shadow-2xl lg:shadow-none select-none">
      
      {/* Header السايدبار */}
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-black text-blue-600 italic tracking-tighter cursor-default">
          ADMIN <span className="text-gray-800">HUB</span>
        </h2>
        
        <button 
          onClick={onClose} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* القائمة - Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 cursor-pointer ${
              activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={activeTab === item.id ? 'animate-pulse' : ''}>
              {item.icon}
            </span>
            <span className="text-sm sm:text-base text-left">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer معلومات المستخدم */}
      <div className="p-4 border-t border-gray-50">
        <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3 cursor-default border border-gray-100">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
            {userRole === 'super_admin' ? 'SA' : 'AD'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-gray-900 truncate uppercase">Admin Account</p>
            <p className="text-[10px] text-gray-400 font-bold truncate capitalize tracking-tighter">
              {userRole?.replace('_', ' ') || 'Manager'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;