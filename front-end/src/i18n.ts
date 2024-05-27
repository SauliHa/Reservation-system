import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./locales/en/translation.json";
import fi from "./locales/fi/translation.json";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		fi: {
			translation: fi,
		},
	},
	lng: "en", // default language
	fallbackLng: "en",
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;