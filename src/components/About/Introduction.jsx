import React from 'react';

const Introduction = () => {
    const bioPoints = [
        {
            text: 'القارئ محمد برنيه هو إمام مسجد ومقرئ للقرآن الكريم من أصل سوري، ولد في دمشق عام 1974م. اشتهر بصوته العذب وأدائه المتميز للقرآن الكريم، حيث يتميز بتلاوته المتقنة لأحكام التجويد مع العناية الفائقة بتحسين الصوت.',
            highlight: 'محمد برنيه'
        },
        {
            text: 'بدأ محمد برنيه حفظ القرآن الكريم في سن مبكر، وأتم حفظه كاملاً وهو في الثانية عشرة من عمره. تتلمذ على يد عدد من أشهر مشايخ القراءات في سوريا، وحصل على إجازة في رواية حفص عن عاصم.',
            highlight: 'محمد برنيه'
        },
        {
            text: 'يشغل حالياً منصب إمام وخطيب في أحد المساجد الكبرى في الرياض بالمملكة العربية السعودية. كما يقدم دروساً في التجويد وعلوم القرآن، وله العديد من التسجيلات القرآنية التي لاقت استحساناً واسعاً في العالم الإسلامي.'
        }
    ];
    const timelineEvents = [
        {
            year: '١٩٧٤',
            title: 'الميلاد ★',
            description: 'ولد في دمشق، سوريا، ونشأ \nفي أسرة محبة للقرآن الكريم.'
        },
        {
            year: '١٩٨٦',
            title: 'حفظ القرآن الكريم ★',
            description: 'أتم حفظ القرآن الكريم كاملاً في\n الثانية عشرة من عمره في دمشق.'
        },
        {
            year: '١٩٩٢',
            title: 'الإجازة في القراءات ★',
            description: 'حصل على إجازة في رواية حفص عن\n عاصم من الشيخ عبد الرزاق الحلبي.'
        },
        {
            year: '١٩٩٨',
            title: 'الهجرة إلى السعودية ★',
            description: 'انتقل إلى المملكة العربية السعودية\n وعين إماماً لمسجد في الرياض.'
        },
        {
            year: '٢٠٠٥',
            title: 'أول مصحف مرتل ★',
            description: 'أصدر أول مصحف مرتل بصوته من\n إنتاج شركة "تلاوات نور".'
        },
        {
            year: '٢٠١٢',
            title: 'تأسيس مركز تعليمي ★',
            description: 'أسس "مركز برنيه لتعليم القرآن الكريم/n" في الرياض.'
        }
    ];
    const worksData = [
        {
            title: "المصحف المرتل",
            description: "تسجيل كامل للمصحف الشريف برواية حفص عن عاصم، تميز بالأداء المتقن وأحكام التجويد.",

        },
        {
            title: "تسجيلات الأذكار",
            description: "مجموعة من الأذكار اليومية والأدعية المأثورة بصوته العذب، تساعد على الخشوع والتدبر.",

        },
        {
            title: "دروس التجويد",
            description: "سلسلة دروس صوتية ومرئية لتعليم أحكام التجويد للمبتدئين والمتقدمين.",

        },
        {
            title: "الدورات التعليمية",
            description: "دورات مكثفة في حفظ القرآن وتعليم القراءات، يقدمها في مركزه بالرياض.",

        }
    ];
    const achievementsData = [
        {
            title: "+ ٣٠",
            description: "سنة من العطاء",

        },
        {
            title: "٥",
            description: "مصاحف مرتلة",

        },
        {
            title: "+١٠٠٠",
            description: "تسجيل للأذكار والتلاوات",
        },
        {
            title: "+٢ مليون",
            description: "مستمع حول العالم",
        }
    ];
    const testimonialsData = [
        {
            quote: "القارئ محمد برنيه من القراء المتميزين في هذا العصر يجمع بين إتقان أحكام التجويد وحسن الصوت، وقد استفاد منه الكثيرون في تعلم القرآن وتجويده",
            author: "د. عبد الله المصلح",
            title: "الداعية الإسلامي"
        },
        // Add more testimonials as needed
    ];
    return (
        <section className="bg-white mb-16 relative" dir="rtl">
            <div className="max-w-6xl mx-auto  px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="flex items-center gap-2 mb-12">
                    <img src='/assets/svg/Star 8.svg' />
                    <h2 className="lg:text-5xl text-3xl font-amiri font-bold text-[#004B40]">
                        نبذة تعريفية :
                    </h2>
                </div>

                {/* Biography Points */}
                <div className="space-y-6 text-[#000000] font-semibold font-tajawal ">
                    {bioPoints.map((point, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 leading-relaxed text-lg"
                        >
                            <span className="text-[#F3D69C] mt-2">●</span>
                            <p className="text-justify">
                                {point.highlight ? (
                                    <>
                                        {point.text.split(point.highlight).map((part, i, arr) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < arr.length - 1 && (
                                                    <span className="text-[#F3D69C]">
                                                        {point.highlight}
                                                    </span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </>
                                ) : (
                                    point.text
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Timeline Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
                {/* Timeline Container */}
                <div className="relative">
                    {/* Center Line - Only visible on large screens */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-[#004840] hidden lg:block" />
                    {/* Timeline Cards */}
                    <div className="space-y-6 lg:space-y-12">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="relative">
                                {/* Card Container with Arrow - Flex only on large screens */}
                                <div className={`block lg:flex ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} relative`}>
                                    {/* Arrow - Only visible on large screens */}
                                    <div className={`absolute top-1/4 -translate-y-1/2 hidden lg:block
                                        ${index % 2 !== 0 ? 'right-[35rem] w-0 h-0 border-t-[15px] border-b-[15px] border-l-[15px] border-t-transparent border-b-transparent border-l-[#014D43] absolute' : 'left-[35rem] w-0 h-0 border-t-[15px] border-b-[15px] border-r-[15px] border-t-transparent border-b-transparent border-r-[#014D43] absolute'} z-10`}>
                                        <div className={`${index % 2 !== 0 ? 'clip-arrow-right' : 'clip-arrow-left'}`} />
                                    </div>
                                    {/* Card - Full width on mobile, half width on desktop */}
                                    <div className={`w-full lg:w-[calc(50%-2rem)] bg-[#004840] rounded-[24px] relative overflow-hidden`}>
                                        {/* Rest of your existing card content remains exactly the same */}
                                        <div className="p-6">
                                            {/* Title and Description */}
                                            <div className=" space-y-2 mb-5">
                                                {/* Year */}
                                                <div className=" text-[#F3D69C] text-lg font-normal font-tajawal flex items-center gap-2">
                                                    <img src="/assets/svg/clander.svg" className="w-4 h-4 inline-block mr-2" />
                                                    {event.year} ھ
                                                </div>
                                                <h3 className="text-[#F5CD87] text-xl font-bold font-tajawal flex items-center gap-2">
                                                    {event.title}
                                                </h3>
                                                <p className="text-white whitespace-pre-line  text-base leading-relaxed font-tajawal font-medium">
                                                    {event.description}
                                                </p>
                                            </div>
                                            {/* Islamic Pattern Corners */}
                                            <div className="absolute bottom-10 -left-6">
                                                <img
                                                    src="/assets/img/Shape-04 15.png"
                                                    alt=""
                                                    className="w-24 h-24 object-contain opacity-60"
                                                />
                                            </div>
                                            {/* Islamic Pattern Corners */}
                                            <div className="absolute -top-6 left-16 ">
                                                <img
                                                    src="/assets/img/Shape-04 16.png"
                                                    alt=""
                                                    className="w-24 h-24 object-contain opacity-60"
                                                />
                                            </div>
                                            {/* Bottom Border Pattern */}
                                            <div className="absolute bottom-0  left-0 right-0">
                                                <img
                                                    src="/assets/img/top-footer.png"
                                                    alt=""
                                                    className="w-full h-8 object-cover opacity-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Works Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                {/* Title */}
                <div className="flex items-center gap-2 mb-12">
                    <img src='/assets/svg/Star 8.svg' alt="star" />
                    <h2 className="lg:text-5xl text-3xl font-amiri font-bold text-[#004B40]">
                        أعماله وإنجازاته :
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {worksData.map((work, index) => (
                        <div key={index}
                            className="bg-[#004840] rounded-[24px] p-10 relative overflow-hidden group 
                            hover:scale-105 transition-transform duration-300 min-h-[200px]"
                        >
                            {/* Top Decorative Flowers */}
                            <div className="absolute -top-12 -right-10">
                                <img
                                    src="/assets/img/Shape-04 16.png"
                                    alt=""
                                    className="w-32 h-32 object-contain opacity-50"
                                />
                            </div>
                            <div className="absolute -top-12 -left-6">
                                <img
                                    src="/assets/img/Shape-04 16.png"
                                    alt=""
                                    className="w-32 h-32 object-contain opacity-50 transform scale-x-[-1]"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full ">
                                {/* Title with Star */}
                                <h3 className="text-[#F3D69C] text-xl font-bold font-tajawal mb-4 flex items-center gap-2 
                                    justify-center text-center">
                                    <span className="text-sm text-[#F3D69C]">★</span>
                                    {work.title}
                                    <span className="text-sm text-[#F3D69C]">★</span>
                                </h3>

                                {/* Description */}
                                <p className="text-white text-base leading-relaxed font-tajawal font-medium 
                                    text-center mt-2">
                                    {work.description}
                                </p>
                            </div>

                            {/* Bottom Border Pattern */}
                            <div className="absolute bottom-0 left-0 right-0">
                                <img
                                    src="/assets/img/top-footer.png"
                                    alt=""
                                    className="w-full h-8 object-cover opacity-50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Achievements Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                {/* Title */}
                <div className="flex items-center gap-2 mb-12">
                    <img src='/assets/svg/Star 8.svg' alt="star" />
                    <h2 className="lg:text-5xl text-3xl font-amiri font-bold text-[#004B40]">
                        إنجازاته في الأرقام :                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievementsData.map((work, index) => (
                        <div key={index}
                            className="bg-[#004840] rounded-[24px] p-10 relative overflow-hidden group 
                            hover:scale-105 transition-transform duration-300 min-h-[200px]"
                        >
                            {/* Top Decorative Flowers */}
                            <div className="absolute -top-12 -right-10">
                                <img
                                    src="/assets/img/Shape-04 16.png"
                                    alt=""
                                    className="w-32 h-32 object-contain opacity-50"
                                />
                            </div>
                            <div className="absolute -top-12 -left-6">
                                <img
                                    src="/assets/img/Shape-04 16.png"
                                    alt=""
                                    className="w-32 h-32 object-contain opacity-50 transform scale-x-[-1]"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full ">
                                {/* Title with Star */}
                                <h3 className="text-[#F3D69C] text-3xl font-bold font-tajawal mb-4 flex items-center gap-2 
                                    justify-center text-center">
                                    {work.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white text-base leading-relaxed font-tajawal font-medium 
                                    text-center mt-2">
                                    {work.description}
                                </p>
                            </div>

                            {/* Bottom Border Pattern */}
                            <div className="absolute bottom-0 left-0 right-0">
                                <img
                                    src="/assets/img/top-footer.png"
                                    alt=""
                                    className="w-full h-8 object-cover opacity-50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* About Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                {/* Title */}
                <div className="flex items-center gap-2 mb-12">
                    <img src='/assets/svg/Star 8.svg' alt="star" />
                    <h2 className="lg:text-5xl text-3xl font-amiri font-bold text-[#004B40]">
                        كلمات عن القارئ :
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index}
                            className="bg-[#004840] rounded-[24px] p-20 relative overflow-hidden group 
                            hover:scale-105 transition-transform duration-300"
                        >
                            {/* Top Corner Patterns */}
                            <div className="absolute top-0 -right-8">
                                <img
                                    src="/assets/img/islamic-corner.png"
                                    alt=""
                                    className="w-32 h-64  object-contain opacity-50"
                                />
                            </div>
                            <div className="absolute top-0 -left-7 transform scale-x-[-1]">
                                <img
                                    src="/assets/img/islamic-corner.png"
                                    alt=""
                                    className="w-32 h-64  object-contain opacity-50"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 space-y-6">
                                {/* Quote */}
                                <blockquote className="text-white text-lg font-tajawal leading-relaxed text-center">
                                    "{testimonial.quote}"
                                </blockquote>

                                {/* Author */}
                                <div className="text-center">
                                    <h4 className="text-[#F3D69C] text-xl font-bold font-tajawal">
                                        {testimonial.author}
                                    </h4>
                                    <p className="text-white text-sm font-tajawal mt-1">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Border Pattern */}
                            <div className="absolute bottom-1 left-0 right-0">
                                <img
                                    src="/assets/img/top-footer.png"
                                    alt=""
                                    className="w-full h-8 object-cover opacity-50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Introduction;