import { Page } from "src/features/templates/Page";
import { useTranslation } from "react-i18next";

export default function Catalog() {
  const { t } = useTranslation();
  return (
    <Page title={t("__PAGE_TITLE_CATALOG")} route={"templates"}>
      Catalog
    </Page>
  );
}
