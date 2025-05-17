import React from 'react';

const HeroSec = () => {
    return (
        <section className="relative pb-20 bg-white" dir="rtl">
            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-right space-y-6">
                        <h1 className="text-4xl font-amiri lg:text-6xl mb-10 font-bold text-[#04261B]">
                            القرآن الكريم                            <span className="inline-block">
                                <svg className="w-3 h-3 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl font-tajawal   lg:text-4xl text-[#04261B] leading-10">
                            "كلام الله نور يضيء القلوب، وهدى ينير
                            <br />
                            الدروب، تلاوة تجلو الحزن، وتذكي الإيمان
                            <br />
                            في الصدور. هنا تسمو روحك مع كلمات
                            <br />
                            الرحمن، وتستشعر الطمأنينة في ظل آيات القرآن العظيم."
                        </p>

                    </div>

                    {/* Mosque Image with Hexagonal Mask */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative w-full aspect-[3/4] max-w-lg mx-auto">
                            <div className="absolute inset-0">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <clipPath id="hexagonalMask">
                                            <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('/assets/img/photo.png')",

                                }}
                            />
                            {/* Small Star Decoration */}
                            <div className="absolute top-10 right-0">
                                <svg className="w-6 h-6 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Islamic Pattern Border */}
            <div className="w-full h-12 bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/assets/img/islamic-pattern.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}
            />
        </section>
    );
};

export default HeroSec;