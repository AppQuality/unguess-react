import { ContainerCard } from '@appquality/unguess-design-system';
import { AnchorButtons } from 'src/common/components/BugDetail/AnchorButtons';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugDetails from 'src/common/components/BugDetail/Details';
import BugMeta from 'src/common/components/BugDetail/Meta';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { BugPreviewContextProvider } from '../Bugs/Content/context/BugPreviewContext';
import BugHeader from './components/BugHeader';

interface Props {
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
  campaignId: string;
  isPublicShared?: boolean;
}
const Container = styled(ContainerCard)`
  color: ${({ theme }) => theme.colors.foreground};
  margin: ${({ theme }) => theme.space.xxl} 0;
`;

export const Content = ({ bug, campaignId, isPublicShared = false }: Props) => (
  <Container>
    <BugPreviewContextProvider>
      <BugHeader bug={bug} />
      <BugMeta bug={bug} />
      <AnchorButtons isPublicShared bug={bug} />
      <BugDescription bug={bug} />
      <BugDetails bug={bug} />
      {bug.media && bug.media.length ? <BugAttachments bug={bug} /> : null}
      {!isPublicShared && (
        <BugDuplicates cid={parseInt(campaignId, 10)} bugId={bug.id} />
      )}
    </BugPreviewContextProvider>
  </Container>
);
