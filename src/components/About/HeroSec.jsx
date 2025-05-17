import React from 'react';

const HeroSec = () => {
    return (
        <section className="relative bg-white py-16 overflow-hidden" dir="rtl">


            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-right">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <h1 className="text-4xl lg:text-7xl font-bold font-amiri text-[#004B40]">
                                    القارىء محمد برنيه
                                </h1>
                                <span className="text-[#F3D69C]">★</span>
                            </div>

                            <div className="space-y-2 text-3xl font-normal text-[#000000] font-tajawal">
                                <p>صوت إسلامي عذب، وإمام</p>
                                <p>مسجد ومقرئ للقرآن الكريم</p>
                                <p>من أصل سوري .</p>
                            </div>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden ">
                                <img
                                    src="/assets/img/sheikh-photo.png"
                                    alt="الشيخ محمد برنيه"
                                    className="w-full object-cover"
                                />
                            </div>
                            {/* Image Border Decoration */}
                            <div className="absolute -bottom-3 -right-3 w-full h-full border-4 border-[#F3D69C]/20 rounded-3xl -z-10"></div>
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