import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import BugMeta from 'src/common/components/BugDetail/Meta';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugDescription from 'src/common/components/BugDetail/Description';
import BugAttachments from 'src/common/components/BugDetail/Attachments';
import BugDetails from 'src/common/components/BugDetail/Details';
import { BugDuplicates } from 'src/common/components/BugDetail/BugDuplicates';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { useEffect, useRef } from 'react';
import BugStateDropdown from 'src/common/components/BugDetail/BugStateDropdown';
import { AnchorButtons } from 'src/common/components/BugDetail/AnchorButtons';
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
    refetch: refetchBugTags,
  } = useGetCampaignsByCidBugsAndBidQuery(
    {
      cid: campaignId.toString(),
      bid: bugId.toString(),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const currentBugId = getSelectedBugId();

  // Reset container scroll position when bug changes
  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = 0;
    }
  }, [currentBugId]);

  if (isLoading || isError || !bug) return <Skeleton />;

  const { media } = bug;
  const scrollerBoxId = 'bug-preview-container';

  const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: ${({ theme }) => theme.space.sm};
  `;

  return (
    <DetailContainer isFetching={isFetching}>
      <BugHeader bug={bug} />
      <ScrollingContainer ref={refScroll} id={scrollerBoxId}>
        <BugPreviewContextProvider>
          <BugMeta bug={bug} />
          <AnchorButtons bug={bug} scrollerBoxId={scrollerBoxId} />
          <GridWrapper>
            <BugStateDropdown bug={bug} />
            <BugPriority bug={bug} />
          </GridWrapper>
          <BugDescription bug={bug} />
          {media && media.length ? <BugAttachments bug={bug} /> : null}
          <BugDetails bug={bug} refetchBugTags={() => refetchBugTags()} />
          {currentBugId && (
            <BugDuplicates cid={campaignId} bugId={currentBugId} />
          )}
        </BugPreviewContextProvider>
      </ScrollingContainer>
    </DetailContainer>
  );
};
