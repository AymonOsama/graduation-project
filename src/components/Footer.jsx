import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Landio', href: '#' },
      { name: 'Contact & Support', href: '#' },
      { name: 'Success History', href: '#' },
      { name: 'Setting & Privacy', href: '#' },
    ],
    'Quick Links': [
      { name: 'Premium Support', href: '#' },
      { name: 'Our Services', href: '#' },
      { name: 'Know Our Team', href: '#' },
      { name: 'Download App', href: '#' },
    ]
  };

  return (
    <footer className="bg-white text-slate-600 pt-20 pb-10 border-t border-slate-100 font-sans text-left">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <span className="font-black text-xl tracking-tighter">C</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">comparo</span>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-500 max-w-sm">
              Your ultimate destination for tech price comparisons. Find the best deals across multiple stores in seconds.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">+012 (345) 678 99</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">support@comparo.com</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-slate-900 font-bold mb-7 text-sm uppercase tracking-wider">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-[14px] hover:text-blue-600 transition-all flex items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all text-blue-600"><path d="m9 18 6-6-6-6"/></svg>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Section */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4 className="text-slate-900 font-bold mb-7 text-sm uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-3">
                <SocialLink bg="hover:bg-[#1877F2]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </SocialLink>
                <SocialLink bg="hover:bg-[#1DA1F2]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </SocialLink>
                <SocialLink bg="hover:bg-[#FF0000]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </SocialLink>
              </div>
            </div>
            
            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">Beta Version</p>
              <p className="text-xs text-slate-500">Fastest hardware comparison engine.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© {currentYear} <span className="text-slate-900">Comparo</span>. All rights reserved.</p>
          <div className="text-blue-600/60 italic tracking-[0.2em]">Handcrafted by Ayman Osama</div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for social icons
const SocialLink = ({ children, bg }) => (
  <a href="#" className={`w-10 h-10 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 bg-slate-50/50 transition-all hover:text-white hover:border-transparent hover:-translate-y-1 shadow-sm ${bg}`}>
    {children}
  </a>
);

export default Footer;