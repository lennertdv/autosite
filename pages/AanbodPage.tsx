
import React, { useState, useMemo } from 'react';
import { Car } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CarDetailModal from '../components/CarDetailModal';

const carsData: Car[] = [
    { id: 1, make: 'Audi', model: 'A6', year: 2022, price: 55000, mileage: 25000, fuelType: 'Diesel', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/audiA6/800/600', 'https://picsum.photos/seed/audiA6-2/800/600', 'https://picsum.photos/seed/audiA6-3/800/600'], doors: 5, owners: 1, damage: false, keys: 2, horsepower: 286 },
    { id: 2, make: 'BMW', model: '5 Series', year: 2021, price: 52500, mileage: 31000, fuelType: 'Benzine', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/bmw5/800/600', 'https://picsum.photos/seed/bmw5-2/800/600', 'https://picsum.photos/seed/bmw5-3/800/600'], doors: 5, owners: 2, damage: false, keys: 2, horsepower: 252 },
    { id: 3, make: 'Mercedes-Benz', model: 'E-Class', year: 2023, price: 62000, mileage: 15000, fuelType: 'Hybride', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/mercedesE/800/600', 'https://picsum.photos/seed/mercedesE-2/800/600', 'https://picsum.photos/seed/mercedesE-3/800/600'], doors: 5, owners: 1, damage: true, keys: 1, horsepower: 333 },
    { id: 4, make: 'Volvo', model: 'XC60', year: 2022, price: 48000, mileage: 45000, fuelType: 'Diesel', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/volvoXC60/800/600', 'https://picsum.photos/seed/volvoXC60-2/800/600', 'https://picsum.photos/seed/volvoXC60-3/800/600'], doors: 5, owners: 1, damage: false, keys: 2, horsepower: 235 },
    { id: 5, make: 'Porsche', model: '911 Carrera', year: 2022, price: 125000, mileage: 12000, fuelType: 'Benzine', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/porsche911/800/600', 'https://picsum.photos/seed/porsche911-2/800/600', 'https://picsum.photos/seed/porsche911-3/800/600'], doors: 2, owners: 1, damage: false, keys: 2, horsepower: 385 },
    { id: 6, make: 'Volkswagen', model: 'Golf R', year: 2023, price: 45000, mileage: 8000, fuelType: 'Benzine', transmission: 'Manueel', imageUrls: ['https://picsum.photos/seed/golfR/800/600', 'https://picsum.photos/seed/golfR-2/800/600', 'https://picsum.photos/seed/golfR-3/800/600'], doors: 5, owners: 1, damage: false, keys: 2, horsepower: 320 },
    { id: 7, make: 'Tesla', model: 'Model 3', year: 2021, price: 41000, mileage: 55000, fuelType: 'Elektrisch', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/tesla3/800/600', 'https://picsum.photos/seed/tesla3-2/800/600', 'https://picsum.photos/seed/tesla3-3/800/600'], doors: 5, owners: 2, damage: false, keys: 1, horsepower: 283 },
    { id: 8, make: 'Land Rover', model: 'Defender', year: 2022, price: 78000, mileage: 28000, fuelType: 'Diesel', transmission: 'Automatisch', imageUrls: ['https://picsum.photos/seed/defender/800/600', 'https://picsum.photos/seed/defender-2/800/600', 'https://picsum.photos/seed/defender-3/800/600'], doors: 5, owners: 1, damage: false, keys: 2, horsepower: 249 },
];
const brands = ['all', ...Array.from(new Set(carsData.map(car => car.make)))];

const CarCard: React.FC<{ car: Car; onDetailsClick: (car: Car) => void; }> = ({ car, onDetailsClick }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
    return (
        <div ref={ref} className={`bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/20 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="overflow-hidden">
                <img src={car.imageUrls[0]} alt={`${car.make} ${car.model}`} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-white">{car.make} <span className="text-red-500">{car.model}</span></h3>
                <p className="text-gray-400 text-sm mt-1">{car.year}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-semibold text-white">€{car.price.toLocaleString('nl-BE')}</span>
                    <button onClick={() => onDetailsClick(car)} className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors">
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

const AanbodPage: React.FC = () => {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [filters, setFilters] = useState({ brand: 'all', priceSort: 'default', yearSort: 'default' });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredAndSortedCars = useMemo(() => {
        let result = [...carsData];

        if (filters.brand !== 'all') {
            result = result.filter(car => car.make === filters.brand);
        }

        if (filters.priceSort === 'asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (filters.priceSort === 'desc') {
            result.sort((a, b) => b.price - a.price);
        }

        if (filters.yearSort === 'desc') {
            result.sort((a, b) => b.year - a.year);
        } else if (filters.yearSort === 'asc') {
            result.sort((a, b) => a.year - b.year);
        }

        return result;
    }, [filters]);


    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ons Aanbod</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Ontdek onze collectie van zorgvuldig geselecteerde, hoogwaardige wagens.</p>
            </div>
            
            <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-800 flex flex-wrap gap-4 items-center justify-center">
                <select name="brand" value={filters.brand} onChange={handleFilterChange} className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 capitalize">
                    {brands.map(brand => <option key={brand} value={brand} className="capitalize">{brand === 'all' ? 'Alle Merken' : brand}</option>)}
                </select>
                <select name="priceSort" value={filters.priceSort} onChange={handleFilterChange} className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="default">Sorteer op Prijs</option>
                    <option value="asc">Prijs (laag-hoog)</option>
                    <option value="desc">Prijs (hoog-laag)</option>
                </select>
                 <select name="yearSort" value={filters.yearSort} onChange={handleFilterChange} className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="default">Sorteer op Bouwjaar</option>
                    <option value="desc">Bouwjaar (nieuw-oud)</option>
                    <option value="asc">Bouwjaar (oud-nieuw)</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedCars.map(car => (
                    <CarCard key={car.id} car={car} onDetailsClick={setSelectedCar} />
                ))}
            </div>

            {selectedCar && <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
        </div>
    );
};

export default AanbodPage;
