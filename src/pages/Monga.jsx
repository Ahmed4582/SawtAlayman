import { useState } from 'react';

const Monga = () => {
    const [showMessage, setShowMessage] = useState(false);

    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };

    const messages = [
        {
            title: 'مناجاة المؤمنين',
            text: `يا مَنْ لَيْسَ لِقَضائِهِ دافِعٌ،
            وَلا لِعَطائِهِ مانِعٌ، وَلا كَصُنْعِهِ صُنْعُ صانِع،
            هُوَ الْجَوادُ الْواسِعُ، فَطَرَ أَجْناسَ الْبَدايعِ،
            وَأتْقَنَ بِحِكْمَتِهِ الصَّنايِعَ...`
        },
        {
            title: 'مناجاة الشاكين',
            text: `إلهي إلَيْكَ أشْكُو نَفْساً بِالسُّوءِ أمّارَةً،
            وَإلَى الْخَطيئَةِ مُبادِرَةً، وَبِمَعاصيكَ مُولَعَةً...`
        },
        {
            title: 'مناجاة الخائفين',
            text: `يا ذا العَيْنَيْنِ،
            يا مَنْ يَرى مِنْ وَراءِ الْجُدْرانِ،
            يا مَنْ يَعْلَمُ خائِنَةَ الأعْيُنِ...`
        },
        {
            title: 'مناجاة الراجين',
            text: `يا رَبَّ الْعالَمينَ،
            يا مَنْ لا يَخْفى عَلَيْهِ حالُ الْمَساكينِ،
            يا أرْحَمَ الرّاحِمينَ...`
        }
    ];

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="relative">
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                        <img
                            src="/assets/img/monga-header.jpg"
                            alt="مناجاة"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-white z-20 text-right">
                            <h1 className="text-3xl md:text-4xl font-amiri mb-4">مناجاة</h1>
                            <p className="text-sm md:text-base font-tajawal leading-relaxed max-w-md">
                                هنا تنبع روح المناجاة - حيث يتجلى الشوق وحلاوة الروح في رحلتها النقية على طريق معرفته. تأملات تكشف البصر وترتقي به من قيد
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Toggle Section */}
            <div className="max-w-4xl mx-auto mb-8">
                <button
                    onClick={toggleMessage}
                    className="bg-[#004B40] text-white px-6 py-2 rounded-full font-tajawal"
                >
                    تصفح واستمع
                </button>
            </div>

            {/* Messages Grid */}
            {showMessage && (
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {messages.map((message, index) => (
                        <div key={index} className="relative">
                            {/* Card Background */}
                            <div className="bg-[#004B40] text-white rounded-lg p-6">
                                {/* Corner Decorations */}
                                <img
                                    src="/assets/patterns/top-right-corner.png"
                                    alt=""
                                    className="absolute top-0 right-0 w-16"
                                />
                                <img
                                    src="/assets/patterns/top-left-corner.png"
                                    alt=""
                                    className="absolute top-0 left-0 w-16"
                                />

                                {/* Title */}
                                <h3 className="text-center font-amiri text-xl mb-6 relative">
                                    {message.title}
                                </h3>

                                {/* Text Content */}
                                <div className="text-right font-amiri leading-8 space-y-4 mb-8">
                                    {message.text.split('\n').map((line, i) => (
                                        <p key={i} className="text-base">{line.trim()}</p>
                                    ))}
                                </div>

                                {/* Bottom Pattern */}
                                <img
                                    src="/assets/patterns/bottom-border.png"
                                    alt=""
                                    className="absolute bottom-0 left-0 w-full opacity-30"
                                />
                            </div>

                            {/* Controls Bar */}
                            <div className="flex justify-center gap-8 mt-4">
                                <button className="hover:opacity-75 transition-opacity">
                                    <img src="/assets/icons/share.svg" alt="share" className="w-5 h-5" />
                                </button>
                                <button className="hover:opacity-75 transition-opacity">
                                    <img src="/assets/icons/play.svg" alt="play" className="w-5 h-5" />
                                </button>
                                <button className="hover:opacity-75 transition-opacity">
                                    <img src="/assets/icons/heart.svg" alt="favorite" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Monga;