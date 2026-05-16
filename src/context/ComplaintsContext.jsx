import React, { createContext, useContext, useState } from 'react';
import initialComplaintsData from '../data/complaintsData.json'; // استيراد البيانات الأولية من ملف JSON
import toast from 'react-hot-toast';

const ComplaintsContext = createContext();

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(initialComplaintsData);

  // دالة حذف الشكوى
  const deleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((item) => item.id !== id));
    toast.success('Complaint deleted permanently', {
      style: { 
        background: '#1f2937', 
        color: '#fff', 
        borderRadius: '0.75rem',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }
    });
  };

  // دالة الرد عبر البريد الإلكتروني
  const replyToComplaint = (email, title) => {
    const subject = encodeURIComponent(`Re: ${title}`);
    const body = encodeURIComponent(
      "Hello,\n\nThank you for reporting this issue. Our team is looking into it closely.\n\nBest regards,\nComparo Support Team"
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    toast.success('Opening default email client...');
  };

  return (
    <ComplaintsContext.Provider value={{ complaints, deleteComplaint, replyToComplaint }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintsContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintsProvider');
  }
  return context;
};