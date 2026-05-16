import usersData from "../data/users.json";

let localUsersMock = [...usersData.users];

export const usersApi = {
  // --- الدوال القديمة (بتاعت الـ Admin) ---
  getAllUsers: async () => {
    return new Promise((resolve) => setTimeout(() => resolve([...localUsersMock]), 500));
  },
  updateUserRole: async (userId, newRole) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localUsersMock = localUsersMock.map((u) => String(u.id) === String(userId) ? { ...u, role: newRole } : u);
        resolve({ success: true });
      }, 400);
    });
  },
  deleteUser: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localUsersMock = localUsersMock.filter((u) => String(u.id) !== String(userId));
        resolve({ success: true });
      }, 400);
    });
  },

  // ==========================================
  // الدوران الجديدة الخاصة بالـ Authentication
  // ==========================================
  
  // 1. جلب بيانات مستخدم محدد بالـ ID
  getUserById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = localUsersMock.find((u) => String(u.id) === String(id));
        resolve(found || null);
      }, 300); // محاكاة سرعة استجابة السيرفر
    });
  },

  // 2. محاكاة دالة الـ Login (تأكيد الحساب)
  loginUser: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = localUsersMock.find((u) => String(u.id) === String(id));
        if (found) {
          resolve({ success: true, user: found });
        } else {
          reject(new Error("User not found"));
        }
      }, 500);
    });
  }
};