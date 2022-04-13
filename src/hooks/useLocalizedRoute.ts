import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { UnguessRoutes } from "../types";

const reservedRoutes = ["oops", ""];

export function useLocalizeRoute(route: string, lang?: string): string {
  const { i18n } = useTranslation();
  const params = useParams();


  let currentLang = lang || i18n.language;

  let parameter = "";

  if( !reservedRoutes.includes(route) && params)
  {
    Object.keys(params).forEach(key => {
      parameter = params[key] ?? "";
    });
  }

  parameter = parameter ? `/${parameter}` : "";

  let localizedRoute =
  currentLang === "en" ? `/${route}${parameter}` : `/${currentLang}/${route}${parameter}`;
  // in case of base route ("") we already have a forward slash
  let re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}