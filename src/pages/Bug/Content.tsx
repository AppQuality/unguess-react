import { ContainerCard } from '@appquality/unguess-design-system';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import BugDetails from 'src/common/components/BugDetail/Details';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import { AnchorButtons } from 'src/common/components/BugDetail/AnchorButtons';
import BugHeader from './components/BugHeader';
import { BugPreviewContextProvider } from '../Bugs/Content/context/BugPreviewContext';

interface Props {
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
  campaignId: string;
}

export const Content = ({ bug, campaignId }: Props) => (
  <ContainerCard>
    <BugPreviewContextProvider>
      <BugHeader bug={bug} />
      <BugMeta bug={bug} />
      <AnchorButtons bug={bug} />
      <div style={{ width: '50%' }}>
        <BugPriority bug={bug} />
        <BugTags
          bug={bug}
          campaignId={parseInt(campaignId, 10)}
          bugId={bug.id}
        />
      </div>
      <BugDescription bug={bug} />
      {bug.media && bug.media.length ? <BugAttachments bug={bug} /> : null}
      <BugDetails bug={bug} />
      <BugDuplicates cid={parseInt(campaignId, 10)} bugId={bug.id} />
    </BugPreviewContextProvider>
  </ContainerCard>
);
