import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files directly
import frTranslations from "../messages/fr.json";
import arTranslations from "../messages/ar.json";

// Define resources
const resources = {
  fr: {
    translation: frTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

// Initialize i18n immediately
i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
