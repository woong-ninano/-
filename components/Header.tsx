
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#004a99] rounded-full flex items-center justify-center">
               <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className={`font-bold text-xl tracking-tight text-[#004a99]`}>
              현대해상 <span className="text-orange-500">Direct</span>
            </span>
          </div>
          <div className="h-4 w-[1px] bg-gray-300 hidden sm:block"></div>
          <span className="text-gray-600 text-sm font-medium hidden sm:block">
            다이렉트 보험 플랫폼 고도화 구축
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
