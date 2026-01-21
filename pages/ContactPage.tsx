
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', service: '' });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            console.log('Form submitted:', formData);
            setFormStatus('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
            setFormData({ name: '', email: '', message: '', service: '' });
        } else {
            setFormStatus('Gelieve alle verplichte velden in te vullen.');
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Neem Contact Op</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Heeft u een vraag of wilt u een afspraak maken? We horen graag van u.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-white">Plan Onderhoud of Stel een Vraag</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Naam</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-300">Dienst (optioneel)</label>
                            <select name="service" id="service" value={formData.service} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                <option value="">Selecteer een dienst...</option>
                                <option>Algemeen Onderhoud</option>
                                <option>Herstelling</option>
                                <option>Aankoop Informatie</option>
                                <option>Andere</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Bericht</label>
                            <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" required></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors">Verstuur</button>
                        </div>
                    </form>
                    {formStatus && <p className="mt-4 text-center text-sm text-gray-300">{formStatus}</p>}
                </div>
                <div className="space-y-8">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Bedrijfsgegevens</h3>
                        <p className="text-gray-400">AutoMotion BV<br />Automotive Straat 123<br />1234 AB, Autostad</p>
                        <p className="text-gray-400 mt-4">Email: <a href="mailto:info@automotion.be" className="text-red-500 hover:underline">info@automotion.be</a></p>
                        <p className="text-gray-400">Telefoon: <a href="tel:+32123456789" className="text-red-500 hover:underline">+32 123 45 67 89</a></p>
                    </div>
                     <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Openingstijden</h3>
                        <ul className="text-gray-400 space-y-1">
                           <li className="flex justify-between"><span>Maandag - Vrijdag:</span> <span>08:00 - 18:00</span></li>
                           <li className="flex justify-between"><span>Zaterdag:</span> <span>09:00 - 17:00</span></li>
                           <li className="flex justify-between"><span>Zondag:</span> <span>Gesloten</span></li>
                        </ul>
                    </div>
                    <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center text-gray-500 italic border border-gray-700">
                        Google Maps Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
