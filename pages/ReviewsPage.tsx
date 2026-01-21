
import React from 'react';
import { Review } from '../types';
import { StarIcon } from '../assets/icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const reviewsData: Review[] = [
    { id: 1, name: 'Jan Peeters', rating: 5, text: 'Topservice! Mijn auto rijdt weer als nieuw. Vriendelijk personeel en een eerlijke prijs.' },
    { id: 2, name: 'Anke Willems', rating: 5, text: 'Een prachtoccasion gekocht bij AutoMotion. Het hele proces was transparant en professioneel. Een aanrader!' },
    { id: 3, name: 'Tom De Vries', rating: 4, text: 'Goed en snel geholpen met een reparatie. De wachttijd was iets langer dan verwacht, maar het resultaat is perfect.' },
    { id: 4, name: 'Laura Mertens', rating: 5, text: 'Zeer deskundig advies gekregen bij de aankoop van mijn nieuwe wagen. Ik voelde me echt begrepen en geholpen.' },
    { id: 5, name: 'David Claes', rating: 5, text: 'Jaarlijks onderhoud laten uitvoeren. Alles perfect volgens afspraak en voor een correcte prijs. Tot volgend jaar!' },
    { id: 6, name: 'Sofie Hermans', rating: 4, text: 'Betrouwbare garage. Ze communiceren duidelijk over de nodige herstellingen en kosten.' },
];

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
    return (
        <div ref={ref} className={`bg-gray-900 border border-gray-800 p-6 rounded-lg flex flex-col transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center mb-4">
                <div className="flex">
                    {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
                    {[...Array(5 - review.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-gray-600" />)}
                </div>
            </div>
            <p className="text-gray-300 italic mb-4 flex-grow">"{review.text}"</p>
            <p className="font-semibold text-red-500">- {review.name}</p>
        </div>
    );
};

const ReviewsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Klantenervaringen</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Uw vertrouwen is ons grootste goed. Lees wat onze klanten te zeggen hebben.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviewsData.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
