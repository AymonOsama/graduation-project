import React, { createContext, useContext, useState, useEffect } from "react";
import { usersApi } from "../api/usersApi"; // استيراد الـ API الجديد
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // جلب البيانات أول ما الكومبوننت يفتح
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await usersApi.getAllUsers();
      setAllUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(true);
      toast.error("Failed to load users layout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role
  const updateUserRole = async (userId, newRole) => {
    try {
      // بنكلم الـ API الأول كأنه سيرفر
      await usersApi.updateUserRole(userId, newRole);
      
      // لو نجح، بنسمع في الـ State المحلية
      setAllUsers(prev =>
        prev.map(u =>
          String(u.id) === String(userId) ? { ...u, role: newRole } : u
        )
      );

      if (newRole === "admin") {
        toast.success("Admin assigned successfully!");
      } else {
        toast.success("Role updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update user role");
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      // بنبعث طلب الحذف للـ API
      await usersApi.deleteUser(userId);
      
      // بنحذف من الـ State لو السيرفر وافق
      setAllUsers(prev => prev.filter(u => String(u.id) !== String(userId)));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        allUsers,
        loading,
        error,
        updateUserRole,
        deleteUser,
        refreshUsers: fetchUsers // لو حابب تعمل زرار يعمل ريفريش للداتا يدوياً
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);