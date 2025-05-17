import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            title: 'القرآن الكريم',
            icon: "quran",
            description: 'تلاوات يومية بصوت   ',
            description2: 'الشيخ محمد برنيه',
            path: '/services/quran',
            image: '/assets/img/quran.png',
            pattern: 'islamic-pattern-green.png'
        },
        {
            title: 'أذكار ودعاء',
            icon: "athkar",
            description: '  أذكار يومية وأدعية  ',
            description2: '   مأثورة من القرآن الكريم',
            path: '/services/athkar',
            image: '/assets/img/athkar.png',
            pattern: 'islamic-pattern-green.png'
        },
        {
            title: 'مناجاة',
            icon: "munajah",
            description: 'مناجاة روحانية  ',
            description2: '  و تضرعات قلبية   ',
            path: '/services/munajah',
            image: '/assets/img/munajah.png',
            pattern: 'islamic-pattern-green.png'
        },
        {
            title: 'أناشيد إسلامية',
            icon: "anasheed",
            description: 'الأناشيد بصوت   ',
            description2: 'الشيخ محمد برنيه',
            path: '/services/anasheed',
            image: '/assets/img/anasheed.png',
            pattern: 'islamic-pattern-gold.png'
        }
    ];

    return (
        <section className="bg-white relative " dir="rtl">
            {/* Title with decorative elements */}
            <div className="text-center mb-12">
                <div className="relative inline-block">
                    <h2 className="text-5xl font-amiri font-bold text-[#004B40]">خدماتنا</h2>
                    <img className='mt-2' src='/assets/img/5.png' />
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            to={service.path}
                            className="group block rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Left Half - Image */}
                                <div className="w-full md:w-1/2 bg-[#004B40] relative"
                                    style={{
                                        backgroundImage: "url('/assets/svg/star.svg')",
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        {/* Circle Icon */}
                                        <div className="flex justify-center mb-4"
                                        >
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center">
                                                <img
                                                    src={`/assets/svg/${service.icon}.svg`}
                                                    alt="" w
                                                    className="w-16 h-16"
                                                />
                                            </div>
                                        </div>

                                        {/* Text Content */}
                                        <div className="text-center mb-10 "
                                        >
                                            <h3 className="text-3xl mb-3 font-bold text-[#FFFFFF] font-amiri">
                                                {service.title}
                                            </h3>
                                            <p className="text-[#FFFFFF] font-tajawal text-md leading-relaxed">
                                                {service.description}
                                            </p>
                                            <p className="text-[#FFFFFF] text-md font-tajawal leading-relaxed">
                                                {service.description2}
                                            </p>
                                        </div>

                                        {/* Bottom Pattern */}
                                        <div className="absolute bottom-0 left-0 right-0">
                                            <div className="w-full mt-16 h-12 bg-no-repeat bg-cover"
                                                style={{
                                                    backgroundImage: "url('/assets/img/islamic-pattern.png')",
                                                    backgroundSize: 'cover',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>


                                {/* Right Half - Content */}
                                <div className="w-full md:w-1/2 relative">
                                    <div className="aspect-square">
                                        <img
                                            src={service.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-[#004840]/40"></div>
                                    </div>

                                    {/* Bottom Pattern */}
                                    <div className="absolute bottom-0 left-0 right-0">
                                        <div className="w-full mt-16 h-12 bg-no-repeat bg-cover"
                                            style={{
                                                backgroundImage: "url('/assets/img/islamic-pattern.png')",
                                                backgroundSize: 'cover',
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>


                        </Link>

                    ))}

                </div>
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

export default Services;