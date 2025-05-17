import React from 'react';

export const QuranView = () => {



    const recentSuras = [
        { id: 1, name: 'سورة البقرة', ayah: '٩' },
        { id: 2, name: 'سورة النساء', ayah: '١١' },
        { id: 3, name: 'سورة النحل', ayah: '١٦' },
        { id: 4, name: 'سورة الفاتحة', ayah: '١' },
    ];

    const referenceMarkers = [
        { id: 1, name: 'سورة البقرة', ayah: '٢' },
        { id: 2, name: 'سورة النحل', ayah: '٢٢' },
        { id: 3, name: 'سورة الروم', ayah: '١٩' },
        { id: 4, name: 'سورة يوسف', ayah: '٢٤' },
        { id: 5, name: 'سورة مريم', ayah: '١٤' },
        { id: 6, name: 'سورة هود', ayah: '١٣' },
    ];

    return (
        <div className="space-y-12">
            {/* Recently Read Section */}
            <div>
                <h3 className="text-4xl font-bold my-20 font-amiri text-[#004B40]  flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F3D69C]"></span>
                    المقروءة حديثاً :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentSuras.map((sura) => (
                        <div
                            key={sura.id}
                            className="bg-[#004B40] rounded-2xl p-10  relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full">
                                <img
                                    src="/assets/img/islamic-pattern.png"
                                    alt=""
                                    className=" h-6 object-cover "
                                />
                            </div>

                            <div className="relative z-10 flex flex-col items-center justify-center">
                                <h4 className="text-[#F3D69C] text-xl font-amiri mb-3">{sura.name}</h4>
                                <div className="w-20 h-20 flex items-center justify-center">

                                    <img src="/assets/img/number of ayah.png" alt="" className="w-full h-full   " />
                                </div>
                            </div>
                            <div className="absolute top-44 left-0  w-full h-full">
                                <img
                                    src="/assets/img/islamic-pattern.png"
                                    alt=""
                                    className=" h-6  object-cover "
                                />
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            {/* Reference Markers Section */}
            <div>
                <h3 className="text-4xl font-bold my-20 font-amiri text-[#004B40]  flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F3D69C]"></span>
                    العلامات المرجعية :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {referenceMarkers.map((marker) => (
                        <div
                            key={marker.id}
                            className="relative bg-[#0B4B40] rounded-2xl flex items-center min-h-[100px] overflow-hidden shadow-md"
                        >

                            {/* Ribbon */}
                            <img src="/assets/svg/Vector.svg" alt="ribbon" className="absolute right-0 top-0 w-8 h-16 z-10" />
                            {/* Gold Stars */}
                            <img src="/assets/svg/Star 8.svg" alt="star" className="absolute left-10 top-2 w-3 h-3 z-10" />
                            <img src="/assets/svg/Star 8.svg" alt="star" className="absolute right-20 bottom-2 w-2 h-2 z-10" />
                            {/* Content */}
                            <div className="flex-1  items-center  px-8 py-6 relative z-20">
                                {/* Ayah Number Circle */}
                                <div className="flex items-center justify-between gap-5">
                                    {/* Surah Name */}
                                    <div className="text-white font-amiri ps-5 text-2xl font-bold text-end">
                                        {marker.name}
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className="w-14 h-14 rounded-full border-4 border-[#F3D69C] flex flex-col items-center justify-center bg-[#0B4B40] text-[#F3D69C] font-amiri text-2xl font-bold">
                                            {marker.ayah}
                                        </div>
                                        <span className="text-[#F3D69C] font-tajawal text-lg">الآية</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

