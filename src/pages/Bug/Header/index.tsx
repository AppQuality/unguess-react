import { useAppDispatch } from 'src/app/hooks';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  XL,
  PageHeader,
  Skeleton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
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
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const order = useMemo(() => searchParams.get('order'), [searchParams]);
  const orderBy = useMemo(() => searchParams.get('orderBy'), [searchParams]);
  const filterBy = useMemo(
    () => searchParams.getAll('filterBy'),
    [searchParams]
  );

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

  const handlePagination = useCallback(() => {
    console.log(
      'searchParams',
      searchParams.forEach((value, key) => {})
    );
  }, [searchParams]);

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
