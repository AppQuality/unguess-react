import { useAppDispatch } from 'src/app/hooks';
import { useEffect, useMemo } from 'react';
import {
  XL,
  PageHeader,
  Skeleton,
  getColor,
} from '@appquality/unguess-design-system';
import { useSearchParams } from 'react-router-dom';
import {
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import {
  setCampaignId,
  setPermissionSettingsTitle,
} from 'src/features/navigation/navigationSlice';
import { useBugsByUseCase } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugsByUseCase';
import { useBugsByState } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugsByState';
import { useBugs } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugs';
import { GroupBy, Order, OrderBy } from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import { BreadCrumbs } from './Breadcrumb';
import { UsecaseSelect } from './UsecaseSelect';
import { StatusSelect } from './StatusSelect';
import { getGroupedBugs } from './getGroupedBugs';
import { ActionsMenu } from './ActionsMenu';
import { AppliedFilters } from './AppliedFilters';
import { Pagination } from './Pagination';
import { OrderbyTag } from './OrderbyTag';

export interface Props {
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
  gap: ${({ theme }) => theme.space.md};

  > * {
    flex: 0 0 auto;
    margin-right: 0;
    padding: 0;

    &.title {
      flex-grow: 1;
    }
  }
`;

const Header = ({ campaignId, bug }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

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

  const order: Order = useMemo(() => {
    switch (searchParams.get('order')) {
      case 'ASC':
        return 'ASC';
      default:
        return 'DESC';
    }
  }, [searchParams]);
  const orderBy: OrderBy = useMemo(() => {
    switch (searchParams.get('orderBy')) {
      case 'severity_id':
        return 'severity_id';
      case 'priority_id':
        return 'priority_id';
      default:
        return 'severity_id';
    }
  }, [searchParams]);

  const groupBy: GroupBy | undefined = useMemo(() => {
    switch (searchParams.get('groupBy')) {
      case 'usecase':
        return 'usecase';
      case 'bugState':
        return 'bugState';
      case 'ungrouped':
        return 'ungrouped';
      default:
        return undefined;
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

  const paginationItems = useMemo(
    () =>
      getGroupedBugs(
        groupBy,
        bugsByUseCases,
        bugsByStates,
        ungroupedBugs,
        bug,
        searchParams
      ),
    [bug.id]
  ); // with this we update paginationItems only when the bug changes, ie when the user navigates to a different bug

  const currentIndex = useMemo(
    () => paginationItems?.findIndex((item) => item.id === bug.id),
    [bug.id]
  );

  const bugsNumber = useMemo(
    () =>
      getGroupedBugs(
        groupBy,
        bugsByUseCases,
        bugsByStates,
        ungroupedBugs,
        bug,
        searchParams
      )?.length,
    [bugsByStates, bugsByUseCases, ungroupedBugs, groupBy, bug]
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
          <XL
            className="title"
            isBold
            color={getColor(appTheme.colors.primaryHue, 600)}
          >
            BUGID: {bug.id}
          </XL>
          <OrderbyTag orderBy={orderBy} order={order} />
          <AppliedFilters />
          {groupBy === 'usecase' && (
            <UsecaseSelect
              usecases={bugsByUseCases}
              currentUsecase={bug.application_section.id?.toString()}
            />
          )}
          {groupBy === 'bugState' && (
            <StatusSelect
              statuses={bugsByStates}
              currentStatus={bug.custom_status.id?.toString()}
            />
          )}
          {`${bugsNumber || 1} bugs`}
          {paginationItems && typeof currentIndex !== 'undefined' && (
            <Pagination
              paginationItems={paginationItems}
              campaignId={campaignId}
              currentIndex={currentIndex}
            />
          )}
          <ActionsMenu bug={bug} />
        </Wrapper>
      </PageHeader>
    </StyledContainer>
  );
};

export default Header;
