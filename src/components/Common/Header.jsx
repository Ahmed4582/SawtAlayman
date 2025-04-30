import { BellIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const menuItems = [
        { title: 'الرئيسية', path: '/' },
        {
            title: 'خدماتنا',
            path: '/services',
            subItems: [
                { title: 'القرآن الكريم', path: '/services/quran' },
                { title: 'أذكار ودعاء', path: '/services/athkar' },
                { title: 'مناجاة', path: '/services/munajah' },
                { title: 'أناشيد', path: '/services/anasheed' },
            ]
        },
        { title: 'عن القارئ', path: '/about' },
        { title: 'تواصل معنا', path: '/contact' },
    ];

    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50 font-arabic" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img
                                src="/assets/img/logo.png"
                                alt="Sawt Alaymaan Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative">
                                {item.subItems ? (
                                    <div
                                        onMouseEnter={() => setIsServicesOpen(true)}
                                        onMouseLeave={() => setIsServicesOpen(false)}
                                    >
                                        <button
                                            className="text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium flex items-center"
                                        >
                                            {item.title}
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {isServicesOpen && (
                                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-1" role="menu">
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.path}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="text-gray-700  hover:text-green-600 px-3 py-2 text-lg font-medium"
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Language and Notification Icons */}
                        <div className="flex items-center justify-between gap-x-2">
                            <button className="text-gray-600 hover:text-gray-800">
                                <BellIcon size={25} />
                            </button>
                            <select >
                                <option value="ar" className="text-gray-700">ar</option>
                                <option value="en" className="text-gray-700">en</option>
                            </select>

                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;