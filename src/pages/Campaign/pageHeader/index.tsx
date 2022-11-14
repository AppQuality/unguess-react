import {
  Anchor,
  InputToggle,
  PageHeader,
  Skeleton,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  useGetCampaignsByCidQuery,
  useGetProjectsByPidQuery,
  usePatchCampaignsByCidMutation,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { HeaderFooter } from './pageHeaderFooter';

const StyledPillsWrapper = styled(PageHeader.Counters)`
  width: 100%;
`;

const CampaignPageHeader = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);

  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });

  const {
    isLoading: isProjectLoading,
    isFetching: isProjectFetching,
    isError: isProjectError,
    data: project,
  } = useGetProjectsByPidQuery({
    pid: campaign?.project.id ?? 0,
  });

  const [itemTitle, setItemTitle] = useState<string>(
    campaign?.customer_title ?? ''
  );

  const projectRoute = useLocalizeRoute(
    `projects/${campaign?.project.id ?? 0}`
  );

  const [patchCampaign] = usePatchCampaignsByCidMutation();

  // Memoize InputToggle component to avoid re-rendering
  const InputToggleMemo = useMemo(
    () => (
      <InputToggle>
        <InputToggle.Item
          textSize="xxxl"
          maxLength={64}
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          onBlur={async (e) => {
            try {
              if (
                e.currentTarget.value &&
                e.currentTarget.value !== campaign?.customer_title
              ) {
                await patchCampaign({
                  cid: campaignId,
                  body: { customer_title: e.currentTarget.value },
                }).unwrap();
              }
            } catch {
              // eslint-disable-next-line
              alert(t('__CAMPAIGN_PAGE_UPDATE_CAMPAIGN_NAME_ERROR'));
            }
          }}
          style={{ paddingLeft: 0 }}
        />
      </InputToggle>
    ),
    [campaign, itemTitle]
  );

  if (
    isCampaignLoading ||
    isProjectLoading ||
    isCampaignFetching ||
    isProjectFetching ||
    !project ||
    !campaign
  ) {
    return (
      <PageHeader>
        <PageHeader.Main infoTitle="My Campaign">
          <Skeleton
            width="60%"
            height="20px"
            style={{ marginBottom: theme.space.lg }}
          />
          <Skeleton width="80%" height="40px" />
        </PageHeader.Main>
      </PageHeader>
    );
  }
  return status === 'idle' ||
    status === 'loading' ||
    isCampaignError ||
    isProjectError ? null : (
    <PageHeader>
      <PageHeader.Breadcrumb>
        <Anchor onClick={() => navigate(projectRoute)}>{project.name}</Anchor>
        <Span>{campaign.customer_title}</Span>
      </PageHeader.Breadcrumb>
      <PageHeader.Main infoTitle={campaign.customer_title}>
        <PageHeader.Title>{InputToggleMemo}</PageHeader.Title>
        <StyledPillsWrapper>
          <HeaderFooter campaign={campaign} />
        </StyledPillsWrapper>
      </PageHeader.Main>
    </PageHeader>
  );
};
export default CampaignPageHeader;
