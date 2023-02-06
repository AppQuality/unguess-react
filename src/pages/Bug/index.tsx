import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Header } from './Header';
import { Content } from './Content';
import { LoadingSkeleton } from './LoadingSkeleton';

const Bugs = () => {
  const { campaignId, bugId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  if (!campaignId || !bugId) {
    return null;
  }

  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId,
    bid: bugId,
  });

  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }

  if (isError || typeof bug === 'undefined') {
    navigate(notFoundRoute);
    return null;
  }

  return (
    <Page
      title={t('__BUG_PAGE_TITLE')}
      pageHeader={<Header campaignId={campaignId} title={bug.title} />}
      route="bug"
    >
      <Content bug={bug} campaignId={campaignId} />
    </Page>
  );
};

export default Bugs;
