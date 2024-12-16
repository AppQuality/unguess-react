import {
  PageHeader,
  Skeleton,
  XL,
  getColor,
} from '@appquality/unguess-design-system';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { GroupBy, Order, OrderBy } from 'src/features/bugsPage/bugsPageSlice';
import {
  setCampaignId,
  setPermissionSettingsTitle,
} from 'src/features/navigation/navigationSlice';
import { useBugs } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugs';
import { useBugsByState } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugsByState';
import { useBugsByUseCase } from 'src/pages/Bugs/Content/BugsTable/hooks/useBugsByUseCase';
import { styled } from 'styled-components';
import { ActionsMenu } from './ActionsMenu';
import { AppliedFilters } from './AppliedFilters';
import { BreadCrumbs } from './Breadcrumb';
import { OrderbyTag } from './OrderbyTag';
import { Pagination } from './Pagination';
import { StatusSelect } from './StatusSelect';
import { UsecaseSelect } from './UsecaseSelect';
import { getGroupedBugs } from './getGroupedBugs';

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
    isLoading: isUsecaseLoading,
  } = useBugsByUseCase(Number(campaignId));
  const {
    data: { bugsByStates },
    isLoading: isStateLoading,
  } = useBugsByState(Number(campaignId));
  const {
    data: { allBugs: ungroupedBugs },
    isLoading: isUngroupedLoading,
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

  // with this we update paginationItems only when bug.id changes (or at first load from api), ie when the user navigates to a different bug
  // to keep track of next and prev even when the user update bug properties like status or usecase
  const paginationItems = useMemo(
    () =>
      getGroupedBugs(
        groupBy,
        bugsByUseCases,
        bugsByStates,
        ungroupedBugs,
        bug.custom_status.id,
        bug.application_section.id
      ),
    [bug.id, isUsecaseLoading, isStateLoading, isUngroupedLoading]
  );

  const currentIndex = useMemo(
    () => paginationItems?.findIndex((item) => item.id === bug.id),
    [paginationItems]
  );

  // we need to compute the current status (or current usecase) from the paginationItems array
  // because bug properties can change due to user actions (like changing status or usecase)
  // however, the header should keep the info of the bug as they where when the user navigated to it
  const currentStatus = useMemo(
    () => paginationItems?.find((item) => item.id === bug.id)?.custom_status.id,
    [paginationItems]
  );
  const currentUsecase = useMemo(
    () =>
      paginationItems?.find((item) => item.id === bug.id)?.application_section
        .id,
    [paginationItems]
  );

  // still, bugsNumber should be updated with live data
  const bugsNumber = useMemo(
    () =>
      getGroupedBugs(
        groupBy,
        bugsByUseCases,
        bugsByStates,
        ungroupedBugs,
        currentStatus,
        currentUsecase
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
          {searchParams.size > 0 && (
            <>
              <OrderbyTag orderBy={orderBy} order={order} />
              <AppliedFilters />
              {groupBy === 'usecase' && (
                <UsecaseSelect
                  usecases={bugsByUseCases}
                  currentUsecase={currentUsecase?.toString()}
                />
              )}
              {groupBy === 'bugState' && (
                <StatusSelect
                  statuses={bugsByStates}
                  currentStatus={currentStatus?.toString()}
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
            </>
          )}
          <ActionsMenu bug={bug} />
        </Wrapper>
      </PageHeader>
    </StyledContainer>
  );
};

export default Header;
