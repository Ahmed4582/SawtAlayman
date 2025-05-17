import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Quation = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "كيف يمكنني الإبلاغ عن مشكلة فنية في الموقع؟",
            answer: "يمكنك الإبلاغ عن أي مشكلة فنية عبر تعبئة نموذج التواصل مع اختيار نوع في 'موضوع الرسالة أو عبر إرسال بريد إلكتروني إلى support@qalat-rimaha.com مع وصف تفاصيل المشكلة والأسئلة المحددة التي تواجه هذه المشكلة."
        },
        {
            question: "هل يمكنني طلب إضافة مقطع صوتي معين للقارئ محمد برنيه؟",
            answer: "نعم، يمكنك طلب إضافة مقاطع صوتية محددة عبر نموذج التواصل وسنقوم بدراسة الطلب."
        },
        {
            question: "ما هي أوقات الدعم الفني المتاحة؟",
            answer: "خدمة الدعم الفني متاحة من الأحد إلى الخميس، من الساعة 9 صباحاً حتى 5 مساءً بتوقيت السعودية."
        },
        {
            question: "هل يمكنني استخدام مواد الموقع في مشروعي الشخصي؟",
            answer: "يجب الحصول على إذن مسبق لاستخدام أي مواد من الموقع في المشاريع الشخصية. يرجى التواصل معنا للحصول على التفاصيل."
        },
        {
            question: "كيف يمكنني دعم الموقع؟",
            answer: "يمكنك دعم الموقع من خلال المشاركة في نشر المحتوى، أو التبرع، أو المساهمة في تحسين المحتوى."
        }
    ];

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-16 px-4" dir="rtl">
            <div className="max-w-4xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-20" >
                    <div className="relative inline-block">
                        <h2 className="text-6xl font-bold font-amiri text-[#004B40]">
                            أسئلة شائعة
                            <span className="absolute -left-6 top-0">
                                <svg className="w-4 h-4 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </span>
                        </h2>
                        <img className='mt-2' src='/assets/img/5.png' />
                    </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="border-2 border-[#004B40] rounded-2xl overflow-hidden bg-white"
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="text-lg font-tajawal text-[#004B40] font-medium">
                                    {item.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUpIcon className="w-6 h-6 text-[#004B40]" />
                                ) : (
                                    <ChevronDownIcon className="w-6 h-6 text-[#004B40]" />
                                )}
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out
                                ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-600 font-tajawal leading-relaxed ">
                                    {item.answer}
                                </div>
                            </div>

                            {/* Decorative Corners */}

                            <div className="absolute top-0 left-0 transform scale-x-[-1]">
                                <img
                                    src="/public/assets/img/Shape-04 15.png"
                                    alt=""
                                    className="w-12 h-12 object-contain opacity-50"
                                />
                            </div>
                            <div className="absolute top-0 right-0 transform ">
                                <img
                                    src="/public/assets/img/Shape-04 15.png"
                                    alt=""
                                    className="w-12 h-12 object-contain opacity-50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Quation;