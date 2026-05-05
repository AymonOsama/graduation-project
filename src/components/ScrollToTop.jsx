import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // هذا الـ Hook يعطينا مسار الصفحة الحالي
  const { pathname } = useLocation();

  useEffect(() => {
    // بمجرد تغيير المسار (pathname)، اجعل السكرول يبدأ من (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // هذا المكون لا يرسم أي شيء في الواجهة
};

export default ScrollToTop;