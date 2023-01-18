import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useBugDetail } from './useBugDetail';
import BugHeader from './Header';
import BugMeta from './Meta';
import BugTags from './Tags';
import BugDescription from './Description';
import BugAttachments from './Attachments';
import BugDetails from './Details';

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

const BugsDetail = ({ campaignId }: { campaignId: number }) => {
  const result = useBugDetail({
    cid: campaignId,
  });

  const { data: bug, isLoading, isFetching, isError } = result;

  if (isLoading || isFetching || isError || !bug) return <Skeleton />;

  const { media } = bug;

  return (
    <DetailContainer>
      <BugHeader bug={bug} />
      <BugMeta bug={bug} />
      <BugTags bug={bug} campaignId={campaignId} />
      <BugDescription bug={bug} />
      {media && media.length ? <BugAttachments bug={bug} /> : null}
      <BugDetails bug={bug} />
    </DetailContainer>
  );
};

export { BugsDetail };
