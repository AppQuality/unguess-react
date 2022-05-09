import { Locale } from "date-fns";
import { enGB, it } from 'date-fns/locale';
import { t } from "i18next";

interface Language {
    label: string;
    locale: Locale;
}

export const getLanguage = (lang: string): Language => {
    let label;
    let locale;
    switch (lang) {
        case "en":
            label = t("English");
            locale = enGB;
            break;
        case "it":
            label = t("Italian");
            locale = it;
            break;
        default:
            label = t("English");
            locale = enGB;
            break;
    }

    return {
        label,
        locale
    }
}