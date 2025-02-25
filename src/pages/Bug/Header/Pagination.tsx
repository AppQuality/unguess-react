import { CursorPagination } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Bug } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { useCampaignBugs } from 'src/pages/Bugs/Content/BugsTable/hooks/useCampaignBugs';

interface Props {
  paginationItems: (Bug & {
    tags?: { tag_id: number; tag_name: string }[] | undefined;
    siblings: number;
    comments: number;
  })[];
  campaignId: string;
  currentIndex: number;
}

export const Pagination = ({
  paginationItems,
  campaignId,
  currentIndex,
}: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sendGTMEvent = useSendGTMevent();
  const { refetch } = useCampaignBugs(Number(campaignId));
  const handlePagination = useCallback(
    (v: number) => {
      if (paginationItems && paginationItems[Number(v)]) {
        const bugId = encodeURIComponent(paginationItems[Number(v)].id);
        refetch();
        sendGTMEvent({
          event: 'bug_header_action',
          action: 'navigation',
        });

        navigate({
          pathname: `/campaigns/${campaignId}/bugs/${bugId}`,
          search: searchParams.toString(),
        });
      }
    },
    [searchParams, paginationItems, campaignId]
  );

  return (
    <CursorPagination
      aria-label="Cursor pagination"
      style={{ justifyContent: 'end' }}
    >
      <CursorPagination.Previous
        onClick={() => {
          handlePagination(currentIndex - 1);
        }}
        disabled={currentIndex < 1}
      >
        {t('__LIST_PAGE_PREVIOUS')}
      </CursorPagination.Previous>
      <CursorPagination.Next
        onClick={() => {
          handlePagination(currentIndex + 1);
        }}
        disabled={
          currentIndex + 1 >= paginationItems.length || currentIndex < 0
        }
      >
        {t('__LIST_PAGE_NEXT')}
      </CursorPagination.Next>
    </CursorPagination>
  );
};
