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

  // 사용자의 원본 코드에 명시되었던 refs/heads/main 경로를 우선 사용합니다.
  const logoUrl = "https://raw.githubusercontent.com/woong-ninano/hyundai-finish/refs/heads/main/images/img_logo_ty1.png";

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
                console.warn("Header Logo failed to load with primary URL, trying fallback...");
                setLogoError(true);
              }}
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[#004a99] font-bold text-xl tracking-tight">
                현대해상 <span className="text-[#ff6a00]">다이렉트</span>
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