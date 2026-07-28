import { useState } from "react";

import { Language, LanguageCode, NavbarItem } from "./navbar.types";
import { LANGUAGE_LABEL } from "./constNavbar";


export function useNavbar() {
  const items: NavbarItem[] = [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "About",
          href: "/about",
        },
        {
          label: "Tech Stack",
          href: "/tech-stack",
        },
        {
          label: "CV",
          href: "/cv",
        },
    ];

    const languages: Language[] = [
      { code: LanguageCode.EN, label: LANGUAGE_LABEL[LanguageCode.EN] },
      { code: LanguageCode.IT, label: LANGUAGE_LABEL[LanguageCode.IT] },
      { code: LanguageCode.DE, label: LANGUAGE_LABEL[LanguageCode.DE] },
    ];

    const [isLangOpen, setIsLangOpen] = useState(false);

    return {
        items,
        languages,
        isLangOpen,
        setIsLangOpen,
    };
}