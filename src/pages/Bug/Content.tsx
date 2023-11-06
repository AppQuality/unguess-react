import { ContainerCard } from '@appquality/unguess-design-system';
import { AnchorButtons } from 'src/common/components/BugDetail/AnchorButtons';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import BugStateDropdown from 'src/common/components/BugDetail/BugStateDropdown';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugDetails from 'src/common/components/BugDetail/Details';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugPriority from 'src/common/components/BugDetail/Priority';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { BugPreviewContextProvider } from '../Bugs/Content/context/BugPreviewContext';
import BugHeader from './components/BugHeader';

interface Props {
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
  campaignId: string;
  refetchBugTags?: () => void;
}
const Container = styled(ContainerCard)`
  color: ${({ theme }) => theme.colors.foreground};
`;
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.space.sm};
`;

export const Content = ({ bug, campaignId, refetchBugTags }: Props) => (
  <Container>
    <BugPreviewContextProvider>
      <BugHeader bug={bug} />
      <BugMeta bug={bug} />
      <AnchorButtons bug={bug} />
      <GridWrapper>
        <BugStateDropdown bug={bug} />
        <BugPriority bug={bug} />
      </GridWrapper>
      <BugDescription bug={bug} />
      {bug.media && bug.media.length ? <BugAttachments bug={bug} /> : null}
      <BugDetails bug={bug} refetchBugTags={refetchBugTags} />
      <BugDuplicates cid={parseInt(campaignId, 10)} bugId={bug.id} />
    </BugPreviewContextProvider>
  </Container>
);
