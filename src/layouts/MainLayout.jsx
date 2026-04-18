import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar'; 
// لو الـ Footer في نفس فولدر الـ NavBar، يبقى المسار لازم يكون كدا:
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* الـ NavBar ثابت فوق */}
      <NavBar />
      
      {/* الـ flex-grow بتخلي الـ main ياخد المساحة المتاحة عشان الفوتر يفضل تحت لو الصفحة فاضية */}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      
      {/* الـ Footer ثابت تحت */}
      <Footer />
    </div>
  );
};

export default MainLayout;