import { Card } from '@appquality/unguess-design-system';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import BugHeader from 'src/common/components/BugDetail/Header';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugTags from 'src/common/components/BugDetail/Tags';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import BugDetails from 'src/common/components/BugDetail/Details';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';

interface Props {
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
  campaignId: string;
}

export const Content = ({ bug, campaignId }: Props) => (
  <Card>
    <BugHeader bug={bug} campaignId={Number(campaignId)} />
    <BugMeta bug={bug} />
    <div style={{ width: '50%' }}>
      <BugTags bug={bug} campaignId={parseInt(campaignId, 10)} />
    </div>
    <BugDescription bug={bug} />
    {bug.media && bug.media.length ? <BugAttachments bug={bug} /> : null}
    <BugDetails bug={bug} />
    <BugDuplicates cid={parseInt(campaignId, 10)} />
  </Card>
);
