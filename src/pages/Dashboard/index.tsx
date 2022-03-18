// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/templates/PageTemplate";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <PageTemplate
      title={t("__PAGE_TITLE_PRIMARY_DASHBOARD")}
      route={""}
      shouldBeLoggedIn
    >
      <div>
        <h1>Primary {t("__PAGE_TITLE_PRIMARY_DASHBOARD")}</h1>
      </div>
    </PageTemplate>
  );
}
