
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AanbodPage from './pages/AanbodPage';
import ServicesPage from './pages/ServicesPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import { Page } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');

    const handleNavigate = useCallback((page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'Home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'Aanbod':
                return <AanbodPage />;
            case 'Services':
                return <ServicesPage />;
            case 'Reviews':
                return <ReviewsPage />;
            case 'Contact':
                return <ContactPage />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 bg-opacity-50" style={{background: 'radial-gradient(circle, rgba(31,41,55,1) 0%, rgba(0,0,0,1) 100%)'}}>
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;
