import React, { useState, useEffect } from "react";

// بيانات تجريبية للأذكار والأدعية
const allAzkar = [
  {
    id: 1,
    type: "ذكر",
    title: "دعاء النوم",
    text: "باسمك اللهم أموت وأحيا...",
    time: "النوم",
    source: "القرآن",
    audio: "#",
  },
  {
    id: 2,
    type: "ذكر",
    title: "دعاء الاستيقاظ",
    text: "الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور...",
    time: "الاستيقاظ",
    source: "القرآن",
    audio: "#",
  },
  {
    id: 3,
    type: "دعاء",
    title: "دعاء الرزق",
    text: "اللهم اكفني بحلالك عن حرامك وأغنني بفضلك عمن سواك...",
    time: "الصباح",
    source: "السنة",
    audio: "#",
  },
  {
    id: 4,
    type: "دعاء",
    title: "دعاء الهم",
    text: "اللهم إني أعوذ بك من الهم والحزن والعجز والكسل...",
    time: "المساء",
    source: "السنة",
    audio: "#",
  },
  {
    id: 5,
    type: "ذكر",
    title: "ذكر المساء",
    text: "قل هو الله أحد... (ثلاث مرات)",
    time: "المساء",
    source: "القرآن",
    audio: "#",
  },
  {
    id: 6,
    type: "ذكر",
    title: "ذكر الصباح",
    text: "أصبحنا وأصبح الملك لله...",
    time: "الصباح",
    source: "القرآن",
    audio: "#",
  },
  {
    id: 7,
    type: "دعاء",
    title: "دعاء الكرب",
    text: "لا إله إلا أنت سبحانك إني كنت من الظالمين...",
    time: "المساء",
    source: "السنة",
    audio: "#",
  },
  {
    id: 8,
    type: "ذكر",
    title: "ذكر النوم",
    text: "اللهم باسمك أموت وأحيا...",
    time: "النوم",
    source: "القرآن",
    audio: "#",
  },
  {
    id: 9,
    type: "دعاء",
    title: "دعاء السفر",
    text: "سبحان الذي سخر لنا هذا وما كنا له مقرنين...",
    time: "الصباح",
    source: "السنة",
    audio: "#",
  },
  {
    id: 10,
    type: "ذكر",
    title: "ذكر الاستيقاظ",
    text: "الحمد لله الذي رد إلي روحي وعافاني في جسدي...",
    time: "الاستيقاظ",
    source: "القرآن",
    audio: "#",
  },
];

const times = ["الكل", "الصباح", "المساء", "النوم", "الاستيقاظ"];
const sources = ["الكل", "القرآن", "السنة"];
const tabs = [
  { key: "azkar", label: "الأذكار" },
  { key: "ad3ya", label: "الأدعية" },
  { key: "all", label: "أذكار وأدعية" },
  { key: "myAzkar", label: "أذكاري وأدعيتي" },
];

const CARDS_PER_PAGE = 6;

export default function Azkar() {
  const [activeTab, setActiveTab] = useState("azkar");
  const [selectedTime, setSelectedTime] = useState("الكل");
  const [selectedSource, setSelectedSource] = useState("الكل");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  // تحميل المفضلات من localStorage
  useEffect(() => {
    const fav = localStorage.getItem("azkarFavV2");
    if (fav) setFavorites(JSON.parse(fav));
  }, []);
  useEffect(() => {
    localStorage.setItem("azkarFavV2", JSON.stringify(favorites));
  }, [favorites]);

  // تصفية البيانات حسب التبويب والفلاتر
  let filtered = allAzkar.filter((item) => {
    if (activeTab === "azkar") return item.type === "ذكر";
    if (activeTab === "ad3ya") return item.type === "دعاء";
    if (activeTab === "all") return true;
    if (activeTab === "myAzkar") return favorites.includes(item.id);
    return true;
  });
  if (selectedTime !== "الكل") filtered = filtered.filter((item) => item.time === selectedTime);
  if (selectedSource !== "الكل") filtered = filtered.filter((item) => item.source === selectedSource);

  // Pagination
  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  // إضافة/إزالة من المفضلة
  const toggleFav = (item) => {
    setFavorites((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };
  const isFav = (item) => favorites.includes(item.id);

  // عند تغيير الفلاتر أو التبويب، ارجع للصفحة الأولى
  useEffect(() => {
    setPage(1);
  }, [activeTab, selectedTime, selectedSource]);

  return (
    <div className="bg-[#F9F9F6] min-h-screen w-full font-sans flex flex-col items-center px-2 md:px-0">
      {/* سكشن الهيدر */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center mt-8 md:mt-12 mb-8 md:mb-12">
        {/* صورة */}
        <div className="w-32 h-32 md:w-48 md:h-48 relative overflow-hidden rounded-xl shadow-md md:ml-8 mb-4 md:mb-0 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="دعاء"
            className="object-cover w-full h-full"
          />
        </div>
        {/* عنوان ووصف */}
        <div className="flex-1 text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-[#184C43] mb-2 flex items-center gap-2 justify-center md:justify-start">
            أذكار ودعاء <span className="text-yellow-400 text-xl">✦</span>
          </h1>
          <p className="text-[#184C43] text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            في هذا المكان تجد كلمات تذهب الحزن، وأذكارًا تبث القلب طمأنينته.<br />
            ارفع يديك بخشوع، واذكره بقلب حاضر.<br />
            كن من الذاكرين.
          </p>
        </div>
      </div>

      {/* التبويبات */}
      <div className="w-full max-w-2xl flex items-center justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-full text-base font-semibold transition whitespace-nowrap border-2 border-[#E5D6B2] shadow-sm ${
              activeTab === tab.key
                ? "bg-[#184C43] text-white border-[#184C43]"
                : "bg-white text-[#184C43] hover:bg-[#f3f3e7]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* الفلاتر داخل إطار مزخرف */}
      <div className="w-full flex justify-center mb-8">
        <div className="flex flex-wrap items-center justify-center gap-4 bg-[#F9F9F6] border-2 border-[#E5D6B2] rounded-full px-6 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#184C43] font-semibold">المناسبة</span>
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`px-4 py-1 rounded-full text-sm font-semibold border-2 border-[#E5D6B2] transition ${
                  selectedTime === t
                    ? "bg-[#184C43] text-white border-[#184C43]"
                    : "bg-white text-[#184C43] hover:bg-[#f3f3e7]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#184C43] font-semibold">المصدر</span>
            {sources.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSource(s)}
                className={`px-4 py-1 rounded-full text-sm font-semibold border-2 border-[#E5D6B2] transition ${
                  selectedSource === s
                    ? "bg-[#184C43] text-white border-[#184C43]"
                    : "bg-white text-[#184C43] hover:bg-[#f3f3e7]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* البطاقات */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {paginated.length === 0 && (
          <div className="col-span-full text-center text-[#184C43] py-12 text-lg">لا يوجد نتائج مطابقة</div>
        )}
        {paginated.map((item) => (
          <div
            key={item.id}
            className="bg-[#184C43] relative rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[220px] border-2 border-[#E5D6B2]"
          >
            {/* زخرفة العنوان */}
            <div className="absolute -top-5 right-6 bg-[#1e5c4a] border-2 border-[#E5D6B2] rounded-full px-6 py-1 text-[#F3D69C] font-bold text-base shadow">
              {item.title}
            </div>
            {/* نص الذكر/الدعاء */}
            <div className="mb-8 mt-8 text-lg leading-loose text-center text-white font-tajawal">
              {item.text}
            </div>
            {/* أزرار */}
            <div className="flex justify-between items-center mt-2 px-2 bg-white rounded-b-2xl pt-4 pb-2">
              <button
                className="text-[#184C43] hover:text-yellow-400 transition text-xl"
                title="مشاركة"
                onClick={() => {
                  navigator.clipboard.writeText(item.text);
                  alert("تم نسخ الذكر/الدعاء!");
                }}
              >
                <i className="fas fa-share-alt"></i>
              </button>
              <button
                className="text-[#184C43] hover:text-yellow-400 transition text-2xl"
                title={isFav(item) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                onClick={() => toggleFav(item)}
              >
                <i className={isFav(item) ? "fas fa-heart" : "far fa-heart"}></i>
              </button>
              <button
                className="text-[#184C43] hover:text-yellow-400 transition text-2xl"
                title="تشغيل الصوت"
                onClick={() => alert("تشغيل الصوت (تجريبي)")}
              >
                <i className="fas fa-play-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* أزرار التنقل */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-8 mb-12">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#184C43] text-white text-2xl shadow hover:bg-[#0e2a22] transition disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="السابق"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#184C43] text-white text-2xl shadow hover:bg-[#0e2a22] transition disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="التالي"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      )}
    </div>
  );
}
