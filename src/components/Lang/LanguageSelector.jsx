import { useEffect, useState } from "react";
import i18n from "../i18n"; // المسار حسب مكان ملف i18n.js

const LanguageSelector = () => {
    const [selectedLang, setSelectedLang] = useState("en");

    const languages = [
        { code: "ar", label: "Arabic", flag: "🇸🇦" },
        { code: "en", label: "English", flag: "🇬🇧" },
    ];

    useEffect(() => {
        const storedLang = localStorage.getItem("lang") || "en";
        setSelectedLang(storedLang);
        i18n.changeLanguage(storedLang);
        document.dir = storedLang === "ar" ? "rtl" : "ltr";
    }, []);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        document.dir = lang === "ar" ? "rtl" : "ltr";
    };

    return (
        <div className="relative inline-block text-left">
            <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                {languages.find((lang) => lang.code === selectedLang).flag}
            </button>

            <div className="absolute mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <span className="mr-2">{lang.flag}</span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector;
