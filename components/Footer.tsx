
import React from 'react';
import { Page } from '../types';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../assets/icons';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2" >
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="text-2xl font-bold text-white">Auto<span className="text-red-500">Motion</span></span>
                        </div>
                        <p className="text-gray-400 mt-4 text-sm">Uw partner in mobiliteit. Kwaliteit en service waarop u kunt vertrouwen.</p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><InstagramIcon className="w-6 h-6"/></a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><TwitterIcon className="w-6 h-6"/></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white uppercase">Menu</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => onNavigate('Home')} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Home</button></li>
                            <li><button onClick={() => onNavigate('Aanbod')} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Aanbod</button></li>
                            <li><button onClick={() => onNavigate('Services')} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Services</button></li>
                            <li><button onClick={() => onNavigate('Reviews')} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Reviews</button></li>
                            <li><button onClick={() => onNavigate('Contact')} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Contact</button></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white uppercase">Openingstijden</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                           <li>Ma - Vr: 08:00 - 18:00</li>
                           <li>Zaterdag: 09:00 - 17:00</li>
                           <li>Zondag: Gesloten</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white uppercase">Contact</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                           <li>Automotive Straat 123</li>
                           <li>1234 AB, Autostad</li>
                           <li className="pt-2">info@automotion.be</li>
                           <li>+32 123 45 67 89</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} AutoMotion. Alle rechten voorbehouden.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
