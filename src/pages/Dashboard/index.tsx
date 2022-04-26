// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { Page } from "src/features/templates/Page";
import { Grid } from "@appquality/unguess-design-system";
import { SuggestedCampaigns } from "./SuggestedCampaigns";
import { CampaignsList } from "./campaigns-list";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { projectFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";
import { DashboardHeaderContent } from "./headerContent";

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.user);

  if(status === "logged") dispatch(projectFilterChanged(0)); //Reset filters

  return (
    <Page title={t("__PAGE_TITLE_PRIMARY_DASHBOARD")} pageHeader={<DashboardHeaderContent title={t("__PAGE_TITLE_PRIMARY_DASHBOARD")}/>} route={""}> 
      <Grid>
        <SuggestedCampaigns />
        <CampaignsList />
      </Grid>
    </Page>
  );
}
