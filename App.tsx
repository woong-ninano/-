import React, { useState } from 'react';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import MetricChart from './components/MetricChart';
import { SectionData, MetricData } from './types';

const App: React.FC = () => {
  const [footerLogoError, setFooterLogoError] = useState(false);

  const mainSection: SectionData = {
    id: 'main-experience',
    items: [
      {
        title: "복잡함을 덜어내고\n직관을 채운 UI/UX",
        description: "기존의 복잡한 가입 프로세스를 3단계로 파격적으로 단축했습니다. 고객의 시선 이동을 고려한 카드 타입 레이아웃으로 가독성을 40% 이상 향상시켰습니다.",
        subDescription: "사용자 중심의 UX 설계를 통해 가입 도중 이탈률이 기존 대비 25% 감소하는 성과를 거두었습니다.",
        images: [
          "https://i.ibb.co/7dyCCtcy/01-01.png",
          "https://i.ibb.co/xSLZK6k6/01-02.png"
        ]
      },
      {
        title: "데이터로 찾아내는\n나만의 최적 보장",
        description: "고도화된 추천 알고리즘을 도입하여, 고객의 라이프스타일과 연령대를 분석한 초개인화 상품 제안 기능을 구현했습니다.",
        subDescription: "단순 상품 나열이 아닌, 나에게 꼭 필요한 특약만을 선별하여 제안함으로써 고객 만족도를 극대화했습니다.",
        images: [
          "https://i.ibb.co/Y7qpVxDx/02-01.png",
          "https://i.ibb.co/Xx8dgzgm/02-02.png",
          "https://i.ibb.co/YFXq9SCf/02-03.png",
          "https://i.ibb.co/ksSxdx1r/02-04.png",
          "https://i.ibb.co/bjgH2MRB/02-05.png",
          "https://i.ibb.co/23HC7dtB/02-06.png"
        ]
      },
      {
        title: "언제 어디서나\n끊김 없는 모바일 경험",
        description: "모바일 환경에 최적화된 리액티브 아키텍처를 적용했습니다. 저사양 기기에서도 매끄러운 동작을 보장하며, 페이지 로딩 속도를 평균 1.5초 이내로 단축했습니다.",
        images: [
          "https://i.ibb.co/7dyCCtcy/01-01.png", // 대체 이미지 (제공된 URL 중 활용)
          "https://i.ibb.co/xSLZK6k6/01-02.png"
        ]
      },
      {
        title: "보안은 더 강력하게\n인증은 더 간편하게",
        description: "생체 인증과 간편 비밀번호 시스템을 전면 도입하여 번거로운 공인인증서 없는 보안 환경을 구축했습니다. 모든 데이터는 최신 암호화 기술로 보호됩니다.",
        images: [
          "https://i.ibb.co/ksSxdx1r/02-04.png", // 대체 이미지 (제공된 URL 중 활용)
          "https://i.ibb.co/bjgH2MRB/02-05.png"
        ]
      }
    ]
  };

  const performanceMetrics: MetricData[] = [
    { name: '기존 로딩', value: 3.8 },
    { name: '목표 속도', value: 2.0 },
    { name: '현재 성능', value: 1.2 },
  ];

  const satisfactionMetrics: MetricData[] = [
    { name: '사용 편의성', value: 92 },
    { name: '디자인 만족도', value: 95 },
    { name: '추천 의향', value: 88 },
  ];

  const footerLogoUrl = "https://i.ibb.co/k2Yn9STr/img-logo-ty1.png";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#004a99] uppercase bg-blue-50 rounded-full">
            Project Completion Report 2025
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
            현대해상 다이렉트<br />
            디지털 혁신의 기록
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            보험의 본질은 지키고,<br className="hidden md:block" /> 
            경험의 가치는 새롭게 정의하다.
          </p>
          <div className="mt-12 animate-bounce flex justify-center opacity-30">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7-7-7m14-8l-7 7-7-7" /></svg>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-[1px] border-gray-100 rounded-full -z-0"></div>
      </section>

      {/* Main Scrollytelling Section */}
      <main className="bg-white">
        <InfoSection {...mainSection} />
      </main>

      {/* Metrics Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">데이터로 증명하는 혁신</h2>
            <p className="text-gray-500">고도화 프로젝트 이후 주요 지표의 괄목할만한 성장을 확인하세요.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <MetricChart data={performanceMetrics} title="페이지 로딩 성능 개선 (단위: 초)" />
            <MetricChart data={satisfactionMetrics} title="사용자 만족도 조사 (단위: %)" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center mb-8 h-12">
            {!footerLogoError ? (
              <img 
                src={footerLogoUrl} 
                alt="현대해상 다이렉트" 
                className="h-9 md:h-10 object-contain"
                onError={() => setFooterLogoError(true)}
              />
            ) : (
              <div className="text-[#004a99] font-bold text-2xl tracking-tighter">
                현대해상 <span className="text-[#ff6a00]">다이렉트</span>
              </div>
            )}
          </div>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed mb-12 text-sm md:text-base">
            현대해상 다이렉트 보험 플랫폼 고도화 구축<br />
            프로젝트 주요 개선 사항에 대한 완료 보고
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-xs md:text-sm font-medium text-gray-400">
            <span>현대해상화재보험(주) CM사업본부</span>
            <span className="hidden md:block w-px h-3 bg-gray-200"></span>
            <span>디지털 기획 및 구축 완료 보고서</span>
          </div>
          <p className="text-[10px] text-gray-300 mt-16 tracking-[0.3em] uppercase">© 2025 Hyundai Marine & Fire Insurance Direct.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;