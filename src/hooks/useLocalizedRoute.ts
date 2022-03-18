import { useTranslation } from "react-i18next";
import { CrowdRoutes } from "../types";

export function useLocalizeRoute(route: CrowdRoutes): string {
  const { i18n } = useTranslation();
  let localizedRoute =
    i18n.language === "en" ? `/${route}` : `/${i18n.language}/${route}`;
  // in case of base route ("") we already have a forward slash
  let re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}