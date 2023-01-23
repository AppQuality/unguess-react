import { Anchor, PageHeader, Span } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { HeaderSkeleton } from 'src/pages/Campaign/pageHeader/HeaderSkeleton';
import { Tools } from 'src/pages/Bugs/PageHeader/Tools';
import { useCampaign } from 'src/pages/Campaign/pageHeader/useCampaign';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getLocalizeoFirstLevelDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import BugsPageHeaderLoader from './PageHeaderLoader';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledTitle = styled(PageHeader.Title)`
  width: auto;
  white-space: nowrap;
  margin-right: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
  }
`;

const BugsPageHeader = ({ campaignId }: { campaignId: number }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isUserLoading, isLoading, isError, campaign, project } =
    useCampaign(campaignId);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return isUserLoading || isError ? null : (
    <PageHeader>
      <PageHeader.Breadcrumb>
        <Anchor id="breadcrumb-parent" onClick={() => navigate(project.route)}>
          {project.name}
        </Anchor>
        <Anchor
          onClick={() => {
            window.location.href =
              getLocalizeoFirstLevelDashboardRoute(campaignId);
          }}
        >
          {campaign.customer_title}
        </Anchor>
      </PageHeader.Breadcrumb>
      <PageHeader.Main infoTitle={campaign.customer_title}>
        <FlexWrapper>
          <StyledTitle>
            <Span isBold>{t('__PAGE_TITLE_BUGS_COLLECTION')}</Span>
          </StyledTitle>
          <Tools
            campaignId={campaignId}
            customerTitle={campaign.customer_title}
          />
        </FlexWrapper>
      </PageHeader.Main>
    </PageHeader>
  );
};
export { BugsPageHeader, BugsPageHeaderLoader };
