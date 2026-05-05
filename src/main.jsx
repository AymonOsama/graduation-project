import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------
// STYLES & ASSETS
import './index.css';

// ----------------------------------------------------------------------
// PAGES & COMPONENTS
import Login from './pages/AuthPages/Login';
import Signup from './pages/AuthPages/Signup';
import ForgetPassword from './pages/AuthPages/ForgetPassword';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
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
import ScrollToTop from './components/ScrollToTop';
import FavoritePdPage from './pages/FavoritePdPage';
import DownloadAppPage from './pages/DownloadAppPage';

/**
 * MAIN LAYOUT COMPONENT
 */
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// ----------------------------------------------------------------------
// AUTHENTICATION & ROUTE GUARDS
// ----------------------------------------------------------------------
const getAuthUser = () => localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");

const ProtectedRoute = ({ children }) => {
  const isAuth = getAuthUser();
  return isAuth ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isAuth = getAuthUser();
  return isAuth ? <Navigate to="/home" replace /> : children;
};

// ----------------------------------------------------------------------
// ROUTER CONFIGURATION
// ----------------------------------------------------------------------
const router = createBrowserRouter([
  // Root Redirect Logic
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        {getAuthUser() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
      </>
    ),
  },
  // 1. PUBLIC AUTH ROUTES
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/signup",
    element: <PublicRoute><Signup /></PublicRoute>,
  },
  {
    path: "/forget-password",
    element: <PublicRoute><ForgetPassword /></PublicRoute>,
  },
  // 2. PROTECTED APPLICATION ROUTES
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    // إضافة صفحة خطأ عامة للتطبيق
    errorElement: (
        <div className="flex flex-col items-center justify-center min-h-screen font-bold text-xl">
            <h2>Oops! Something went wrong.</h2>
            <button 
                onClick={() => window.location.href = '/home'}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Back to Home
            </button>
        </div>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/success-history", element: <SuccessHistory /> },
      { path: "/our-services", element: <OurServices /> },
      { path: "/our-team", element: <KnowOurTeam /> },
      { 
        // التعديل الأساسي: إضافة "?" جعلت الـ slug اختيارياً للبحث
        path: "/categoriesPgPd/:urlSlug?", 
        element: <CategoriesPgPd /> 
      },
      { path: "/categories", element: <Categories /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/admin", element: <AdminPanel /> },
      { path: "/favorites", element: <FavoritePdPage /> },
      { path: "/download-app", element: <DownloadAppPage /> },
    ],
  },
]);

// ----------------------------------------------------------------------
// APPLICATION RENDER
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster 
      position="top-right" 
      toastOptions={{
        duration: 3000,
        style: { 
          fontWeight: 'bold',
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);