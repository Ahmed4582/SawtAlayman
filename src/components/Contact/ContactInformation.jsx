import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactInformation = () => {
    const contactInfo = [
        {
            name: "عنوان المركز",
            icon: "/assets/svg/location.svg",
            text: "الرياض - حي الملقا شارع انس بن مالك",
            type: "address"
        },
        {
            name: "رقم الهاتف",
            icon: "/assets/svg/phone.svg",
            text: "٩٦٦٥٥٨٧٨",
            type: "phone"
        },
        {
            name: "البريد الإلكتروني",
            icon: "/assets/svg/email.svg",
            text: "info@bernieh-quran.com",
            type: "email"
        },


    ];

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error', error.message);
        }
        setIsSubmitting(false);
    };

    return (
        <section className="bg-white py-16 px-4" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-20" >
                    <div className="relative inline-block">
                        <h2 className="text-6xl font-bold font-amiri text-[#004B40]">
                            معلومات التواصل
                            <span className="absolute -left-6 top-0">
                                <svg className="w-4 h-4 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </span>
                        </h2>
                        <img className='mt-2' src='/assets/img/5.png' />
                    </div>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20 ">
                    {contactInfo.map((info, index) => (
                        <div key={index}
                            className="bg-[#004B40] rounded-2xl p-4 flex items-center justify-center gap-4
                            hover:scale-105 transition-transform duration-300"
                        >
                            <div>
                                <img src={info.icon} alt="" className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-amiri text-white mb-2">{info.name}</h2>
                                <span className="text-white font-tajawal">{info.text}</span>

                            </div>


                        </div>
                    ))}
                </div>

                {/* Contact Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 items-center rounded-2xl border-2 border-[#004B40]  my-20">
                    {/* Form */}
                    <div className=" p-6 rounded-2xl ">
                        <h3 className="text-2xl font-amiri font-bold text-[#004B40] mb-8 flex items-center gap-2">
                            <img src="/assets/svg/star.svg" alt="" className="w-5 h-5" />
                            أرسل رسالة
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-[#004B40] font-tajawal mb-2">
                                    الاسم الكامل
                                </label>
                                <input
                                    type="text"
                                    {...register("fullName", { required: "الاسم الكامل مطلوب" })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B40] outline-none"
                                />
                                {errors.fullName && (
                                    <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[#004B40] font-tajawal mb-2">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "البريد الإلكتروني مطلوب",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "البريد الإلكتروني غير صالح"
                                        }
                                    })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B40] outline-none"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-[#004B40] font-tajawal mb-2">
                                    الموضوع
                                </label>
                                <select
                                    {...register("subject", { required: "الرجاء اختيار الموضوع" })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B40] outline-none"
                                >
                                    <option value="">اختر موضوع الرسالة</option>
                                    <option value="general">استفسار عام</option>
                                    <option value="courses">الدورات التعليمية</option>
                                    <option value="quran">المصحف المرتل</option>
                                    <option value="other">أخرى</option>
                                </select>
                                {errors.subject && (
                                    <span className="text-red-500 text-sm">{errors.subject.message}</span>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-[#004B40] font-tajawal mb-2">
                                    الرسالة
                                </label>
                                <textarea
                                    {...register("message", { required: "الرسالة مطلوبة" })}
                                    rows="5"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B40] outline-none"
                                ></textarea>
                                {errors.message && (
                                    <span className="text-red-500 text-sm">{errors.message.message}</span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#004B40] text-white py-3 rounded-lg hover:bg-[#003830] 
                                transition-colors duration-300 font-tajawal disabled:opacity-50"
                            >
                                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="text-green-500 text-center">تم إرسال رسالتك بنجاح</div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="text-red-500 text-center">حدث خطأ. الرجاء المحاولة مرة أخرى</div>
                            )}
                        </form>
                    </div>
                    {/* Image */}
                    <div className="hidden lg:block">
                        <img
                            src="/assets/img/masjid-nabawi.png"
                            alt="المسجد النبوي"
                            className="rounded-2xl w-full hobject-cover"
                        />
                    </div>


                </div>

                <div className="text-center mt-12">
                    {/* Title Section */}
                    <div className="text-center mb-20" >
                        <div className="relative inline-block">
                            <h2 className="text-6xl font-bold font-amiri text-[#004B40]">
                                تواصل معنا
                                <span className="absolute -left-6 top-0">
                                    <svg className="w-4 h-4 text-[#F3D69C]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                </span>
                            </h2>
                            <img className='mt-2' src='/assets/img/5.png' />
                        </div>
                    </div>
                    {/* icon socile */}
                    <div className="flex justify-center items-center gap-10 mb-20">
                        <img src='/public/assets/svg/x.svg' alt='X' className='w-20 h-20' />
                        <img src='/public/assets/svg/instagram.svg' alt='Instagram' className='w-20 h-20' />
                        <img src='/public/assets/svg/whatsapp.svg' alt='WhatsApp' className='w-20 h-20' />
                        <img src='/public/assets/svg/facebook.svg' alt='FaceBook' className='w-20 h-20' />
                        <img src='/public/assets/svg/youtube.svg' alt='YouTube' className='w-20 h-20' />


                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInformation;