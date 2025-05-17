import React from 'react';

const HeroSec = () => {
    return (
        <section className="relative bg-white py-16 px-4" dir="rtl">


            {/* Content Container */}
            <div className="max-w-4xl mx-auto text-center space-y-8">
                {/* Title with decorative elements */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <h2 className="text-5xl font-amiri font-bold text-[#004B40]">تواصل معنا
                            <span className="absolute left-5 top-0">
                                <svg className="w-4 h-4 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </span></h2>
                        <img className='mt-2' src='/assets/img/5.png' alt="decorative line" />
                    </div>
                </div>

                {/* Description */}
                <p className="text-2xl text-black font-tajawal leading-relaxed max-w-2xl font-medium mx-auto mt-12">
                    نحن هنا لمساعدتك! يمكنك التواصل معنا عبر القنوات التالية أو تعبئة النموذج وسنرد عليك في أقرب وقت ممكن.
                </p>
            </div>

            {/* Decorative Pattern Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform rotate-180">
                <img
                    src="/assets/patterns/top-pattern.png"
                    alt=""
                    className="w-48 h-auto object-contain opacity-20"
                />
            </div>
        </section>
    );
};

export default HeroSec;