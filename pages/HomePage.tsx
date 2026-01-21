
import React, { useState, useEffect } from 'react';
import { Page, Review } from '../types';
import { CogIcon, ShieldCheckIcon, WrenchScrewdriverIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../assets/icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const reviewsData: Review[] = [
    { id: 1, name: 'Jan Peeters', rating: 5, text: 'Topservice! Mijn auto rijdt weer als nieuw. Vriendelijk personeel en een eerlijke prijs.' },
    { id: 2, name: 'Anke Willems', rating: 5, text: 'Een prachtoccasion gekocht bij AutoMotion. Het hele proces was transparant en professioneel. Een aanrader!' },
    { id: 3, name: 'Tom De Vries', rating: 4, text: 'Goed en snel geholpen met een reparatie. De wachttijd was iets langer dan verwacht, maar het resultaat is perfect.' },
];

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
    return (
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
            {children}
        </div>
    );
};

const HomePage: React.FC<{ onNavigate: (page: Page) => void; }> = ({ onNavigate }) => {
    const [currentReview, setCurrentReview] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReview(prev => (prev + 1) % reviewsData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextReview = () => setCurrentReview(prev => (prev + 1) % reviewsData.length);
    const prevReview = () => setCurrentReview(prev => (prev - 1 + reviewsData.length) % reviewsData.length);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                <img src="https://picsum.photos/seed/carhero/1920/1080" alt="High-performance car" className="absolute inset-0 w-full h-full object-cover animate-[zoom_20s_ease-in-out_infinite]" />
                <style>{`
                    @keyframes zoom {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `}</style>
                <div className="relative z-20 container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 animate-[fadeInUp_1s_ease-out]">
                        Betrouwbare Auto's 
                        <br>
                        <span className="text-red-500">Professioneel Onderhoud</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-8 animate-[fadeInUp_1.5s_ease-out]">
                        Uw expert in verkoop van premium wagens en vakkundig garageonderhoud. Kwaliteit en klanttevredenheid staan bij ons voorop.
                    </p>
                    <div className="animate-[fadeInUp_2s_ease-out]">
                        <button onClick={() => onNavigate('Aanbod')} className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                            Bekijk ons aanbod
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Services Section */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Onze Expertise</h2>
                        <p className="max-w-2xl mx-auto text-gray-400 mb-12">Wij bieden een compleet pakket aan diensten om uw wagen in topconditie te houden.</p>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AnimatedSection className="flex flex-col items-center">
                            <div className="bg-gray-900 p-6 rounded-full border-2 border-red-500/50 mb-4">
                                <WrenchScrewdriverIcon className="w-12 h-12 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Professioneel Onderhoud</h3>
                            <p className="text-gray-400">Regelmatig en preventief onderhoud volgens de voorschriften van de fabrikant.</p>
                        </AnimatedSection>
                         <AnimatedSection className="flex flex-col items-center">
                             <div className="bg-gray-900 p-6 rounded-full border-2 border-red-500/50 mb-4">
                                <CogIcon className="w-12 h-12 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Complexe Herstellingen</h3>
                            <p className="text-gray-400">Diagnostiek en reparatie van motor, elektronica en alle andere componenten.</p>
                        </AnimatedSection>
                        <AnimatedSection className="flex flex-col items-center">
                            <div className="bg-gray-900 p-6 rounded-full border-2 border-red-500/50 mb-4">
                                <ShieldCheckIcon className="w-12 h-12 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Keuring & Certificatie</h3>
                            <p className="text-gray-400">Wij maken uw wagen volledig klaar voor de technische keuring, inclusief afhandeling.</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Wat Onze Klanten Zeggen</h2>
                        <p className="max-w-2xl mx-auto text-gray-400 mb-12">Uw tevredenheid is onze beste reclame.</p>
                    </AnimatedSection>
                    <AnimatedSection className="relative max-w-3xl mx-auto">
                        <div className="overflow-hidden relative h-48">
                            {reviewsData.map((review, index) => (
                                <div key={review.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentReview ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="flex mb-4">
                                            {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-6 h-6 text-yellow-400" />)}
                                            {[...Array(5 - review.rating)].map((_, i) => <StarIcon key={i} className="w-6 h-6 text-gray-600" />)}
                                        </div>
                                        <p className="text-lg italic text-gray-300">"{review.text}"</p>
                                        <p className="mt-4 font-semibold text-red-500">- {review.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={prevReview} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-red-500 transition-colors">
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button onClick={nextReview} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-red-500 transition-colors">
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-20 bg-black text-center">
                 <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold mb-4">Klaar om de perfecte wagen te vinden?</h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Ontdek ons zorgvuldig geselecteerd aanbod van premium tweedehandswagens. Kwaliteit gegarandeerd.</p>
                        <button onClick={() => onNavigate('Aanbod')} className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                            Bekijk ons aanbod
                        </button>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
