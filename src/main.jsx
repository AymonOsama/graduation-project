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
import { p, path } from 'framer-motion/client';
import OurServices from './pages/OurServices';
import KnowOurTeam from './pages/KnowOurT';

/**
 * MAIN LAYOUT COMPONENT
 * Provides a consistent structure across all protected pages.
 * The <Outlet /> is where the child route components will be rendered.
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
/**
 * Retrieves the stored user from either LocalStorage or SessionStorage.
 */
const getAuthUser = () => localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");
/**
 * ProtectedRoute Guard:
 * Redirects unauthenticated users to the Login page.
 */
const ProtectedRoute = ({ children }) => {
  const isAuth = getAuthUser();
  return isAuth ? children : <Navigate to="/login" replace />;
};
/**
 * PublicRoute Guard:
 * Prevents authenticated users from accessing Auth pages (Login/Signup).
 */
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
    element: getAuthUser() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />,
  },
  // 1. PUBLIC AUTH ROUTES (No NavBar/Footer)
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <PublicRoute>
        <ForgetPassword />
      </PublicRoute>
    ),
  },
  // 2. PROTECTED APPLICATION ROUTES (With MainLayout)
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/success-history",
        element: <SuccessHistory />,  
      },
      {
        path: "/our-services",
        element: <OurServices />,
      },
      {
        path: "/our-team",
        element: <KnowOurTeam />,
      }
      // You can easily add more routes here (e.g., /profile, /settings)
    ],
  },
]);
// ----------------------------------------------------------------------
// APPLICATION RENDER

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Global Toast Notifications Configuration */}
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