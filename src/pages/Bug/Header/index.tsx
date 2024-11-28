import { useAppDispatch } from 'src/app/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  XL,
  PageHeader,
  Skeleton,
  Tooltip,
  Pagination,
  CursorPagination,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import {
  setCampaignId,
  setPermissionSettingsTitle,
} from 'src/features/navigation/navigationSlice';
import { useBugsByUseCase } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugsByUseCase';
import { useBugsByState } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugsByState';
import { useBugs } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugs';
import { GroupBy } from 'src/features/bugsPage/bugsPageSlice';
import { BugByUsecaseType } from 'src/pages/Bugs/Content/BugsTable/types';
import { appTheme } from 'src/app/theme';
import { BreadCrumbs } from './Breadcrumb';

interface Props {
  campaignId: string;
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
}

const StyledContainer = styled(LayoutWrapper)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const filterLabels = {
  unique: 'Unique only',
  unread: 'Unread only',
  severities: 'Severities',
  devices: 'Devices',
  os: 'OS',
  priorities: 'Priorities',
  replicabilities: 'Replicabilities',
};

const renderFilterItems = (
  filterBy: Partial<Record<keyof typeof filterLabels, any>>
) =>
  (Object.keys(filterLabels) as Array<keyof typeof filterLabels>).map((key) => {
    if (key in filterBy) {
      return (
        <li key={key}>
          <strong>{filterLabels[key]}:</strong>{' '}
          {Array.isArray(filterBy[key])
            ? filterBy[key].map((item: any) => item).join(', ')
            : null}
        </li>
      );
    }
    return null;
  });

const Header = ({ campaignId, bug }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });
  const {
    data: { bugsByUseCases },
    isError: isUsecaseError,
    isLoading: isUsecaseLoading,
  } = useBugsByUseCase(Number(campaignId));
  const {
    data: { bugsByStates },
    isError: isStateError,
    isLoading: isStateLoading,
  } = useBugsByState(Number(campaignId));
  const {
    data: { allBugs: ungroupedBugs },
    isLoading: isUngroupedLoading,
    isError: isUngroupedError,
  } = useBugs(Number(campaignId));
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState();

  const order = useMemo(() => searchParams.get('order'), [searchParams]);
  const orderBy = useMemo(() => searchParams.get('orderBy'), [searchParams]);
  const filterBy = useMemo(() => {
    const filtersFromParams = {
      severities: searchParams.getAll('severities'),
      devices: searchParams.getAll('devices'),
      unique: searchParams.get('unique') === 'true',
      unread: searchParams.get('unread') === 'true',
      os: searchParams.getAll('os'),
      priorities: searchParams.getAll('priorities'),
      replicabilities: searchParams.getAll('replicabilities'),
      types: searchParams.getAll('types'),
      tags: searchParams.getAll('tags'),
    };
    return (
      Object.keys(filtersFromParams) as Array<keyof typeof filtersFromParams>
    ).reduce((acc, key) => {
      if (
        Array.isArray(filtersFromParams[key]) &&
        filtersFromParams[key].length
      ) {
        acc[key] = filtersFromParams[key];
      }
      if (!Array.isArray(filtersFromParams[key]) && filtersFromParams[key]) {
        acc[key] = filtersFromParams[key];
      }
      return acc;
    }, {} as Partial<Record<keyof typeof filtersFromParams, any>>);
  }, [searchParams]);

  const groupBy: GroupBy = useMemo(() => {
    switch (searchParams.get('groupBy')) {
      case 'usecase':
        return 'usecase';
      case 'bugState':
        return 'bugState';
      default:
        return 'ungrouped';
    }
  }, [searchParams]);

  useEffect(() => {
    if (campaign) {
      dispatch(setPermissionSettingsTitle(campaign.customer_title));
      dispatch(setCampaignId(campaign.id));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
    };
  }, [campaign]);

  const paginationItems = useMemo(() => {
    switch (groupBy) {
      case 'usecase':
        return bugsByUseCases.find(
          (useCaseBugs: BugByUsecaseType) =>
            useCaseBugs.useCase.id === bug.application_section.id
        )?.bugs;
      case 'bugState':
        return bugsByStates.find(
          (stateBugs) => stateBugs.state.id === bug.custom_status.id
        )?.bugs;
      case 'ungrouped':
        return ungroupedBugs;
      default:
        return [];
    }
  }, [groupBy, bugsByUseCases, bugsByStates, ungroupedBugs]);

  const currentIndex = useMemo(
    () => paginationItems?.findIndex((item) => item.id === bug.id),
    [paginationItems, bug]
  );

  const handlePagination = useCallback(
    (v: number) => {
      if (paginationItems && paginationItems[v]) {
        const bugId = encodeURIComponent(paginationItems[v].id);
        navigate({
          pathname: `/campaigns/${campaignId}/bugs/${bugId}`,
          search: searchParams.toString(),
        });
      }
    },
    [searchParams, paginationItems, campaignId]
  );

  if (isCampaignLoading || isCampaignFetching || isCampaignError || !campaign) {
    return (
      <LayoutWrapper>
        <PageHeader>
          <Skeleton height="50px" />
        </PageHeader>
      </LayoutWrapper>
    );
  }
  return (
    <StyledContainer isNotBoxed>
      <PageHeader style={{ border: 'none' }}>
        <BreadCrumbs campaign={campaign} />
        <Wrapper>
          <XL>BUGID: {bug.id}</XL>
          <span>
            orderBy: {orderBy} {order}
          </span>
          <span>
            applied filters: {Object.keys(filterBy).length}{' '}
            {Object.keys(filterBy).length > 0 && (
              <Tooltip
                size="large"
                type="light"
                content={
                  <ul
                    style={{
                      listStyleType: 'disc',
                      paddingLeft: appTheme.space.sm,
                    }}
                  >
                    {renderFilterItems(filterBy)}
                  </ul>
                }
              >
                <span>(i)</span>
              </Tooltip>
            )}
          </span>
          {paginationItems &&
            paginationItems.length > 1 &&
            `${paginationItems.length} bugs`}
          {paginationItems &&
            paginationItems.length > 1 &&
            typeof currentIndex !== 'undefined' && (
              <CursorPagination
                aria-label="Cursor pagination"
                style={{ justifyContent: 'end' }}
              >
                <CursorPagination.Previous
                  onClick={() => {
                    handlePagination(currentIndex - 1);
                  }}
                  disabled={currentIndex === 0}
                >
                  {t('__LIST_PAGE_PREVIOUS')}
                </CursorPagination.Previous>
                <CursorPagination.Next
                  onClick={() => {
                    handlePagination(currentIndex + 1);
                  }}
                  disabled={currentIndex === paginationItems.length - 1}
                >
                  {t('__LIST_PAGE_NEXT')}
                </CursorPagination.Next>
              </CursorPagination>
            )}
          <ShareButton bug={bug}>
            {(setModalOpen) => (
              <Button onClick={() => setModalOpen(true)}>
                <Button.StartIcon>
                  <ShareIcon />
                </Button.StartIcon>
                {t('__BUG_PAGE_HEADER_SHARE_LINK_CTA', 'Share public link')}
              </Button>
            )}
          </ShareButton>
        </Wrapper>
      </PageHeader>
    </StyledContainer>
  );
};

export default Header;
