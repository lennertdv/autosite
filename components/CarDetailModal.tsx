
import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { XIcon, ChevronLeftIcon, ChevronRightIcon, SpeedometerIcon, GasPumpIcon, GearIcon, PhoneIcon, MailIcon, BoltIcon, DoorIcon, UserGroupIcon, KeyIcon, ShieldExclamationIcon } from '../assets/icons';

interface CarDetailModalProps {
    car: Car;
    onClose: () => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? car.imageUrls.length - 1 : prev - 1));
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === car.imageUrls.length - 1 ? 0 : prev + 1));
    };

    const selectImage = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentIndex(index);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4 animate-[fadeIn_0.3s_ease-out]" onClick={onClose}>
            <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl shadow-red-500/10 w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-[scaleIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
             <style>{`@keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>

                {/* Image Gallery */}
                <div className="w-full md:w-1/2 relative bg-black">
                   <img src={car.imageUrls[currentIndex]} alt={`${car.make} ${car.model}`} className="w-full h-64 md:h-full object-contain"/>
                   
                   <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-10"> <ChevronLeftIcon className="w-6 h-6"/> </button>
                   <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-10"> <ChevronRightIcon className="w-6 h-6"/> </button>

                   <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 p-2">
                       {car.imageUrls.map((url, index) => (
                           <img key={index} src={url} alt={`Thumbnail ${index + 1}`} className={`w-16 h-12 object-cover rounded-md cursor-pointer border-2 transition-all ${currentIndex === index ? 'border-red-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`} onClick={(e) => selectImage(e, index)} />
                       ))}
                   </div>
                </div>

                {/* Car Info */}
                <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-start">
                         <div>
                            <h2 className="text-3xl font-bold">{car.make} <span className="font-light text-red-500">{car.model}</span></h2>
                            <p className="text-gray-400">{car.year}</p>
                         </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"> <XIcon className="w-6 h-6"/> </button>
                    </div>

                    <p className="text-4xl font-semibold text-white my-4">€{car.price.toLocaleString('nl-BE')}</p>

                    <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><SpeedometerIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.mileage.toLocaleString('nl-BE')} km</span></div>
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><GasPumpIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.fuelType}</span></div>
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><GearIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.transmission}</span></div>
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><BoltIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.horsepower} pk</span></div>
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><DoorIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.doors} deuren</span></div>
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><UserGroupIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.owners} eigenaar{car.owners !== 1 ? 's' : ''}</span></div>
                        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"><KeyIcon className="w-5 h-5 text-red-500 flex-shrink-0"/> <span>{car.keys} sleutel{car.keys !== 1 ? 's' : ''}</span></div>
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${car.damage ? 'bg-yellow-900/70 border border-yellow-600' : 'bg-gray-800'}`}><ShieldExclamationIcon className={`w-5 h-5 flex-shrink-0 ${car.damage ? 'text-yellow-400' : 'text-red-500'}`}/> <span>Schade: {car.damage ? 'Ja' : 'Nee'}</span></div>
                    </div>

                    <div className="mt-auto pt-6">
                        <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Interesse?</h3>
                        <div className="space-y-4">
                           <a href="tel:+32123456789" className="flex items-center justify-center gap-3 w-full bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-transform hover:scale-105">
                               <PhoneIcon className="w-5 h-5"/>
                               <span>Bel Ons Nu</span>
                           </a>
                           <a href="mailto:info@automotion.be" className="flex items-center justify-center gap-3 w-full bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition-transform hover:scale-105">
                               <MailIcon className="w-5 h-5"/>
                               <span>Stuur een Email</span>
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailModal;
