import { useAppDispatch } from 'src/app/hooks';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  XL,
  PageHeader,
  Skeleton,
  Tooltip,
  Pagination,
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

  const order = useMemo(() => searchParams.get('order'), [searchParams]);
  const orderBy = useMemo(() => searchParams.get('orderBy'), [searchParams]);
  const filterBy = useMemo(
    () => searchParams.getAll('filterBy'),
    [searchParams]
  );
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
    console.log('current Bug', bug);
    if (groupBy === 'usecase' && bugsByUseCases) {
      console.log('bugsByUseCase', bugsByUseCases);
    }
    if (groupBy === 'bugState' && bugsByStates) {
      console.log('bugsByState', bugsByStates);
    }
    if (groupBy === 'ungrouped' && ungroupedBugs) {
      console.log('ungroupedBugs', ungroupedBugs);
    }
  }, [groupBy, bugsByUseCases, bugsByStates, ungroupedBugs]);

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
          (stateBugs) => stateBugs.state.id === bug.status.id
        )?.bugs;
      case 'ungrouped':
        return ungroupedBugs;
      default:
        return [];
    }
  }, [groupBy, bugsByUseCases, bugsByStates, ungroupedBugs]);

  console.log('paginationItems', paginationItems);
  const currentPage = useMemo(
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
            applied filters: {filterBy.length}{' '}
            <Tooltip
              content={
                <span>{filterBy.map((filter) => filter).join(', ')}</span>
              }
            >
              <span>(i)</span>
            </Tooltip>
          </span>
          {paginationItems &&
            paginationItems.length > 1 &&
            typeof currentPage !== 'undefined' && (
              <Pagination
                onChange={handlePagination}
                currentPage={currentPage}
                totalPages={paginationItems.length}
              />
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
