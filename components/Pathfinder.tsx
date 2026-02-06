
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, HelpCircle, CheckCircle, MapPin, 
  TrendingUp, Rocket, Lightbulb, Info, Edit3, Download, 
  Save, LogOut, Send, Mic, PlusCircle, FileText, ChevronRight,
  BarChart2, DollarSign, List, Shield, Zap, Search
} from 'lucide-react';
import { SectionContainer } from './ui/Common';

type Step = 'duration' | 'region' | 'age' | 'results' | 'chat';

interface PathfinderProps {
  onExit: () => void;
}

const Pathfinder: React.FC<PathfinderProps> = ({ onExit }) => {
  const [step, setStep] = useState<Step>('duration');
  const [progress, setProgress] = useState(25);
  
  // State for selections
  const [duration, setDuration] = useState<string>('early'); // Default to Early Stage per request
  const [region, setRegion] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNext = () => {
    if (step === 'duration') {
        setStep('region');
        setProgress(50);
    } else if (step === 'region') {
        setStep('age');
        setProgress(75);
    } else if (step === 'age') {
        setStep('results');
        setProgress(100);
    } else if (step === 'results') {
        setStep('chat');
    }
  };

  const handleBack = () => {
    if (step === 'region') {
        setStep('duration');
        setProgress(25);
    } else if (step === 'age') {
        setStep('region');
        setProgress(50);
    } else if (step === 'results') {
        setStep('age');
        setProgress(75);
    }
  };

  // Unified Floating Rounded Header
  const Header = ({ showSave = true }) => (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <header className="pointer-events-auto relative w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-full border border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-md transition-all">
            <div className="flex items-center gap-4">
                {/* Logo Button - Navigates Home */}
                <button onClick={onExit} className="flex items-center gap-2 group hover:opacity-80 transition-opacity focus:outline-none">
                    <div className="size-8 text-blue-600 flex items-center justify-center bg-blue-50 rounded-lg group-hover:scale-105 transition-transform">
                    <Search className="w-5 h-5" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg font-bold leading-tight">D-PLOG</span>
                </button>
                
                {/* Service Divider and Name */}
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <h2 className="text-gray-600 dark:text-gray-300 text-sm font-medium hidden sm:block">Pathfinder</h2>

                {step === 'chat' && (
                    <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700 ml-2 text-sm text-gray-500">
                        <FileText className="w-4 h-4" />
                        <span>Project: My Cafe Business Plan</span>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2">
                {showSave && (
                    <button className="hidden sm:flex items-center justify-center h-9 px-4 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors">
                    Save Draft
                    </button>
                )}
                <button 
                    onClick={onExit}
                    className={`flex items-center justify-center gap-2 h-9 px-5 rounded-full text-sm font-bold transition-colors ${step === 'chat' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                >
                    <span>{step === 'chat' ? 'Exit Interview' : 'Save & Exit'}</span>
                    {step === 'chat' && <LogOut className="w-4 h-4" />}
                </button>
                {step === 'chat' && (
                    <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm ml-1 overflow-hidden">
                        <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
        </header>
    </div>
  );

  // --- STEP 1: DURATION ---
  if (step === 'duration') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 pt-32">
          <div className="w-full max-w-[800px] flex flex-col gap-8 animate-fade-in-up">
            {/* Progress */}
            <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
              <div className="flex justify-between items-end">
                <p className="text-gray-900 dark:text-white text-base font-medium">Onboarding Progress</p>
                <p className="text-gray-500 text-sm">Step 1 of 4</p>
              </div>
              <div className="rounded-full bg-gray-200 h-2 overflow-hidden">
                <div className="h-full rounded-full bg-blue-600 w-1/4 transition-all duration-500"></div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">창업하신 지 얼마나 되셨나요?</h1>
              <p className="text-gray-500 text-lg">맞춤형 정부 지원사업과 로드맵을 추천해 드립니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                   { id: 'prospective', icon: Lightbulb, title: '예비 창업자', sub: '사업자 등록 전' },
                   { id: 'early', icon: Rocket, title: '초기 창업자', sub: '1년 미만' },
                   { id: 'growth', icon: TrendingUp, title: '도약기 창업자', sub: '3년 미만' },
               ].map((item) => (
                   <label 
                    key={item.id}
                    onClick={() => setDuration(item.id)}
                    className={`relative flex flex-col items-center justify-center p-8 gap-4 bg-white dark:bg-[#1a2632] rounded-2xl border-2 cursor-pointer shadow-sm hover:shadow-md transition-all h-full ${duration === item.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/10' : 'border-transparent hover:border-blue-200'}`}
                   >
                       <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${duration === item.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                           <item.icon className="w-8 h-8" />
                       </div>
                       <div className="text-center">
                           <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</p>
                           <p className="text-gray-500 text-sm">{item.sub}</p>
                       </div>
                       {duration === item.id && <div className="absolute top-4 right-4 text-blue-500"><CheckCircle className="w-6 h-6 fill-current" /></div>}
                   </label>
               ))}
            </div>

            <div className="flex justify-center mt-8">
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                    다음으로 <ArrowRight className="w-5 h-5" />
                </button>
            </div>
            
            <div className="text-center mt-4">
                <button className="text-gray-400 hover:text-blue-600 text-sm flex items-center justify-center gap-1 mx-auto">
                    <HelpCircle className="w-4 h-4" /> 왜 이 정보가 필요한가요?
                </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- STEP 2: REGION ---
  if (step === 'region') {
    const regions = [
        { id: 'seoul', en: 'Seoul', ko: '서울', icon: '🏢' },
        { id: 'busan', en: 'Busan', ko: '부산', icon: '⛵' },
        { id: 'daegu', en: 'Daegu', ko: '대구', icon: '🏯' },
        { id: 'incheon', en: 'Incheon', ko: '인천', icon: '✈️' },
        { id: 'gwangju', en: 'Gwangju', ko: '광주', icon: '🎨' },
        { id: 'daejeon', en: 'Daejeon', ko: '대전', icon: '🧪' },
        { id: 'ulsan', en: 'Ulsan', ko: '울산', icon: '🏭' },
        { id: 'sejong', en: 'Sejong', ko: '세종', icon: '🏛️' },
        { id: 'gyeonggi', en: 'Gyeonggi', ko: '경기', icon: '🚆' },
        { id: 'gangwon', en: 'Gangwon', ko: '강원', icon: '🏔️' },
        { id: 'chungbuk', en: 'Chungbuk', ko: '충북', icon: '🌲' },
        { id: 'chungnam', en: 'Chungnam', ko: '충남', icon: '🚜' },
        { id: 'jeonbuk', en: 'Jeonbuk', ko: '전북', icon: '🍚' },
        { id: 'jeonnam', en: 'Jeonnam', ko: '전남', icon: '💧' },
        { id: 'gyeongbuk', en: 'Gyeongbuk', ko: '경북', icon: '📜' },
        { id: 'gyeongnam', en: 'Gyeongnam', ko: '경남', icon: '🏗️' },
        { id: 'jeju', en: 'Jeju', ko: '제주', icon: '☀️' },
    ];

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-start py-10 px-4 pt-32">
            <div className="w-full max-w-[960px] flex flex-col gap-8 animate-fade-in">
                {/* Progress */}
                <div className="flex flex-col gap-3 px-4">
                    <div className="flex justify-between items-end">
                        <p className="text-gray-900 dark:text-white text-sm font-medium uppercase tracking-wider">Step 2 of 4</p>
                        <p className="text-blue-600 font-bold">50%</p>
                    </div>
                    <div className="rounded-full bg-gray-200 h-2 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-600 w-1/2 transition-all duration-500"></div>
                    </div>
                </div>

                <div className="px-4">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">어디서 시작하시나요?</h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        사업자 등록 예정지 혹은 현재 사업장 소재지를 선택해주세요. 해당 지역의 지원금 및 맞춤형 혜택을 찾아드립니다.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
                    {regions.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => setRegion(r.id)}
                            className={`group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 aspect-square relative ${region === r.id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'}`}
                        >
                            {region === r.id && (
                                <div className="absolute top-2 right-2 text-blue-500">
                                    <CheckCircle className="w-5 h-5 fill-current" />
                                </div>
                            )}
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110 ${region === r.id ? 'bg-white' : 'bg-gray-50'}`}>
                                {r.icon}
                            </div>
                            <div className="text-center">
                                <div className="text-gray-900 font-bold">{r.en}</div>
                                <div className="text-gray-500 text-sm font-medium">{r.ko}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-end gap-4 px-4 pt-6 border-t border-gray-200 mt-4">
                    <button onClick={handleBack} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                        Back
                    </button>
                    <button onClick={handleNext} disabled={!region} className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-2">
                        Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </main>
      </div>
    );
  }

  // --- STEP 3: AGE ---
  if (step === 'age') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 pt-32">
            <div className="w-full max-w-[640px] flex flex-col gap-8 animate-fade-in">
                {/* Progress */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                        <p className="text-gray-900 dark:text-white text-sm font-semibold uppercase tracking-wider">Step 3 of 4</p>
                        <p className="text-blue-600 font-bold">75%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-600 w-3/4 transition-all duration-500"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">대표님의 연령대는?</h1>
                    <p className="text-gray-500 text-lg">정부 지원사업 매칭을 위해 필요한 정보입니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label 
                        onClick={() => setAgeGroup('under39')}
                        className={`relative cursor-pointer group p-6 rounded-xl border-2 transition-all duration-200 h-full flex flex-col ${ageGroup === 'under39' ? 'border-blue-500 bg-blue-50/20 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                    >
                        <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-600 w-fit">
                            <Rocket className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">만 39세 이하</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">청년 창업 우대 혜택을<br/>받을 수 있습니다.</p>
                        {ageGroup === 'under39' && <div className="absolute top-4 right-4 text-blue-500"><CheckCircle className="w-6 h-6 fill-current" /></div>}
                    </label>

                    <label 
                        onClick={() => setAgeGroup('over39')}
                        className={`relative cursor-pointer group p-6 rounded-xl border-2 transition-all duration-200 h-full flex flex-col ${ageGroup === 'over39' ? 'border-blue-500 bg-blue-50/20 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                    >
                        <div className="mb-4 p-3 rounded-lg bg-indigo-50 text-indigo-600 w-fit">
                            <Lightbulb className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">만 39세 초과</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">일반 창업 및 중장년 기술창업<br/>지원을 매칭해드립니다.</p>
                        {ageGroup === 'over39' && <div className="absolute top-4 right-4 text-blue-500"><CheckCircle className="w-6 h-6 fill-current" /></div>}
                    </label>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 border border-gray-200">
                    <Info className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <strong className="font-bold text-gray-800">Tip:</strong> 만 39세는 '청년창업사관학교' 등 주요 정부 지원사업의 청년 우대 기준이 되는 중요한 나이입니다. 정확하게 선택해 주세요.
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4">
                    <button onClick={handleBack} className="h-12 px-6 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                        이전
                    </button>
                    <button onClick={handleNext} disabled={!ageGroup} className="h-12 px-8 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 shadow-md flex items-center gap-2">
                        다음 <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </main>
      </div>
    );
  }

  // --- STEP 4: RESULTS DASHBOARD ---
  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 pt-32">
            <div className="w-full max-w-[960px] flex flex-col gap-12 animate-fade-in-up">
                
                <section className="flex flex-col items-center text-center gap-6">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-2 shadow-sm">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-4 max-w-3xl">
                        <p className="text-blue-600 font-bold tracking-wide uppercase text-sm">Analysis Complete</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                            현재 대표님이 받을 수 있는 정부 지원금은<br className="hidden md:block"/>
                            <span className="text-blue-600">총 45건</span> (약 <span className="text-blue-600">2.5억 원</span>)입니다.
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                            Based on your current profile, we found high-potential matches. This is just the beginning of your journey with Pathfinder.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Card 1 */}
                    <div className="flex flex-col gap-4 rounded-2xl p-8 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <List className="w-32 h-32" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart2 className="text-blue-600 w-5 h-5" />
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Opportunities</p>
                        </div>
                        <div>
                            <p className="text-gray-900 text-5xl font-black leading-tight tracking-tight">45 <span className="text-2xl font-bold text-gray-400">Cases</span></p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                                <TrendingUp className="w-4 h-4" />
                                <span>+12% vs average in your sector</span>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col gap-4 rounded-2xl p-8 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <DollarSign className="w-32 h-32" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="text-blue-600 w-5 h-5" />
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Estimated Value</p>
                        </div>
                        <div>
                            <p className="text-gray-900 text-5xl font-black leading-tight tracking-tight">2.5 <span className="text-2xl font-bold text-gray-400">Billion KRW</span></p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                                <CheckCircle className="w-4 h-4" />
                                <span>High Match Probability</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold text-gray-900 px-1">Opportunity Breakdown</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Zap className="w-5 h-5"/></div>
                                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">High Priority</span>
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg">R&D Grants</h4>
                                <p className="text-gray-500 text-sm mt-1">2 technical development cases.</p>
                            </div>
                         </div>
                         <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><Rocket className="w-5 h-5"/></div>
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg">Startup Pkgs</h4>
                                <p className="text-gray-500 text-sm mt-1">1 comprehensive package.</p>
                            </div>
                         </div>
                         <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><DollarSign className="w-5 h-5"/></div>
                                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">Most Volume</span>
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg">Loans</h4>
                                <p className="text-gray-500 text-sm mt-1">42 financing options.</p>
                            </div>
                         </div>
                    </div>
                </section>

                <section className="mt-4 mb-12">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2632] to-[#0d141b] p-8 md:p-12 text-center shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2b8cee 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">이제 계획서를 써볼까요?</h2>
                            <p className="text-gray-300 max-w-lg text-base md:text-lg">
                                Writing a solid business plan is the key to unlocking these 45 opportunities. Our AI assistant will guide you step-by-step.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
                                <button onClick={handleNext} className="flex items-center justify-center gap-2 h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-base font-bold transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto min-w-[200px]">
                                    <Edit3 className="w-5 h-5" />
                                    <span>Start Business Plan</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 h-12 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-base font-medium transition-colors w-full sm:w-auto">
                                    View Full List
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
      </div>
    );
  }

  // --- STEP 5: CHAT INTERFACE ---
  if (step === 'chat') {
      const messages = [
          {
              id: 1, role: 'ai',
              text: "Hello! Let's continue working on your business plan. We were discussing your product strategy.",
              timestamp: '10:23 AM'
          },
          {
              id: 2, role: 'ai',
              text: "이 카페만의 시그니처 메뉴는 무엇인가요? 독특한 재료나 제조 방식이 있다면 자세히 알려주세요.\n(What is the signature menu of this cafe? Please tell me in detail if there are unique ingredients or manufacturing methods.)",
              timestamp: '10:23 AM'
          },
          {
              id: 3, role: 'user',
              text: "We make a special latte with local honey and oat milk. We source the honey from a farm just 10 miles away.",
              timestamp: '10:24 AM'
          }
      ];

      return (
        <div className="h-screen bg-gray-50 dark:bg-[#101922] flex flex-col font-sans overflow-hidden">
            <Header showSave={false} />
            
            {/* Main Content Area - Padded top for fixed header */}
            <main className="flex-1 flex overflow-hidden relative pt-24 md:pt-28 pb-4 px-4 max-w-7xl mx-auto w-full gap-4">
                
                {/* Left Panel: Chat (Rounded Card) */}
                <section className="flex flex-col w-full md:w-[45%] lg:w-[40%] bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-800 relative z-10 shadow-lg rounded-3xl overflow-hidden">
                    {/* Progress Header */}
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur sticky top-0 z-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Progress</span>
                                <span className="text-sm font-bold text-blue-600">47% Complete</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-blue-600 h-2 rounded-full w-[47%]"></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Currently, <span className="font-bold text-gray-900 dark:text-gray-200">7 out of 15</span> items have been completed!</p>
                        </div>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                        <div className="flex justify-center">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Today, 10:23 AM</span>
                        </div>
                        
                        {messages.map(m => (
                            <div key={m.id} className={`flex items-start gap-4 max-w-[90%] ${m.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === 'ai' ? 'bg-blue-50 border border-blue-100 text-blue-600' : 'bg-gray-200 overflow-hidden'}`}>
                                    {m.role === 'ai' ? <Rocket className="w-5 h-5" /> : <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full" alt="User" />}
                                </div>
                                <div className="flex flex-col gap-1 items-start">
                                    <span className={`text-xs font-medium text-gray-400 ${m.role === 'user' ? 'self-end mr-1' : 'ml-1'}`}>{m.role === 'ai' ? 'Pathfinder AI' : 'You'}</span>
                                    <div className={`p-4 shadow-sm text-sm leading-relaxed ${m.role === 'ai' ? 'bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none text-gray-800' : 'bg-blue-600 text-white rounded-2xl rounded-tr-none'}`}>
                                        <p className="whitespace-pre-wrap">{m.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        <div className="flex items-start gap-4 max-w-[90%]">
                            <div className="size-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm text-blue-600 opacity-70">
                                <Rocket className="w-4 h-4" />
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-6 pt-2 bg-white dark:bg-[#1a2632]">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                             {['Give me an example', 'Explain terminology', 'Skip question'].map(label => (
                                 <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap transition-colors">
                                     <Lightbulb className="w-3 h-3" /> {label}
                                 </button>
                             ))}
                        </div>
                        <div className="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"><PlusCircle className="w-5 h-5"/></button>
                            <textarea className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-sm text-gray-900 placeholder-gray-400 resize-none max-h-32" placeholder="Type your answer here..." rows={1}></textarea>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"><Mic className="w-5 h-5"/></button>
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"><Send className="w-4 h-4"/></button>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Document Preview (Rounded Card) */}
                <section className="hidden md:flex flex-col flex-1 bg-gray-100 dark:bg-[#1a2632] border border-gray-200 dark:border-gray-800 p-6 overflow-hidden h-full relative rounded-3xl shadow-inner">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                             <FileText className="text-blue-600 w-6 h-6" />
                             <h2 className="text-lg font-bold text-gray-900 dark:text-white">Real-time Business Plan</h2>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                             <span>Last saved just now</span>
                             <button className="p-1.5 hover:bg-white rounded shadow-sm transition-all"><Edit3 className="w-4 h-4"/></button>
                             <button className="p-1.5 hover:bg-white rounded shadow-sm transition-all"><Download className="w-4 h-4"/></button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#101922] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1 overflow-y-auto p-12 custom-scrollbar max-w-[800px] mx-auto w-full relative">
                        {/* Paper Content */}
                        <div className="border-b-2 border-blue-600 mb-8 pb-4">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">My Cafe Business Plan</h1>
                            <p className="text-gray-500 text-sm">Drafted on October 24, 2023</p>
                        </div>

                        <div className="mb-10 opacity-60 hover:opacity-100 transition-opacity">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                                <CheckCircle className="text-green-500 w-4 h-4" /> 1. Executive Summary
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-300">
                                The proposed venture is a specialty coffee shop aiming to provide high-quality beverages in a community-focused environment. By leveraging strategic location and premium sourcing, we intend to capture 15% of the local market share within the first year.
                            </p>
                        </div>

                        <div className="mb-10 relative">
                             <div className="absolute -left-8 top-1">
                                 <Edit3 className="text-blue-600 w-5 h-5 animate-pulse" />
                             </div>
                             <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">2. Product Strategy & Differentiation</h3>
                             <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                                 <h4 className="text-sm font-bold text-gray-900 mb-2">Core Product Offerings</h4>
                                 <p className="text-sm leading-relaxed text-gray-800 mb-4">
                                     Our primary product line focuses on espresso-based beverages. A key differentiator is our commitment to <span className="border-b border-dashed border-gray-400 cursor-help">Hyper-local Sourcing</span>.
                                 </p>
                                 <h4 className="text-sm font-bold text-gray-900 mb-2">Signature Items</h4>
                                 <p className="text-sm leading-relaxed text-gray-800">
                                     The flagship menu item is the <strong>"Honey-Oat Latte"</strong>, featuring a proprietary blend of <span className="bg-yellow-100 text-yellow-800 px-1 rounded">locally sourced artisanal honey</span> and premium oat milk.
                                 </p>
                             </div>
                        </div>

                        <div className="mb-10 opacity-40">
                             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div> 3. Market Analysis
                            </h3>
                            <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                        </div>
                    </div>

                    {/* Floating FAB */}
                    <button className="absolute bottom-8 right-8 bg-white dark:bg-[#1a2632] text-gray-900 dark:text-white p-3 rounded-full shadow-lg border border-gray-200 hover:scale-105 transition-transform flex items-center gap-2 z-20">
                         <div className="bg-blue-50 p-1 rounded-full text-blue-600"><DollarSign className="w-5 h-5"/></div>
                         <span className="text-sm font-bold pr-2">View 3 Grants</span>
                         <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </section>
            </main>
        </div>
      );
  }

  return null;
};

export default Pathfinder;
