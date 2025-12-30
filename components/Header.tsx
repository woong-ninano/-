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

  // 제공해주신 새로운 로고 이미지 URL 적용
  const logoUrl = "${imageBaseUrl}img_logo_ty1.png";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer">
          <img 
            src={logoUrl} 
            alt="현대해상 다이렉트" 
            className="h-7 md:h-8 object-contain"
            onError={(e) => {
              // 이미지 로드 실패 시 대체 처리 (필요시)
              console.error("Logo failed to load");
            }}
          />
        </div>

        {/* Right: Project Title */}
        <div className="text-right">
          <span className="text-sm md:text-base font-medium transition-colors duration-500 text-[#000000]">
            다이렉트 보험 플랫폼 고도화 구축
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;