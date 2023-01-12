import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { selectCampaign } from 'src/features/bugsPage/bugsPageSlice';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { BugsPageContent, BugsPageContentLoader } from './Content';
import { BugsPageHeader, BugsPageHeaderLoader } from './PageHeader';

const Bugs = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId?.toString() ?? '0',
  });

  useEffect(() => {
    if (campaign) {
      dispatch(
        selectCampaign({
          cp_id: campaign.id,
          filters: {
            types: [
              { id: 1, name: 'Crash' },
              { id: 2, name: 'Malfunction' },
              { id: 3, name: 'Typo' },
            ],
          },
        })
      );
    }
  }, [campaign]);

  if (isErrorCampaign) {
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__BUGS_PAGE_TITLE')}
      pageHeader={
        isLoadingCampaign || isFetchingCampaign ? (
          <BugsPageHeaderLoader />
        ) : (
          campaign && <BugsPageHeader campaignId={campaign.id} />
        )
      }
      route="bugs"
    >
      {isLoadingCampaign || isFetchingCampaign ? (
        <BugsPageContentLoader />
      ) : (
        <BugsPageContent campaignId={campaign?.id || 0} />
      )}
    </Page>
  );
};

export default Bugs;
