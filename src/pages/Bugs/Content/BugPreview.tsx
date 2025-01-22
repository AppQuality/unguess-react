import { Skeleton } from '@appquality/unguess-design-system';
import { useEffect, useMemo, useRef } from 'react';
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
import {
  getCurrentCampaignData,
  getSelectedBugId,
} from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { useAppSelector } from 'src/app/hooks';
import { createSearchParams } from 'react-router-dom';
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
  const data = getCurrentCampaignData();

  const { orderBy, order, groupBy } = useAppSelector((state) => state.bugsPage);

  const searchParams = useMemo(() => {
    const getFilterBy = () => {
      if (!data) return {};

      const filters: { [key: string]: string | string[] } = {};
      (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
        if (key === 'severities') {
          if (Array.isArray(data.severities.selected)) {
            filters.severities = data.severities.selected.map(
              (item) => item.name
            );
          }
        }
        if (key === 'devices') {
          if (Array.isArray(data.devices.selected)) {
            filters.devices = data.devices.selected.map((item) => item.device);
          }
        }
        if (key === 'useCases') {
          if (Array.isArray(data.useCases.selected)) {
            filters.useCases = data.useCases.selected.map((item) =>
              item.id.toString()
            );
          }
        }
        if (key === 'customStatuses') {
          if (Array.isArray(data.customStatuses.selected)) {
            filters.customStatuses = data.customStatuses.selected.map((item) =>
              item.id.toString()
            );
          }
        }
        if (key === 'unique') {
          filters.unique = data.unique.selected === 'unique' ? 'true' : 'false';
        }
        if (key === 'read') {
          filters.unread = data.read.selected === 'unread' ? 'true' : 'false';
        }
        if (key === 'os') {
          if (Array.isArray(data.os.selected)) {
            filters.os = data.os.selected.map((item) => item.os);
          }
        }
        if (
          key === 'priorities' ||
          key === 'replicabilities' ||
          key === 'types'
        ) {
          if (Array.isArray(data[`${key}`].selected)) {
            filters[`${key}`] = data[`${key}`].selected.map(
              (item) => item.name
            );
          }
        }
        if (key === 'tags') {
          if (Array.isArray(data.tags.selected)) {
            filters.tags = data.tags.selected.map((item) => item.display_name);
          }
        }
        if (key === 'search' && data.search) {
          filters.search = data.search;
        }
      });
      return filters;
    };

    const newSearchParams = createSearchParams({
      order,
      orderBy,
      groupBy,
      ...(groupBy !== 'ungrouped' && {
        groupByValue:
          groupBy === 'usecase'
            ? (bug?.application_section.id || -1).toString()
            : bug?.custom_status.id?.toString() || '-1',
      }),
      ...getFilterBy(),
    });
    return newSearchParams;
  }, [order, orderBy, groupBy, data, bug]);

  if (isLoading || isError || !bug) return <Skeleton />;

  const { media } = bug;
  const scrollerBoxId = 'bug-preview-container';

  return (
    <DetailContainer isFetching={isFetching}>
      <BugHeader bug={bug} comments={comments} searchParams={searchParams} />
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
            searchParams={searchParams}
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
