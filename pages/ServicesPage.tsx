
import React from 'react';
import { Service } from '../types';
import { OilIcon, TireIcon, BrakeIcon, CarBatteryIcon, CogIcon, WrenchScrewdriverIcon } from '../assets/icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const servicesData: Service[] = [
    { id: 1, name: 'Olie Verversen', description: 'Essentiële oliewissel met premium olie en filter om de motorprestaties te garanderen.', icon: OilIcon },
    { id: 2, name: 'Banden Vervangen', description: 'Professionele montage en balancering van zomer-, winter- of all-seasonbanden.', icon: TireIcon },
    { id: 3, name: 'Remmen Inspectie & Vervanging', description: 'Volledige controle en vervanging van remblokken, -schijven en -vloeistof voor uw veiligheid.', icon: BrakeIcon },
    { id: 4, name: 'Diagnostiek', description: 'Uitlezen van foutcodes en geavanceerde diagnostiek van motor en elektronica.', icon: CarBatteryIcon },
    { id: 5, name: 'Algemeen Onderhoud', description: 'Groot en klein onderhoud volgens de specificaties van de fabrikant om uw wagen in topconditie te houden.', icon: WrenchScrewdriverIcon },
    { id: 6, name: 'Motor & Transmissie', description: 'Complexe herstellingen en revisies van de motor en versnellingsbak door gespecialiseerde technici.', icon: CogIcon },
];


const ServiceItem: React.FC<{ service: Service, index: number }> = ({ service, index }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
    const Icon = service.icon;
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-8 bg-gray-900 border border-gray-800 p-8 rounded-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`flex-shrink-0 order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <Icon className="w-24 h-24 text-red-500" />
            </div>
            <div className={`flex-grow text-center md:text-left order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-400">{service.description}</p>
            </div>
        </div>
    );
}


const ServicesPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Onze Diensten</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Een volledig gamma aan professionele services om uw wagen te onderhouden en herstellen.</p>
            </div>

            <div className="space-y-12">
                {servicesData.map((service, index) => (
                    <ServiceItem key={service.id} service={service} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
