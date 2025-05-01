import { useEffect, useState } from "react";
import i18n from "../../i18n";
// Import flag images
import saudiFlag from "../../../public/assets/svg/US.svg";
import usaFlag from "../../../public/assets/svg/Flag_of_Saudi_Arabia.svg.webp";

const LanguageSelector = () => {
    const [selectedLang, setSelectedLang] = useState("ar");
    const [open, setOpen] = useState(false);

    const languages = [
        { code: "ar", flag: saudiFlag, alt: "Saudi Arabia Flag" },
        { code: "en", flag: usaFlag, alt: "USA Flag" },
    ];

    useEffect(() => {
        const storedLang = localStorage.getItem("lang") || "ar";
        setSelectedLang(storedLang);
        i18n.changeLanguage(storedLang);
        document.dir = storedLang === "ar" ? "rtl" : "ltr";
    }, []);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        document.dir = lang === "ar" ? "rtl" : "ltr";
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm hover:bg-gray-50"
                aria-label="Select language"
            >
                <img
                    src={languages.find((lang) => lang.code === selectedLang).flag}
                    alt={languages.find((lang) => lang.code === selectedLang).alt}
                    className="w-6 h-4 object-cover rounded-sm"
                />
            </button>

            {open && (
                <div className="absolute left-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="px-3 py-2 hover:bg-gray-100 w-full flex justify-center"
                            >
                                <img
                                    src={lang.flag}
                                    alt={lang.alt}
                                    className="w-6 h-4 object-cover rounded-sm"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
