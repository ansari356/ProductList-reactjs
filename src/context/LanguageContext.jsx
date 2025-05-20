// src/context/LanguageContext.js
import { createContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";


export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // تغيير اتجاه الصفحة بناءً على اللغة
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}