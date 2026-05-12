import React, { useState, useEffect } from 'react';
import { PlusCircle, Menu } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import usersData from '../../data/users.json'; 
import toast, { Toaster } from 'react-hot-toast';

// import components 
import Sidebar from '../../components/AdminCom/Sidebar';
import AdminManagement from '../../components/AdminCom/AdminManagement'; 
import UserManagement from '../../components/AdminCom/UserManagement';
import ProductManagement from '../../components/AdminCom/ProductManagement';
import AdvertsManagement from '../../components/AdminCom/AdvertsMangment';
import AddAdminModal from '../../components/AdminCom/AddAdminModal';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState(usersData.users);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        const userId = parsed?.id ? String(parsed.id) : String(rawData);
        const user = allUsers.find(u => String(u.id) === userId);
        setCurrentUser(user);
      } catch (err) { 
        console.error("Error parsing user data:", err); 
      }
    }
  }, [allUsers]);

  const handleUpdateRole = (userId, newRole) => {
    setAllUsers(prevUsers => 
      prevUsers.map(u => 
        String(u.id) === String(userId) ? { ...u, role: newRole } : u
      )
    );
    if (newRole === 'admin') toast.success("Admin assigned successfully!");
  };

  const handleDeleteUser = (userId) => {
    setAllUsers(prevUsers => prevUsers.filter(u => String(u.id) !== String(userId)));
  };

  const handleHeaderAction = () => {
    if (activeTab === 'admins') {
      setIsAddAdminModalOpen(true);
    } else if (activeTab === 'products') {
      setIsProductModalOpen(true);
    }
  };

  return (
    // أضفنا select-none لمنع النسخ في كامل لوحة التحكم
    <div className="flex min-h-screen bg-gray-50 relative overflow-x-hidden select-none">
      <Toaster position="top-right" />

      {/* 1. Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 cursor-pointer" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* 2. Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-0 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        lg:static lg:block lg:h-screen lg:sticky lg:top-0
        transition-transform duration-300 ease-in-out`}>
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            userRole={currentUser?.role}
            onClose={() => setIsSidebarOpen(false)}
          />
      </div>

      {/* 3. Main Content */}
      <main className="flex-1 w-full min-w-0 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-10">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-blue-600 active:scale-95 transition-all cursor-pointer"
              >
                <Menu size={24} />
              </button>
              
              <div className="cursor-default">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 capitalize tracking-tighter italic">
                  {activeTab.replace('-', ' ')}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-bold mt-1 tracking-tight">
                  Welcome back, <span className="text-blue-600">{currentUser?.firstName || 'Admin'}</span>
                </p>
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              {(activeTab === 'products' || activeTab === 'admins') && (
                <button 
                  onClick={handleHeaderAction}
                  className={`w-full sm:w-auto text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-2xl active:scale-95 cursor-pointer ${
                    activeTab === 'admins' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-gray-900 hover:bg-black shadow-gray-300'
                  }`}
                >
                  <PlusCircle size={20} strokeWidth={3} />
                  <span className="text-sm sm:text-base">Add {activeTab === 'products' ? 'Product' : 'Admin'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-gray-100 shadow-sm min-h-[600px] p-4 sm:p-10 overflow-hidden">
            <ContentArea 
              activeTab={activeTab} 
              allUsers={allUsers} 
              onUpdateRole={handleUpdateRole}
              onDeleteUser={handleDeleteUser}
              isProductModalOpen={isProductModalOpen} 
              setIsProductModalOpen={setIsProductModalOpen}
            />
          </div>
        </div>
      </main>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {isAddAdminModalOpen && (
          <AddAdminModal 
            isOpen={isAddAdminModalOpen}
            onClose={() => setIsAddAdminModalOpen(false)}
            users={allUsers.filter(u => u.role === 'user')}
            onUpdateRole={handleUpdateRole}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentArea = ({ activeTab, allUsers, onUpdateRole, onDeleteUser, isProductModalOpen, setIsProductModalOpen }) => {
  switch (activeTab) {
    case 'products':
      return <ProductManagement isExternalModalOpen={isProductModalOpen} setIsExternalModalOpen={setIsProductModalOpen} />;
    case 'adverts':
      return <AdvertsManagement />;
    case 'users':
      return <UserManagement allUsers={allUsers} onDeleteUser={onDeleteUser} />;
    case 'admins':
      return <AdminManagement allUsers={allUsers} onUpdateRole={onUpdateRole} onDeleteUser={onDeleteUser} />;
    default:
      return (
        <div className="py-40 text-center cursor-default">
          <p className="text-gray-300 text-2xl font-black italic tracking-widest">SELECT A CATEGORY</p>
        </div>
      );
  }
};

export default AdminPanel;