import React from 'react';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import MetricChart from './components/MetricChart';
import { SectionData, MetricData } from './types';

const App: React.FC = () => {
  const mainSection: SectionData = {
    id: 'main-experience',
    items: [
      {
        title: "복잡함을 덜어내고\n직관을 채운 UI/UX",
        description: "기존의 복잡한 가입 프로세스를 3단계로 파격적으로 단축했습니다. 고객의 시선 이동을 고려한 카드 타입 레이아웃으로 가독성을 40% 이상 향상시켰습니다.",
        subDescription: "사용자 중심의 UX 설계를 통해 가입 도중 이탈률이 기존 대비 25% 감소하는 성과를 거두었습니다.",
        images: [
          "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800"
        ]
      },
      {
        title: "데이터로 찾아내는\n나만의 최적 보장",
        description: "고도화된 추천 알고리즘을 도입하여, 고객의 라이프스타일과 연령대를 분석한 초개인화 상품 제안 기능을 구현했습니다.",
        subDescription: "단순 상품 나열이 아닌, 나에게 꼭 필요한 특약만을 선별하여 제안함으로써 고객 만족도를 극대화했습니다.",
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&q=80&w=800"
        ]
      },
      {
        title: "언제 어디서나\n끊김 없는 모바일 경험",
        description: "모바일 환경에 최적화된 리액티브 아키텍처를 적용했습니다. 저사양 기기에서도 매끄러운 동작을 보장하며, 페이지 로딩 속도를 평균 1.5초 이내로 단축했습니다.",
        subDescription: "네이티브 앱 수준의 부드러운 애니메이션과 터치 인터랙션을 통해 최고의 사용성을 제공합니다.",
        images: [
          "https://images.unsplash.com/photo-1512428559083-a4369020473a?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=800"
        ]
      },
      {
        title: "보안은 더 강력하게\n인증은 더 간편하게",
        description: "생체 인증과 간편 비밀번호 시스템을 전면 도입하여 번거로운 공인인증서 없는 보안 환경을 구축했습니다. 모든 데이터는 최신 암호화 기술로 보호됩니다.",
        subDescription: "금융 보안 가이드라인을 완벽히 준수하면서도, 고객이 체감하는 인증 단계는 획기적으로 줄였습니다.",
        images: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  };

  const performanceData: MetricData[] = [
    { name: '기존 시스템', value: 45 },
    { name: 'UX 고도화', value: 78 },
    { name: '기술 고도화', value: 92 },
    { name: '최종 결과물', value: 98 },
  ];

  const footerLogoUrl = "https://raw.githubusercontent.com/woong-ninano/hyundai-finish/refs/heads/main/img_logo_ty1.png";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#004a99] uppercase bg-blue-50 rounded-full">
            Completion Report 2025
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
            현대해상 다이렉트<br />
            디지털 혁신의 시작
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            단순한 보험 가입을 넘어,<br className="hidden md:block" /> 
            고객의 삶에 가치를 더하는 디지털 플랫폼
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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <MetricChart data={performanceData} title="시스템 고도화 지표 변화" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center mb-8">
            <img 
              src={footerLogoUrl} 
              alt="현대해상 다이렉트" 
              className="h-8 md:h-10 object-contain"
            />
          </div>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed mb-12">
            현대해상 다이렉트 보험 플랫폼 고도화 구축<br />
            프로젝트 주요 개선 사항에 대한 완료 보고
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-400">
            <span>현대해상화재보험(주) CM사업본부</span>
          </div>
          <p className="text-xs text-gray-300 mt-16 tracking-widest uppercase">© 2025 Hyundai Marine & Fire Insurance Direct.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;