import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { BugsDetail } from 'src/common/components/BugDetail';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useCampaign } from '../Bugs/useCampaign';

const Bugs = () => {
  const { campaignId, bugId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
    return null;
  }

  if (!bugId || Number.isNaN(Number(bugId))) {
    navigate(notFoundRoute);
    return null;
  }

  const { isLoading, isError, campaign } = useCampaign(
    parseInt(campaignId, 10)
  );

  if (isError) {
    navigate(notFoundRoute);
  }

  // Check if the campaign has bugs
  if (
    !isLoading &&
    campaign &&
    (!campaign.outputs?.length || !campaign.outputs.includes('bugs'))
  ) {
    navigate(notFoundRoute);
  }

  return (
    <Page title={t('__BUG_PAGE_TITLE')} route="bug">
      <BugsDetail
        campaignId={parseInt(campaignId, 10)}
        bugId={parseInt(bugId, 10)}
      />
    </Page>
  );
};

export default Bugs;
