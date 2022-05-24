import { useTranslation } from "react-i18next";
// import { UnguessRoutes } from "../types";

export function useLocalizeRoute(route: string, lang?: string): string {
  const { i18n } = useTranslation();

  let currentLang = lang || i18n.language;

  let localizedRoute =
    currentLang === "en" ? `/${route}` : `/${currentLang}/${route}`;
  // in case of base route ("") we already have a forward slash
  let re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}
