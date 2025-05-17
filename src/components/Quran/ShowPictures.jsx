import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AYAT_PER_PAGE = 5;
const TOTAL_SURAH = 114; // عدد سور القرآن

const ShowPictures = () => {
    // Move ALL hooks to the top of the component
    const { suraId } = useParams();
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const ayahIndexRef = useRef(0);

    // Group all useState hooks together
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showTafsir, setShowTafsir] = useState(false);
    const [tafsir, setTafsir] = useState([]); // Changed from '' to []
    const [selectedAyah, setSelectedAyah] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioPausedIndex, setAudioPausedIndex] = useState(null);
    const [surahsList, setSurahsList] = useState([]);
    const [selectedJuz, setSelectedJuz] = useState(1);
    const [juzChangedByUser, setJuzChangedByUser] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [zoom, setZoom] = useState(100);
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('quranBookmarks');
        return saved ? JSON.parse(saved) : {};
    });

    // Group all useEffect hooks together
    useEffect(() => {
        const fetchSurahs = async () => {
            const response = await fetch('https://api.alquran.cloud/v1/surah');
            const data = await response.json();
            // Process the surahs array
            const processedData = data.data.map(surah => {
                if (surah.number !== 1 && surah.ayahs) {
                    return {
                        ...surah,
                        ayahs: surah.ayahs.filter(ayah =>
                            !ayah.text.includes('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ') &&
                            !ayah.text.includes('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ') &&
                            !ayah.text.includes('بسم الله الرحمن الرحيم')
                        )
                    };
                }
                return surah;
            });
            setSurahsList(processedData);
        };
        fetchSurahs();
    }, []);

    useEffect(() => {
        const fetchSurah = async () => {
            setLoading(true);
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${suraId}/ar.alafasy`);
            const data = await response.json();
            setSurah(data.data);
            setLoading(false);
            setCurrentPage(1);
            setAudioPausedIndex(null);
        };
        fetchSurah();
        stopAudio();
    }, [suraId]);

    useEffect(() => {
        stopAudio();
    }, [currentPage]);

    useEffect(() => {
        return () => stopAudio();
    }, []);

    useEffect(() => {
        if (surah) {
            let ayahs = surah.ayahs;
            if (surah.number !== 1 && ayahs[0].text.trim().startsWith('بسم الله الرحمن الرحيم')) {
                ayahs = ayahs.slice(1);
            }
            const startIdx = (currentPage - 1) * AYAT_PER_PAGE;
            const ayatToShow = ayahs.slice(startIdx, startIdx + AYAT_PER_PAGE);
            setSelectedAyah(ayatToShow[0]?.numberInSurah || 1);
        }
    }, [surah, currentPage]);

    useEffect(() => {
        if (!juzChangedByUser) return;
        const fetchFirstSurahInJuz = async () => {
            try {
                const response = await fetch(`https://api.alquran.cloud/v1/juz/${selectedJuz}/ar.alafasy`);
                const data = await response.json();
                if (data.data && data.data.ayahs && data.data.ayahs.length > 0) {
                    const firstSurahNumber = data.data.ayahs[0].surah.number;
                    navigate(`/quran/${firstSurahNumber}`);
                }
            } catch (error) {
                console.error("Error fetching first surah in juz:", error);
            } finally {
                setJuzChangedByUser(false);
            }
        };
        fetchFirstSurahInJuz();
    }, [selectedJuz, navigate, juzChangedByUser]);

    useEffect(() => {
        const bookmarkKey = `${suraId}-${currentPage}`;
        setIsBookmarked(!!bookmarks[bookmarkKey]);
    }, [suraId, currentPage, bookmarks]);

    // ----------- AUDIO CONTROL FUNCTIONS -----------
    const stopAudio = () => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            setAudioPausedIndex(ayahIndexRef.current);
            audioRef.current = null;
        }
    };

    const playAyatSequentially = (ayatToShow) => {
        setIsPlaying(true);
        if (audioPausedIndex !== null && audioPausedIndex < ayatToShow.length) {
            ayahIndexRef.current = audioPausedIndex;
        } else {
            ayahIndexRef.current = 0;
        }
        setAudioPausedIndex(null);
        playNextAyah(ayatToShow);
    };

    const playNextAyah = (ayatToShow) => {
        if (ayahIndexRef.current >= ayatToShow.length) {
            setIsPlaying(false);
            setAudioPausedIndex(null);
            handleNextPage(true);
            return;
        }
        const ayah = ayatToShow[ayahIndexRef.current];
        audioRef.current = new Audio(ayah.audio);
        audioRef.current.play();
        audioRef.current.onended = () => {
            ayahIndexRef.current += 1;
            playNextAyah(ayatToShow);
        };
        audioRef.current.onerror = () => {
            ayahIndexRef.current += 1;
            playNextAyah(ayatToShow);
        };
    };

    const handlePlayPause = (ayatToShow) => {
        if (!isPlaying) {
            playAyatSequentially(ayatToShow);
        } else {
            stopAudio();
        }
    };

    // ----------- TAFSIR -----------
    const fetchFullSurahTafsir = async () => {
        try {
            const promises = ayatToShow.map(async (ayah) => {
                const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surah.number}:${ayah.numberInSurah}/ar.muyassar`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.data.text;
            });

            const tafsirData = await Promise.all(promises);
            setTafsir(tafsirData);
        } catch (error) {
            console.error("Error fetching tafsir:", error);
            setTafsir([]); // Reset tafsir on error
        }
    };

    const fetchTafsir = async () => {
        setShowTafsir(true);
        try {
            await fetchFullSurahTafsir();
        } catch (error) {
            console.error("Error in fetchTafsir:", error);
        }
    };

    // ----------- PAGINATION & DATA -----------
    if (loading) return <div className="text-center py-10">جاري التحميل...</div>;
    if (!surah) return <div className="text-center py-10">لم يتم العثور على السورة</div>;

    let ayahs = surah.ayahs;
    if (surah.number !== 1 && ayahs[0].text.trim().startsWith('بسم الله الرحمن الرحيم')) {
        ayahs = ayahs.slice(1);
    }

    const totalPages = Math.ceil(ayahs.length / AYAT_PER_PAGE);
    const startIdx = (currentPage - 1) * AYAT_PER_PAGE;
    const endIdx = startIdx + AYAT_PER_PAGE;
    const ayatToShow = ayahs.slice(startIdx, endIdx);


    // جلب عدد الأجزاء (30 جزء)
    const juzList = Array.from({ length: 30 }, (_, i) => i + 1);
    // جلب عدد الآيات في السورة الحالية
    const ayahNumbers = surah ? Array.from({ length: surah.numberOfAyahs }, (_, i) => i + 1) : [];

    // تقسيم الآيات للصفحتين
    const rightAyat = ayahs.slice(startIdx, startIdx + 5);
    const leftAyat = ayahs.slice(startIdx + 5, startIdx + 12);

    // ----------- التنقل بين الصفحات والسور -----------
    const handleNextPage = (autoPlay = false) => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
            setAudioPausedIndex(null);
            if (autoPlay) setTimeout(() => handlePlayPause(ayahs.slice((currentPage) * AYAT_PER_PAGE, (currentPage + 1) * AYAT_PER_PAGE)), 500);
        } else if (parseInt(suraId) < TOTAL_SURAH) {
            // انتقل للسورة التالية
            navigate(`/quran/${parseInt(suraId) + 1}`);
            setTimeout(() => setCurrentPage(1), 100);
            if (autoPlay) setTimeout(() => handlePlayPause([]), 1000); // سيبدأ التشغيل تلقائيًا بعد تحميل السورة الجديدة
        } else {
            setIsPlaying(false);
            setAudioPausedIndex(null);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            setAudioPausedIndex(null);
        } else if (parseInt(suraId) > 1) {
            // انتقل للسورة السابقة
            navigate(`/quran/${parseInt(suraId) - 1}`);
            setTimeout(() => setCurrentPage(1), 100);
        }
    };

    // Zoom functions
    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 10, 200));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 10, 50));
    };



    // Bookmark function
    const toggleBookmark = () => {
        const bookmarkKey = `${suraId}-${currentPage}`;
        const newBookmarks = { ...bookmarks };

        if (bookmarks[bookmarkKey]) {
            delete newBookmarks[bookmarkKey];
            setIsBookmarked(false);
        } else {
            newBookmarks[bookmarkKey] = {
                surahName: surah?.name,
                page: currentPage,
                timestamp: new Date().toISOString()
            };
            setIsBookmarked(true);
        }

        setBookmarks(newBookmarks);
        localStorage.setItem('quranBookmarks', JSON.stringify(newBookmarks));
    };

    // ----------- RENDER -----------
    return (
        <div className="flex flex-col items-center min-h-[70vh] bg-[#fff] my-20">
            {/* الشريط العلوي */}
            <div className="flex flex-col items-center  w-full max-w-3xl mb-12">
                <div className="flex items-center justify-center gap-2 bg-white rounded-2xl shadow px-20 py-2 mb-10 border border-[#004B40] relative"
                    style={{ borderWidth: 2, borderStyle: 'solid', borderColor: '#004B40' }}>
                    {/* زخرفة يمين */}
                    <img src="/assets/img/Shape-04 14.png" alt="" className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-10" />
                    {/* زخرفة يسار */}
                    <img src="/assets/img/Shape-04 14.png" alt="" className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-10 rotate-180" />

                    {/* Dropdown السورة */}
                    <div className="flex items-center gap-1">
                        <label className="font-tajawal text-[#004B40] pe-3">السورة</label>
                        <select
                            className="rounded-2xl border border-[#004B40]/30 bg-[#004B40] text-[#F9F9F9] font-bold px-1 py-1"
                            value={surah?.number || 1}
                            onChange={e => navigate(`/quran/${e.target.value}`)}
                        >
                            {surahsList.map(s => (
                                <option key={s.number} value={s.number}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <span className="mx-4 text-[#004B40]">|</span>
                    {/* Dropdown الجزء */}
                    <div className="flex items-center gap-1">
                        <label className="font-tajawal text-[#004B40] pe-3">الجزء</label>
                        <select
                            className="rounded-2xl border border-[#004B40]/30 text-[#F9F9F9] bg-[#004B40] font-bold px-2 py-1"
                            value={selectedJuz}
                            onChange={e => { setJuzChangedByUser(true); setSelectedJuz(Number(e.target.value)); }}
                        >
                            {juzList.map(juz => (
                                <option key={juz} value={juz}>{juz}</option>
                            ))}
                        </select>
                    </div>
                    <span className="mx-4 text-[#004B40]">|</span>
                    {/* Dropdown الآية */}
                    <div className="flex items-center gap-1">
                        <label className="font-tajawal text-[#004B40] pe-3">الآية</label>
                        <select
                            className="rounded-2xl border border-[#004B40]/30 text-[#F9F9F9] bg-[#004B40] font-bold px-2 py-1"
                            value={selectedAyah}
                            onChange={e => {
                                const ayahNum = Number(e.target.value);
                                setSelectedAyah(ayahNum);
                                // حساب الصفحة التي تحتوي على هذه الآية
                                const page = Math.ceil(ayahNum / AYAT_PER_PAGE);
                                setCurrentPage(page);
                            }}
                        >
                            {ayahNumbers.map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* الأزرار */}
                <div className="flex gap-4 mt-6">
                    <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-tajawal shadow transition ${isPlaying
                            ? 'bg-[#F3D69C] text-[#004B40] hover:bg-[#e2c07a]'
                            : 'bg-[#004B40] text-white hover:bg-[#003830]'
                            }`}
                        onClick={() => handlePlayPause(ayatToShow)}
                    >

                        {isPlaying ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 3v18l15-9L5 3z" />
                            </svg>
                        )}
                        <span>{isPlaying ? 'إيقاف التلاوة' : 'سماع التلاوة'}</span>
                    </button>
                    <button
                        className="flex items-center gap-2 bg-white text-[#004B40] border border-[#004B40] px-6 py-3 rounded-2xl font-tajawal shadow transition"
                        onClick={() => {
                            setSelectedAyah(ayatToShow[0].numberInSurah);
                            fetchTafsir(ayatToShow[0].numberInSurah);
                        }}
                    >
                        <img src="/assets/svg/page-left 3.svg" alt="" className="w-4 h-4" />
                        <span>تفسير الآيات</span>
                    </button>
                </div>
            </div>

            {/* عرض الصفحة */}
            <div className="flex flex-col w-full max-w-4xl">
                {/* Top Icons */}
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        className="w-10 h-10 rounded-full bg-white  flex items-center justify-center"
                        onClick={handleZoomOut}
                    >
                        <img src="/assets/svg/zoom out.svg" alt="Zoom Out" className="w-10 h-10" />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white  flex items-center justify-center"
                        onClick={handleZoomIn}
                    >
                        <img src="/assets/svg/zoom in.svg" alt="Zoom In" className="w-10 h-10" />
                    </button>

                    {/* Bookmark Button */}
                    <button
                        onClick={toggleBookmark}
                        className="w-10 h-10 flex items-center justify-center transition "                    >
                        {isBookmarked ? (
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* الدائرة */}
                                <circle cx="32" cy="32" r="30" stroke="#004d40" strokeWidth="2" />

                                {/* رمز Bookmark */}
                                <path
                                    d="M24 18H40C41.1 18 42 18.9 42 20V46L32 40L22 46V20C22 18.9 22.9 18 24 18Z"
                                    fill="none"
                                    stroke="#004d40"
                                    strokeWidth="2"
                                />

                                {/* الخط المائل اللي يدي معنى "منفي" */}
                                <line
                                    x1="20"
                                    y1="20"
                                    x2="44"
                                    y2="44"
                                    stroke="#004d40"
                                    strokeWidth="2"
                                />
                            </svg>) : (<img src="/assets/svg/book marks.svg" alt="Bookmark" className="w-10 h-10 text-[#004B40]" />

                        )}

                    </button>
                </div>

                {/* Quran Page */}
                <div className="relative bg-[#FEFFDD] rounded-lg shadow-lg overflow-hidden">
                    {/* Page Content */}
                    <div className="flex">
                        {/* Right Page */}
                        <div className="w-1/2 border-4 border-[#004B40]/50 ">
                            <div className="p-2">
                                <div className="text-right mb-4">
                                    <div className="relative w-full mb-8">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 w-full">
                                            <img
                                                src="/assets/img/surah-header.png"
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Surah Name Container */}
                                        <div className="relative flex justify-center items-center py-4">
                                            <h3 className="text-[#004B40] text-2xl font-amiri">{surah.name}</h3>
                                        </div>
                                    </div>                                    <div className="text-center text-[#04261B] font-amiri font-bold text-xl py-2 rounded-lg">
                                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                                    </div>
                                </div>
                                <div className="text-[#004B40] font-amiri text-lg leading-loose"
                                    style={{ zoom: `${zoom}%` }}>
                                    {rightAyat.map((ayah) => (
                                        <span key={ayah.numberInSurah} className="inline">
                                            {ayah.text}
                                            <span className="text-[#BA8B00] text-sm mx-1">﴿{ayah.numberInSurah}﴾</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Left Page */}
                        <div className="w-1/2 border-4 border-[#004B40]/50">
                            <div className="p-2">
                                <div className="text-[#004B40] font-amiri text-lg leading-loose"
                                    style={{ zoom: `${zoom}%` }}>
                                    {leftAyat.map((ayah) => (
                                        <span key={ayah.numberInSurah} className="inline">
                                            {ayah.text}
                                            <span className="text-[#BA8B00] text-sm mx-1">﴿{ayah.numberInSurah}﴾</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Red Bookmark */}
                    <div className="absolute left-0 top-0">
                        {isBookmarked ? <img src="/assets/svg/images.svg" alt="Bookmark" className="w-10 h-10" /> : ""}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-6 mt-8">
                    {/* Previous Page Button */}
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1 && parseInt(suraId) === 1}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#004B40] text-white 
                disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-6 h-6 transform rotate-180" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Next Page Button */}
                    <button
                        onClick={() => handleNextPage(false)}
                        disabled={currentPage === totalPages && parseInt(suraId) === TOTAL_SURAH}
                        className="w-12 h-12 flex items-center bg-[#004B40] justify-center rounded-full border-2 border-[#004B40] text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* نافذة التفسير */}
            {showTafsir && (
                <div className="mt-6 w-full max-w-4xl bg-[#FEFFDD] border-4 border-[#004B40]/50 rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-[#004B40] text-white">
                        <span className="font-amiri text-xl">تفسير سورة {surah.name}</span>
                        <button
                            onClick={() => setShowTafsir(false)}
                            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full text-sm"
                        >
                            إغلاق
                        </button>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto p-6">
                        <div className="space-y-6">
                            {ayahs.map((ayah, index) => (
                                <div
                                    key={ayah.numberInSurah}
                                    className="bg-white rounded-lg p-4 shadow-sm border border-[#004B40]/20"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#004B40] text-white font-amiri">
                                            {ayah.numberInSurah}
                                        </div>
                                        <div className="text-[#004B40] font-amiri text-lg">
                                            {ayah.text}
                                        </div>
                                    </div>
                                    <div className="mt-3 pr-10 text-[#004B40]/80 font-tajawal leading-relaxed">
                                        {tafsir[index]}
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <img
                                            src="/assets/patterns/ayah-divider.png"
                                            alt=""
                                            className="h-4 opacity-50"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ShowPictures;