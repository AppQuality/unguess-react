import { MD, Skeleton, SM } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';

const StyledMD = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const InfoBugRow = ({ campaignId }: { campaignId: number }) => {
  const filterBy = getSelectedFiltersIds();

  const {
    isLoading,
    isFetching,
    isError,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString() ?? '0',
    filterBy: {
      ...(filterBy?.types ? { types: filterBy.types.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
      ...(filterBy?.read && filterBy.read === 'unread'
        ? { read: 'false' }
        : {}),
      ...(filterBy?.unique && filterBy.unique === 'unique'
        ? { is_duplicated: '0' }
        : {}),
    },
    ...(filterBy?.search ? { search: filterBy.search } : {}),
  });

  if (isError) return null;

  // Count bugs with read = false
  const totalBugs = bugs?.total ?? 0;
  const unreadBugs = bugs?.items?.filter((bug) => bug.read === false) ?? [];

  return (
    <StyledDiv>
      {isLoading || isFetching ? (
        <Skeleton height="18px" />
      ) : (
        <>
          <StyledMD isBold>
            {filterBy?.unique && filterBy.unique === 'unique' ? (
              <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_UNIQUE_BUGS_COUNTER">
                {{ uniqueBugs: totalBugs }} unique bugs
              </Trans>
            ) : (
              <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_WITH_DUPLICATED_BUGS_COUNTER">
                {{ uniqueBugs: totalBugs }} bugs
              </Trans>
            )}
          </StyledMD>
          <StyledSM>
            <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_UNREAD_BUGS_COUNTER">
              (Unread: <span>{{ unreadBugs: unreadBugs.length }}</span>/
              {{ uniqueBugs: totalBugs }})
            </Trans>
          </StyledSM>
        </>
      )}
    </StyledDiv>
  );
};
