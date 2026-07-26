// ENUMS
export enum LanguageCode {
    EN = "en",
    IT = "it",
    DE = "de",
}

export enum LanguageLabel {
    [LanguageCode.EN] = "English",
    [LanguageCode.IT] = "Italian",
    [LanguageCode.DE] = "German",
}

// TYPES
export type NavbarItem = {
    label: string;
    href?: string;
    children?: NavbarItem[];
};

export type Language = {
    code: LanguageCode;
    label: string;
};