import { Skeleton } from '@appquality/unguess-design-system';
import { useEffect, useRef } from 'react';
import { AnchorButtons } from 'src/common/components/BugDetail/AnchorButtons';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import ChangeStatusDropdown from 'src/common/components/BugDetail/BugStateSelect/ChangeStatusDropdown';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugDetails from 'src/common/components/BugDetail/Details';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import {
  useGetCampaignsByCidBugsAndBidCommentsQuery,
  useGetCampaignsByCidBugsAndBidQuery,
} from 'src/features/api';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { BugCommentsDetail } from './components/BugCommentsDetails';
import BugHeader from './components/BugHeader';
import { BugPreviewContextProvider } from './context/BugPreviewContext';

export const filtersHeight = 56;

const DetailContainer = styled.div<{
  isFetching?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height} -
      ${filtersHeight}px
  );

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    top: ${filtersHeight}px;
  }
`;

const ScrollingContainer = styled.div`
  padding: 0 ${({ theme }) => `${theme.space.lg}`};
  padding-bottom: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.sm};
  overflow-y: auto;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
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
    refetch,
  } = useGetCampaignsByCidBugsAndBidQuery(
    {
      cid: campaignId.toString(),
      bid: bugId.toString(),
    },
    { pollingInterval: 1200000 }
  );
  const currentBugId = getSelectedBugId();
  const { data: comments } = useGetCampaignsByCidBugsAndBidCommentsQuery({
    cid: campaignId.toString(),
    bid: bugId.toString(),
  });

  // Reset container scroll position when bug changes
  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = 0;
    }
  }, [currentBugId]);

  if (isLoading || isError || !bug) return <Skeleton />;

  const { media } = bug;
  const scrollerBoxId = 'bug-preview-container';

  return (
    <DetailContainer isFetching={isFetching}>
      <BugHeader bug={bug} comments={comments} />
      <ScrollingContainer ref={refScroll} id={scrollerBoxId}>
        <BugPreviewContextProvider>
          <BugMeta bug={bug} />
          <AnchorButtons bug={bug} scrollerBoxId={scrollerBoxId} />
          <GridWrapper>
            <ChangeStatusDropdown
              currentStatusId={bug.custom_status.id}
              campaignId={campaignId.toString()}
              bugId={currentBugId ? currentBugId.toString() : ''}
            />
            <BugPriority bug={bug} />
          </GridWrapper>
          <BugTags bug={bug} refetchBugTags={refetch} />
          <BugDescription bug={bug} />
          {media && media.length ? <BugAttachments bug={bug} /> : null}
          <BugCommentsDetail
            commentsCount={comments?.items.length ?? 0}
            bugId={bugId}
            campaignId={campaignId}
          />
          <BugDetails bug={bug} />
          {currentBugId && (
            <BugDuplicates cid={campaignId} bugId={currentBugId} />
          )}
        </BugPreviewContextProvider>
      </ScrollingContainer>
    </DetailContainer>
  );
};
