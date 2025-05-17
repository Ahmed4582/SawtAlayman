import { useState } from 'react';

const Anached = () => {
    const [selectedCategory, setSelectedCategory] = useState('الجديدة');
    const [isPlaying, setIsPlaying] = useState({});

    const categories = [
        { id: 'new', name: 'الجديدة' },
        { id: 'popular', name: 'الأكثر' },
        { id: 'random', name: 'عشوائي' }
    ];

    const songs = [
        {
            id: 1,
            title: 'يا رب رضاك',
            artist: 'مشاري العفاسي',
            duration: '4:30',
            image: '/assets/img/nasheed1.jpg',
            audio: '/assets/audio/nasheed1.mp3'
        },
        // Add more songs as needed
    ];

    const togglePlay = (songId) => {
        setIsPlaying(prev => ({
            ...prev,
            [songId]: !prev[songId]
        }));
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="relative">
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                        <img
                            src="/assets/img/islamic-header.jpg"
                            alt="أناشيد إسلامية"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-white z-20 text-right">
                            <h1 className="text-3xl md:text-4xl font-amiri mb-4">أناشيد إسلامية</h1>
                            <p className="text-sm md:text-base font-tajawal leading-relaxed max-w-md">
                                في هذا المكان، روح كلمات تلهب الحنين والإيمان نبضاً نقياً للقلب فتناديه، لتُرى كيف يشدوك الذكر حتى تكن من الذاكرين
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex justify-center gap-4">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-6 py-2 rounded-full font-tajawal transition-colors
                                ${selectedCategory === category.name
                                    ? 'bg-[#004B40] text-white'
                                    : 'bg-white text-[#004B40] hover:bg-[#004B40] hover:text-white'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Songs Grid */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {songs.map(song => (
                    <div key={song.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <div className="relative aspect-video">
                            <img
                                src={song.image}
                                alt={song.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => togglePlay(song.id)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                            >
                                {isPlaying[song.id] ? (
                                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" />
                                        <rect x="14" y="4" width="4" height="16" />
                                    </svg>
                                ) : (
                                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="font-amiri text-xl text-right mb-2">{song.title}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">{song.duration}</span>
                                <span className="font-tajawal text-[#004B40]">{song.artist}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Anached;