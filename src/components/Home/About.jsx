import React from 'react';

const About = () => {
    return (
        <section className="bg-white relative pb-16" dir="rtl">
            {/* Title with decorative elements */}
            <div className="text-center mb-12">
                <div className="relative inline-block">
                    <h2 className="text-5xl font-amiri font-bold text-[#004B40]">عن منصّتنا
                        <span className="absolute -left-6 top-0">
                            <svg className="w-4 h-4 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </span></h2>
                    <img className='mt-2' src='/assets/img/5.png' alt="decorative line" />
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
            {/* About Card */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-[48px] bg-[#004840] p-12 overflow-hidden">
                    {/* Content */}
                    <div className="relative space-y-8 text-center font-tajawal">
                        <p className="text-lg text-white leading-10 font-tajawal font-normal">
                            <span className="text-[#F3D69C] ml-2">●</span>
                            موقع صوت الايمان هو منصة إلكترونية تهدف إلى نشر
                            <br />
                            الخير والمعرفة الإسلامية من خلال توفير تلاوات القرآن
                            <br />
                            الكريم ، الأذكار اليومية ، الأدعية المأثورة ،المناجاة والأناشيد
                            <br />
                            الإسلامية بصوت القارىء المتميز "محمد برنيه" .
                        </p>

                        <p className="text-lg text-white leading-10 font-tajawal font-normal">
                            <span className="text-[#F3D69C] ml-2">●</span>
                            نسعى جاهدين لتقديم محتوى هادف بجودة عالية مع
                            <br />
                            الحرص على سهولة الاستخدام ووضوح المحتوى
                        </p>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 -right-5 w-24 h-full  transform scale-x-[-1]">
                        <img
                            src="/assets/img/corner-decoration.png"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="absolute top-0 -left-5 w-24 h-full  transform scale-x-[-1]">
                        <img
                            src="/assets/img/corner-decoration2.png"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>


        </section>
    );
};

export default About;