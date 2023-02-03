import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import BugHeader from 'src/common/components/BugDetail/Header';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugTags from 'src/common/components/BugDetail/Tags';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import BugDetails from 'src/common/components/BugDetail/Details';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Card } from '@appquality/unguess-design-system';

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
  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId,
    bid: bugId,
  });

  if (!isLoading && !isFetching && (isError || typeof bug === 'undefined')) {
    navigate(notFoundRoute);
    return null;
  }

  return (
    <Page
      title={t('__BUG_PAGE_TITLE')}
      pageHeader={
        isLoading || isFetching ? (
          <div>Loading...</div>
        ) : (
          bug && <div>{bug.title.full}</div>
        )
      }
      route="bug"
    >
      <div>
        {isLoading || isFetching ? (
          <div>Loading...</div>
        ) : (
          bug && (
            <Card>
              <BugHeader bug={bug} />
              <BugMeta bug={bug} />
              <BugTags bug={bug} campaignId={parseInt(campaignId, 10)} />
              <BugDescription bug={bug} />
              {bug.media && bug.media.length ? (
                <BugAttachments bug={bug} />
              ) : null}
              <BugDetails bug={bug} />
              <BugDuplicates cid={parseInt(campaignId, 10)} />
            </Card>
          )
        )}
      </div>
    </Page>
  );
};

export default Bugs;
