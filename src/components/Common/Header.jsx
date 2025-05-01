import { BellIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from '../Lang/LanguageSelector';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const getLinkClassName = (path) => {
        const isActive = location.pathname === path;

        return `relative px-3 py-2 text-lg font-medium transition-colors duration-200
        ${isActive ? 'text-[#004B40]' : 'text-[#04261B]'}
        group hover:text-[#004B40]
        flex flex-col items-center`;
    };

    const getActiveIndicator = (path) => {
        const isActive = location.pathname === path;
        const isHome = path === '/';

        if (isActive && isHome) {
            return (
                <svg
                    className="w-4 h-4 text-[#004B40] absolute -bottom-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
            );
        }
        return null;
    };

    const getHoverEffect = (isLastLink) => {
        return `absolute bottom-0 left-0 w-full h-0.5 
        ${isLastLink ? 'bg-[#004B40]' : 'bg-transparent'}`;
    };

    const ServicesDropdown = ({ item }) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        // Close dropdown when clicking outside
        useEffect(() => {
            const closeDropdown = (e) => {
                if (!e.target.closest('.services-dropdown')) {
                    setIsDropdownOpen(false);
                }
            };

            document.addEventListener('click', closeDropdown);
            return () => document.removeEventListener('click', closeDropdown);
        }, []);

        return (
            <div className="relative services-dropdown">
                <div className="flex items-center">
                    {/* Main Link */}
                    <Link
                        to={item.path}
                        className="text-[#04261B] hover:text-[#004B40] px-3 py-2 text-lg font-medium"
                    >
                        {item.title}
                    </Link>

                    {/* Dropdown Toggle Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className="p-1 hover:text-[#004B40] focus:outline-none"
                    >
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1">
                            {item.subItems.map((subItem, subIndex) => (
                                <Link
                                    key={subIndex}
                                    to={subItem.path}
                                    className="block px-4 py-2 text-base text-[#04261B] hover:bg-gray-50 hover:text-[#004B40]"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header className={`
            bg-white w-full top-0 z-50 font-arabic fixed
            transition-shadow duration-300
            ${isScrolled ? 'shadow-md' : ''}
        `} dir="rtl">
            {/* Decorative Images */}
            <div className="absolute left-20 top-0 h-52 w-32 hidden lg:block">
                <div
                    className="h-full w-full bg-no-repeat bg-left bg-contain"
                    style={{
                        backgroundImage: "url('/assets/img/left-decoration.png')"
                    }}
                />
            </div>

            <div className="absolute right-20 top-0 h-64 w-32 hidden lg:block">
                <div
                    className="h-full w-full bg-no-repeat bg-right bg-contain"
                    style={{
                        backgroundImage: "url('/assets/img/right-decoration.png')"
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img
                                src="/assets/img/logo.png"
                                alt="Sawt Alaymaan Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-x-8 items-center justify-between">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative">
                                {item.subItems ? (
                                    <ServicesDropdown item={item} />
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={getLinkClassName(item.path)}
                                    >
                                        {item.title}
                                        {getActiveIndicator(item.path)}
                                        <div className={getHoverEffect(false)} />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Language and Notification Icons */}
                    <div className="flex items-center justify-between gap-x-4">
                        <BellIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        <LanguageSelector />

                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    {item.subItems ? (
                                        <ServicesDropdown item={item} />
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="block px-3 py-2 text-base text-[#04261B] hover:text-[#004B40]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

