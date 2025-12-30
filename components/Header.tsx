import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GitHub Raw 이미지의 표준 경로 (main 브랜치)
  // 캐시 문제 방지를 위해 쿼리 파라미터를 추가할 수 있으나, 여기서는 표준 URL을 사용합니다.
  const logoUrl = "https://raw.githubusercontent.com/woong-ninano/hyundai-finish/main/images/img_logo_ty1.png";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer">
          {!logoError ? (
            <img 
              src={logoUrl} 
              alt="현대해상 다이렉트" 
              className="h-6 md:h-7 object-contain"
              onError={() => {
                console.warn("Header Logo load failed, using fallback UI");
                setLogoError(true);
              }}
            />
          ) : (
            <div className="flex items-center">
              <span className="text-[#004a99] font-bold text-xl md:text-2xl tracking-tighter">
                HYUNDAI <span className="text-[#ff6a00]">DIRECT</span>
              </span>
            </div>
          )}
        </div>

        {/* Right: Project Title */}
        <div className="text-right">
          <span className="text-sm md:text-base font-medium transition-colors duration-500 text-gray-900">
            다이렉트 보험 플랫폼 고도화 구축
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;