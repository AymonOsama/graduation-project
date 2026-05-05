import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PackageSearch, 
  Image as AdIcon, 
  Users as UsersIcon, 
  LogOut,
  PlusCircle,
  Settings
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');

  // قائمة المنيو الجانبية
  const menuItems = [
    { id: 'products', label: 'Edit Products', icon: <PackageSearch size={20} /> },
    { id: 'adverts', label: 'Edit Adverts', icon: <AdIcon size={20} /> },
    { id: 'users', label: 'Edit Users', icon: <UsersIcon size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar - القائمة الجانبية */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-black text-blue-600 italic tracking-tighter">ADMIN <span className="text-gray-800">HUB</span></h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20} />
            Exit Panel
          </button>
        </div>
      </aside>

      {/* Main Content - المحتوى الأساسي */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Header الداخلي */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-gray-500 font-medium">Manage and monitor your website resources</p>
          </div>
          
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-sm">
            <PlusCircle size={18} />
            Add New {activeTab === 'products' ? 'Product' : activeTab === 'adverts' ? 'Advert' : 'User'}
          </button>
        </div>

        {/* Dynamic Content Area - هنا بنغير المحتوى حسب التاب */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[500px] p-8">
          
          {activeTab === 'products' && (
            <div className="animate-in fade-in duration-500">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Product Management List</h3>
              {/* هنا هتحط جدول المنتجات أو الـ Cards اللي فيها تعديل ومسح */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example Placeholder */}
                <div className="border border-dashed border-gray-200 rounded-3xl h-40 flex items-center justify-center text-gray-400">
                  Product Data Table Goes Here
                </div>
              </div>
            </div>
          )}

          {activeTab === 'adverts' && (
            <div className="animate-in fade-in duration-500">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Active Advertisements</h3>
              <p className="text-gray-500">You can update banner images and links here.</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-in fade-in duration-500">
              <h3 className="text-xl font-bold mb-4 text-gray-800">User Permissions</h3>
              <p className="text-gray-500">Manage user roles and account statuses.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPanel;