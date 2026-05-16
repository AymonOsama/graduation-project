import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// البيانات والستايل
import usersData from './data/users.json'; 
import './index.css';

// الـ Layout
import MainLayout from './layouts/MainLayout';

// الصفحات
import Login from './pages/AuthPages/Login';
import Signup from './pages/AuthPages/Signup';
import ForgetPassword from './pages/AuthPages/ForgetPassword';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SuccessHistory from './pages/AuthPages/successHisP';
import OurServices from './pages/OurServices';
import KnowOurTeam from './pages/KnowOurT';
import CategoriesPgPd from './pages/CategoriesPgPd';
import Categories from './pages/Categories';
import ProductPage from './pages/ProductPage';
import AdminPanel from './pages/AdminPages/AdminPanal';
import FavoritePdPage from './pages/FavoritePdPage';
import DownloadAppPage from './pages/DownloadAppPage';
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------
// AUTH HELPERS & GUARDS
// ----------------------------------------------------------------------
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from "./context/AdminContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CategoriesProvider } from "./context/CategoriesContext";
// 1. استيراد الـ ComplaintsProvider الجديد هنا
import { ComplaintsProvider } from "./context/ComplaintsContext"; 

const getAuthUserId = () => {
  const rawData = localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");
  if (!rawData) return null;
  try {
    const parsed = JSON.parse(rawData);
    return parsed.id ? String(parsed.id) : String(parsed);
  } catch { return String(rawData); }
};

const ProtectedRoute = ({ children }) => {
  const userId = getAuthUserId();
  return userId ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const userId = getAuthUserId();
  if (!userId) return <Navigate to="/login" replace />;
  const userInDb = usersData.users.find(u => String(u.id) === userId);
  const isAuthorized = userInDb && (userInDb.role === 'admin' || userInDb.role === 'super_admin');
  return isAuthorized ? children : <Navigate to="/home" replace />;
};

const PremiumRoute = ({ children }) => {
  const userId = getAuthUserId();
  if (!userId) return <Navigate to="/login" replace />;
  const userInDb = usersData.users.find(u => String(u.id) === userId);
  const isPremium = userInDb && (userInDb.isPremium === true || userInDb.role === 'admin');
  return isPremium ? children : <Navigate to="/home" replace />;
};

const PublicRoute = ({ children }) => {
  const userId = getAuthUserId();
  return userId ? <Navigate to="/home" replace /> : children;
};

// ----------------------------------------------------------------------
// ROUTER CONFIGURATION
// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        {getAuthUserId() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
      </>
    ),
  },
  // مسارات الزوار (بدون Layout)
  { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
  { path: "/signup", element: <PublicRoute><Signup /></PublicRoute> },
  { path: "/forget-password", element: <PublicRoute><ForgetPassword /></PublicRoute> },

  // مسارات التطبيق (باستخدام الـ MainLayout)
  {
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    errorElement: (
      <div className="flex flex-col items-center justify-center min-h-screen font-bold text-xl">
        <h2>Oops! Something went wrong.</h2>
        <button onClick={() => window.location.href = '/home'} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Back to Home
        </button>
      </div>
    ),
    children: [
      { path: "home", element: <Home /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <ContactUs /> },
      { path: "success-history", element: <SuccessHistory /> },
      { path: "our-services", element: <OurServices /> },
      { path: "our-team", element: <KnowOurTeam /> },
      { path: "categories", element: <Categories /> },
      { path: "categoriesPgPd/:urlSlug?", element: <CategoriesPgPd /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "download-app", element: <DownloadAppPage /> },
      
      // 2. تغليف مسار الـ Admin بـ ComplaintsProvider لحل مشكلة الـ Context الخطأ
      { 
        path: "admin", 
        element: (
          <AdminRoute>
            <ComplaintsProvider>
              <AdminPanel />
            </ComplaintsProvider>
          </AdminRoute>
        ) 
      },
      
      { path: "favorites", element: <PremiumRoute><FavoritePdPage /></PremiumRoute> },
    ],
  },
]);

// ----------------------------------------------------------------------
// RENDER
// ----------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider>
        <CategoriesProvider>
          <ProductsProvider>

              <Toaster 
                position="top-right" 
                toastOptions={{
                  duration: 3000,
                  style: { fontWeight: 'bold', borderRadius: '12px', background: '#333', color: '#fff' },
                }}
              />
              <RouterProvider router={router} />
              
          </ProductsProvider>
        </CategoriesProvider>
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);