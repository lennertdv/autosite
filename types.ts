
export type Page = 'Home' | 'Aanbod' | 'Services' | 'Reviews' | 'Contact';

export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    imageUrls: string[];
    mileage: number;
    fuelType: string;
    transmission: string;
    doors: number;
    owners: number;
    damage: boolean;
    keys: number;
    horsepower: number;
}

export interface Review {
    id: number;
    name: string;
    rating: number;
    text: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}
