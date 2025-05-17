import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { QuranView } from '../QuranView';
import { useNavigate } from 'react-router-dom';


const Browse = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('surah');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [quranData, setQuranData] = useState([]);
    const [juzData, setJuzData] = useState([]);
    const itemsPerPage = 20; // Changed to 16 for better grid layout

    // Fetch Quran data based on active tab
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'surah') {
                    const response = await fetch('https://api.alquran.cloud/v1/surah');
                    const data = await response.json();
                    setQuranData(data.data);
                } else if (activeTab === 'juz') {
                    // Create Juz data (30 parts)
                    const juzArray = Array.from({ length: 30 }, (_, i) => ({
                        number: i + 1,
                        name: `الجزء ${i + 1}`,
                        startSurah: "البقرة", // You would need to add actual start surah names
                        verses: "25-45" // You would need to add actual verse ranges
                    }));
                    setJuzData(juzArray);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        setCurrentPage(1); // Reset page when changing tabs
    }, [activeTab]);

    // Get current data based on active tab
    const getCurrentData = () => {
        if (activeTab === 'surah') {
            return quranData.filter(item =>
                item.name.includes(searchQuery) ||
                item.englishName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else if (activeTab === 'juz') {
            return juzData.filter(item =>
                item.name.includes(searchQuery)
            );
        }
        return [];
    };

    const filteredData = getCurrentData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Simplified page change handler without scroll
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // // Generate page numbers for pagination
    // const getPageNumbers = () => {
    //     const pageNumbers = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         if (
    //             i === 1 ||
    //             i === totalPages ||
    //             (i >= currentPage - 1 && i <= currentPage + 1)
    //         ) {
    //             pageNumbers.push(i);
    //         } else if (i === currentPage - 2 || i === currentPage + 2) {
    //             pageNumbers.push('...');
    //         }
    //     }
    //     return pageNumbers.filter((item, index, arr) => arr.indexOf(item) === index);
    // };

    const renderContent = () => {
        if (activeTab === 'quran') {
            return <QuranView />;
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((item) => (
                    <div
                        key={item.number}
                        className="bg-[#004B40] rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                        onClick={() => {
                            if (activeTab === 'surah') {
                                navigate(`/quran/${item.number}`);
                            }
                        }}
                    >
                        <div className="absolute top-0 -right-7">
                            <img
                                src="/assets/img/Vector2.png"
                                alt=""
                                className="w-24 h-32 object-contain "
                            />
                        </div>
                        <div className="absolute top-0 -left-7 transform rotate-180">
                            <img
                                src="/assets/img/Vector2.png"
                                alt=""
                                className="w-24 h-32 object-contain "
                            />
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-[#F3D69C] text-xl font-amiri mb-2">
                                {item.name}
                            </h3>
                            <div className=" text-[#FFFFFF] font-tajawal text-sm">
                                {activeTab === 'surah' ? (
                                    <>عدد الآيات: <span className='text-[#F5CD87]'>{item.numberOfAyahs}</span></>
                                ) : (
                                    <>السور: <span className='text-[#F5CD87]'>{item.startSurah}</span></>
                                )}
                            </div>
                            <div className="text-[#F5CD87] font-tajawal text-sm">
                                {activeTab === 'surah' ? 'مكية' : item.verses}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="bg-white py-12 px-4" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-amiri font-bold text-[#004B40] flex items-center gap-2">
                        <img src="/assets/svg/Star 8.svg" alt="" className="w-6 h-6" />
                        تصفح القرآن الكريم :

                    </h2>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8 max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 right-10 flex items-center pr-4">

                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />

                    </div>
                    <div className="absolute inset-y-0 -right-4 flex items-center pr-4 ">

                        <img src="/assets/img/Shape-04 14.png" alt="" className="w-8 h-12   " />

                    </div>
                    <div className="absolute inset-y-0 left-0 flex items-center pr-4 ">

                        <img src="/assets/img/Shape-04 13.png" alt="" className="w-8 h-12   " />

                    </div>

                    <input
                        type="text"
                        placeholder="البحث عن اسم السورة أو الآية"
                        className="w-full p-4 pr-20 rounded-2xl border-2 border-[#004B40]/20 focus:border-[#004B40] outline-none font-tajawal"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8 font-tajawal justify-start">
                    {['السور', 'الأجزاء', 'قرآني'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab === 'السور' ? 'surah' : tab === 'الأجزاء' ? 'juz' : 'quran')}
                            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${(tab === 'السور' && activeTab === 'surah') ||
                                (tab === 'الأجزاء' && activeTab === 'juz') ||
                                (tab === 'قرآني' && activeTab === 'quran')
                                ? 'bg-[#004B40] text-white '
                                : 'bg-gray-100 text-[#004B40] hover:bg-gray-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {renderContent()}

                {/* Arrow Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-full transition-all duration-200 
                                ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#004B40] text-white hover:bg-[#003830]'
                                }`}
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>

                        <span className="font-tajawal text-[#004B40]">
                            صفحة {currentPage} من {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-full transition-all duration-200 
                                ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#004B40] text-white hover:bg-[#003830]'
                                }`}
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Browse;