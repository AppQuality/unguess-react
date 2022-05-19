import { Page } from "src/features/templates/Page";
import { useTranslation } from "react-i18next";
import { useGetServicesQuery } from "src/features/backoffice";

export default function Catalog() {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetServicesQuery({
    populate: "*",
  });

  return (
    <Page title={t("__PAGE_TITLE_CATALOG")} route={"templates"}>
      <pre>
        {error ? (
          <div>{">>> error: " + JSON.stringify(error)}</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <>{">>> data: " + JSON.stringify(data, null, 2)}</>
        )}
      </pre>
    </Page>
  );
}
