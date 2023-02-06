import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import BugHeader from 'src/common/components/BugDetail/Header';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugTags from 'src/common/components/BugDetail/Tags';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import BugDetails from 'src/common/components/BugDetail/Details';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';

const DetailContainer = styled.div`
  position: sticky;
  display: block;
  top: 0;
  width: 100%;
  background-color: white;
  border: ${({ theme }) => theme.palette.grey[300]} 1px solid;
  border-top-left-radius: ${({ theme }) => theme.space.xs};
  border-bottom-left-radius: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.lg}`};
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  overflow-y: auto;
`;

export const BugPreview = ({
  campaignId,
  bugId,
}: {
  campaignId: number;
  bugId: number;
}) => {
  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId.toString(),
    bid: bugId.toString(),
  });

  if (isLoading || isFetching || isError || !bug) return <Skeleton />;

  const { media } = bug;

  return (
    <DetailContainer>
      <BugHeader bug={bug} isPreview />
      <BugMeta bug={bug} />
      <BugTags bug={bug} campaignId={campaignId} />
      <BugDescription bug={bug} />
      {media && media.length ? <BugAttachments bug={bug} /> : null}
      <BugDetails bug={bug} />
      <BugDuplicates cid={campaignId} />
    </DetailContainer>
  );
};
