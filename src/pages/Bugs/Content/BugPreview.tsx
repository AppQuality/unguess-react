import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugTags from 'src/common/components/BugDetail/Tags';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import BugDetails from 'src/common/components/BugDetail/Details';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { useEffect, useRef } from 'react';
import BugHeader from './components/BugHeader';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  border: ${({ theme }) => theme.palette.grey[300]} 1px solid;
  border-top-left-radius: ${({ theme }) => theme.space.xs};
  border-bottom-left-radius: ${({ theme }) => theme.space.xs};
  padding: 0;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  overflow: hidden;
`;

const ScrollingContainer = styled.div`
  padding: 0 ${({ theme }) => `${theme.space.lg}`};
  padding-bottom: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.sm};
  overflow-y: auto;
`;

export const BugPreview = ({
  campaignId,
  bugId,
}: {
  campaignId: number;
  bugId: number;
}) => {
  const refScroll = useRef<HTMLDivElement>(null);

  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId.toString(),
    bid: bugId.toString(),
  });
  const currentBugId = getSelectedBugId();

  // Reset container scroll position when bug changes
  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = 0;
    }
  }, [currentBugId]);

  if (isLoading || isFetching || isError || !bug) return <Skeleton />;

  const { media } = bug;

  return (
    <DetailContainer>
      <BugHeader bug={bug} />
      <ScrollingContainer ref={refScroll}>
        <BugMeta bug={bug} />
        <BugTags bug={bug} campaignId={campaignId} bugId={currentBugId ?? 0} />
        <BugDescription bug={bug} />
        {media && media.length ? <BugAttachments bug={bug} /> : null}
        <BugDetails bug={bug} />
        {currentBugId && (
          <BugDuplicates cid={campaignId} bugId={currentBugId} />
        )}
      </ScrollingContainer>
    </DetailContainer>
  );
};
