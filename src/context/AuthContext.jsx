import React, { createContext, useContext, useState, useEffect } from 'react';
// استيراد الـ API الموحد للمستخدمين
import { usersApi } from '../api/usersApi'; 
import Users from '../data/users.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // دالة مساعدة لجلب بيانات المستخدم كاملة من الـ JSON بناءً على الـ ID (تستخدم الـ API الآن)
  const fetchFullUserData = (id) => {
    const usersList = Users.users || Users;
    return usersList.find(u => String(u.id) === String(id));
  };

  // تشيك على الـ Storage عند الـ Refresh
  useEffect(() => {
    const checkUser = async () => {
      const localData = localStorage.getItem("rememberedUser");
      const sessionData = sessionStorage.getItem("rememberedUser");
      const rawData = localData || sessionData;

      if (rawData) {
        try {
          const parsedData = JSON.parse(rawData);
          
          // بنجيب بيانات اليوزر من الـ API في الـ Refresh عشان لو الـ Admin عدل الـ Role بتاعه تظهر فوراً
          const foundUser = await usersApi.getUserById(parsedData.id);

          if (foundUser) {
            setCurrentUser(foundUser);
          } else {
            // لو مش موجود في الـ API (اتحذف مثلاً) بنجيبه كـ Fallback من الـ JSON
            const fallbackUser = fetchFullUserData(parsedData.id);
            if (fallbackUser) setCurrentUser(fallbackUser);
          }
        } catch (e) {
          console.error("Auth Error:", e);
          // Fallback سريع في حالة حدوث أي خطأ في الـ Promise
          const parsedData = JSON.parse(rawData);
          const fallbackUser = fetchFullUserData(parsedData.id);
          if (fallbackUser) setCurrentUser(fallbackUser);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  // --- دالة اللوجن: رجعت عادية وسريعة جداً (Synchronous) بدون async/await ---
  const login = (id, rememberMe = false) => {
    const userData = { id: String(id) };
    const stringData = JSON.stringify(userData);

    if (rememberMe) {
      localStorage.setItem("rememberedUser", stringData);
    } else {
      sessionStorage.setItem("rememberedUser", stringData);
    }

    // التحديث اللحظي للـ State عشان الـ Navbar والـ Redirect يشتغلوا في نفس الملي ثانية
    const fullUser = fetchFullUserData(id);
    setCurrentUser(fullUser);

    // سحب تحديثات الـ API في الخلفية (Background Fetch) بدون ما تعطّل الـ UI
    usersApi.getUserById(id).then((apiUser) => {
      if (apiUser) {
        setCurrentUser(apiUser);
      }
    }).catch(err => console.log("Background API sync skipped:", err));
  };

  const logout = () => {
    localStorage.removeItem("rememberedUser");
    sessionStorage.removeItem("rememberedUser");
    setCurrentUser(null);
  };

  // تحديد هل المستخدم VIP؟
  const isPremium = 
    currentUser?.isPremium === true || 
    currentUser?.role === 'admin' || 
    currentUser?.role === 'super_admin';

  return (
    <AuthContext.Provider value={{ currentUser, isPremium, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);