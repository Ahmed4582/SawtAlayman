import React from 'react';
import { Link } from 'react-router-dom';

const LatestAdditions = () => {
    const additions = [
        {
            title: 'أذكار بعد الصلاة',
            subtitle: 'مجموعة من الأذكار المأثورة',
            icon: '/assets/svg/athkar.svg',
            path: '/services/athkar/after-prayer'
        },
        {
            title: 'مديح نبوي',
            subtitle: 'نفحات إيمانية',
            icon: '/assets/svg/anasheed.svg',
            path: '/services/anasheed/madih'
        },
        {
            title: 'مناجاة التائبين',
            subtitle: 'ابتهالات قلبية',
            icon: '/assets/svg/munajah.svg',
            path: '/services/munajah/taebin'
        }
    ];

    return (
        <section className="py-16 bg-white relative" dir="rtl"
        >
            {/* Title Section */}
            <div className="text-center mb-12" >
                <div className="relative inline-block">
                    <h2 className="text-6xl font-bold font-amiri text-[#004B40]">
                        أحدث الإضافات
                        <span className="absolute -left-6 top-0">
                            <svg className="w-4 h-4 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </span>
                    </h2>
                    <img className='mt-2' src='/assets/img/5.png' />
                </div>
            </div>
            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"


                >
                    {additions.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="block rounded-[32px] overflow-hidden"
                        >
                            <div className="relative bg-[#004840]  h-[160px] p-7"
                                style={{
                                    backgroundImage: "url('/assets/svg/star.svg')",
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    borderRadius: '32px',
                                }}>
                                {/* Background Pattern */}
                                <div className="absolute left-0 opacity-50">
                                    <img src='/public/assets/img/Vector (2).png' />
                                </div>
                                {/* Content */}
                                <div className="relative flex items-center gap-4">
                                    {/* Circle Icon */}
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        <img src={item.icon} alt="" className="w-12 h-12" />
                                    </div>
                                    {/* Text */}
                                    <div>
                                        <h3 className="text-4xl font-amiri font-bold text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/80 font-tajawal text-sm">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Decorative Side Images */}
            <div className="absolute -left-16 top-0 h-1/2 w-96 hidden lg:block">
                <div
                    className="h-full w-full bg-no-repeat bg-left bg-contain"
                    style={{ backgroundImage: "url('/assets/img/left-footer.png')" }}
                />
            </div>
            <div className="absolute -right-16 top-0 h-1/2 w-96 hidden lg:block">
                <div
                    className="h-full w-full bg-no-repeat bg-right bg-contain"
                    style={{ backgroundImage: "url('/assets/img/right-footer.png')" }}
                />
            </div>
            {/* Bottom Islamic Pattern Border */}
            <div className="w-full my-16 h-12 bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/assets/img/islamic-pattern.png')",
                    backgroundSize: 'cover',
                }}
            />

        </section>
    );
};

export default LatestAdditions;