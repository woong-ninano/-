
import React, { useEffect, useRef, useState } from 'react';
import { SectionData, ContentItem } from '../types';

const MobileItem: React.FC<{ item: ContentItem; index: number }> = ({ item, index }) => {
  const [subIdx, setSubIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;
    setStartY(pageY - container.offsetTop);
    setScrollTop(container.scrollTop);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;
    const y = pageY - container.offsetTop;
    const walk = (y - startY) * 1.5;
    container.scrollTop = scrollTop - walk;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div className="py-16 border-b border-gray-100 last:border-none">
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 mb-6 whitespace-pre-line">
          {item.title}
        </h2>
        <div className="w-10 h-[2px] bg-[#004a99] mb-6"></div>
        <p className="text-lg text-gray-500 leading-relaxed font-light mb-4">
          {item.description}
        </p>
        {item.subDescription && (
          <p className="text-gray-400 text-sm border-l-2 border-gray-100 pl-4 italic">
            {item.subDescription}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center">
        {/* Mobile Device Frame */}
        <div className="relative w-full max-w-[280px] aspect-[9/19] bg-white rounded-[2.5rem] p-1.5 shadow-2xl border-[6px] border-black overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-30"></div>
          <div 
            ref={scrollRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={stopDragging}
            className={`relative w-full h-full overflow-y-auto rounded-[2rem] bg-gray-50 no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            <div className="relative w-full h-full">
              {item.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Screen ${index}-${idx}`}
                  className={`absolute inset-0 w-full object-contain object-top transition-opacity duration-500 ${idx === subIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sub-navigation Controls */}
        <div className="flex items-center gap-5 mt-8 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100 shadow-sm">
          <button 
            onClick={() => setSubIdx(Math.max(0, subIdx - 1))}
            disabled={subIdx === 0}
            className={`p-1.5 rounded-full transition-all ${subIdx === 0 ? 'opacity-20 cursor-not-allowed text-gray-300' : 'text-gray-900 hover:bg-white active:scale-95'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="text-sm font-bold text-gray-900 tabular-nums">
            <span className="text-[#004a99]">{subIdx + 1}</span> <span className="text-gray-300 mx-1">/</span> {item.images.length}
          </div>
          <button 
            onClick={() => setSubIdx(Math.min(item.images.length - 1, subIdx + 1))}
            disabled={subIdx === item.images.length - 1}
            className={`p-1.5 rounded-full transition-all ${subIdx === item.images.length - 1 ? 'opacity-20 cursor-not-allowed text-gray-300' : 'text-gray-900 hover:bg-white active:scale-95'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoSection: React.FC<SectionData> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [subImageIndices, setSubImageIndices] = useState<number[]>(items.map(() => 0));
  const [isMobile, setIsMobile] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Resize Listener to handle orientation changes and window resizing in real-time
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scrollytelling logic for Desktop
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile || !containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (top < 0 && Math.abs(top) < height) {
        const totalScrollableHeight = height - windowHeight;
        const progress = Math.abs(top) / totalScrollableHeight;
        const index = Math.min(
          Math.floor(progress * items.length),
          items.length - 1
        );
        setActiveItemIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length, isMobile]);

  // Reset inner image scroll when active item or sub-image changes
  useEffect(() => {
    if (isMobile) return;
    const currentContainer = scrollContainerRefs.current[activeItemIndex];
    if (currentContainer) {
      currentContainer.scrollTop = 0;
    }
  }, [activeItemIndex, subImageIndices, isMobile]);

  const handlePrevSubImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubImageIndices(prev => {
      const next = [...prev];
      next[activeItemIndex] = Math.max(0, next[activeItemIndex] - 1);
      return next;
    });
  };

  const handleNextSubImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubImageIndices(prev => {
      const next = [...prev];
      const maxIdx = items[activeItemIndex].images.length - 1;
      next[activeItemIndex] = Math.min(maxIdx, next[activeItemIndex] + 1);
      return next;
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    const container = scrollContainerRefs.current[activeItemIndex];
    if (!container) return;
    setIsDragging(true);
    setStartY(e.pageY - container.offsetTop);
    setScrollTop(container.scrollTop);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !isDragging) return;
    e.preventDefault();
    const container = scrollContainerRefs.current[activeItemIndex];
    if (!container) return;
    const y = e.pageY - container.offsetTop;
    const walk = (y - startY) * 1.5;
    container.scrollTop = scrollTop - walk;
  };

  const stopDragging = () => setIsDragging(false);

  const currentSubImageIndex = subImageIndices[activeItemIndex];
  const currentItemImages = items[activeItemIndex].images;

  return (
    <div className="w-full">
      {isMobile ? (
        /* Mobile View: Standard Linear Scroll */
        <div className="px-6 pb-20">
          {items.map((item, idx) => (
            <MobileItem key={idx} item={item} index={idx} />
          ))}
        </div>
      ) : (
        /* Desktop View: Scrollytelling Sticky Experience */
        <div 
          ref={containerRef}
          className="relative w-full"
          style={{ height: `${items.length * 150}vh` }}
        >
          <div className="sticky top-0 h-screen w-full flex flex-row items-center overflow-hidden max-w-7xl mx-auto px-6">
            {/* Left side: Text Content */}
            <div className="flex-1 w-[60%] flex items-center h-full">
              <div className="relative w-full">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-1000 ease-in-out w-[85%] ${
                      idx === activeItemIndex 
                        ? 'opacity-100 visible translate-y-0 relative' 
                        : 'opacity-0 invisible absolute top-0 translate-y-10'
                    }`}
                  >
                    <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 mb-8 whitespace-pre-line">
                      {item.title}
                    </h2>
                    <div className="w-12 h-[2px] bg-[#004a99] mb-8"></div>
                    <p className="text-xl text-gray-500 leading-relaxed font-light">
                      {item.description}
                      {item.subDescription && (
                        <span className="block mt-6 text-gray-400 text-lg border-l-2 border-gray-100 pl-4">
                          {item.subDescription}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Device Frame */}
            <div className="flex-1 w-[40%] flex flex-col items-center justify-center py-10">
              <div className="relative w-full max-w-[310px] aspect-[9/19] bg-white rounded-[3rem] p-2 shadow-[0_40px_100px_rgba(0,0,0,0.2)] border-[8px] border-black overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30"></div>
                
                <div 
                  ref={(el) => { scrollContainerRefs.current[activeItemIndex] = el; }}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={stopDragging}
                  onMouseLeave={stopDragging}
                  className={`relative w-full h-full overflow-y-auto rounded-[2.4rem] bg-gray-50 no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                >
                  <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                  <div className="relative w-full h-full">
                    {items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className={`absolute inset-0 transition-opacity duration-700 ${itemIdx === activeItemIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      >
                        {item.images.map((img, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={img}
                            alt={`Screen ${itemIdx}-${imgIdx}`}
                            className={`absolute inset-0 w-full object-contain object-top transition-all duration-500 transform ${
                              imgIdx === subImageIndices[itemIdx] ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                            }`}
                            draggable={false}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interaction Controls */}
              <div className="flex items-center gap-6 mt-8 bg-gray-50 px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                <button 
                  onClick={handlePrevSubImage}
                  disabled={currentSubImageIndex === 0}
                  className={`p-2 rounded-full text-gray-400 hover:bg-white hover:text-gray-900 transition-all ${currentSubImageIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'active:scale-90 shadow-sm'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="text-sm font-bold text-gray-900 tabular-nums">
                  <span className="text-[#004a99]">{currentSubImageIndex + 1}</span> <span className="text-gray-300 mx-1">/</span> {currentItemImages.length}
                </div>
                <button 
                  onClick={handleNextSubImage}
                  disabled={currentSubImageIndex === currentItemImages.length - 1}
                  className={`p-2 rounded-full text-gray-400 hover:bg-white hover:text-gray-900 transition-all ${currentSubImageIndex === currentItemImages.length - 1 ? 'opacity-20 cursor-not-allowed' : 'active:scale-90 shadow-sm'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <p className="mt-4 text-[11px] text-gray-400 font-medium">마우스로 화면을 상하 드래그하여 상세 내용을 확인하세요</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSection;
