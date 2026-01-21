
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { MenuIcon, XIcon } from '../assets/icons';

interface NavbarProps {
    onNavigate: (page: Page) => void;
    currentPage: Page;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; onNavigate: (page: Page) => void; children: React.ReactNode; }> = ({ page, currentPage, onNavigate, children }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => onNavigate(page)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative ${
                isActive ? 'text-red-500' : 'text-gray-300 hover:text-white'
            }`}
        >
            {children}
            {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-red-500"></span>}
        </button>
    );
};


const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const menuItems: Page[] = ['Home', 'Aanbod', 'Services', 'Reviews', 'Contact'];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg shadow-red-500/10' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('Home')}>
                     <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-2xl font-bold text-white">Auto<span className="text-red-500">Motion</span></span>
                </div>
                
                <div className="hidden md:flex items-center space-x-2">
                    {menuItems.map(item => <NavLink key={item} page={item} currentPage={currentPage} onNavigate={onNavigate}>{item}</NavLink>)}
                </div>

                <div className="hidden md:block">
                    <button onClick={() => onNavigate('Contact')} className="bg-red-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                        Maak Afspraak
                    </button>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                       {isMenuOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur-lg absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4">
                    {menuItems.map(item => (
                         <button key={item} onClick={() => { onNavigate(item); setIsMenuOpen(false); }} className={`w-full text-center py-2 text-lg ${currentPage === item ? 'text-red-500 font-bold' : 'text-gray-300'}`}>
                           {item}
                         </button>
                    ))}
                    <button onClick={() => { onNavigate('Contact'); setIsMenuOpen(false); }} className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors">
                        Maak Afspraak
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
