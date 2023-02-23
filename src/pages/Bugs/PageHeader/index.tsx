import { Anchor, PageHeader, Span } from '@appquality/unguess-design-system';
import { Link } from 'react-router-dom';
import { HeaderSkeleton } from 'src/pages/Campaign/pageHeader/HeaderSkeleton';
import { Tools } from 'src/pages/Bugs/PageHeader/Tools';
import { useCampaign } from 'src/pages/Campaign/pageHeader/useCampaign';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getLocalizeoFirstLevelDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import BugsPageHeaderLoader from './PageHeaderLoader';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledTitle = styled(PageHeader.Title)`
  display: flex;
  width: auto;
  white-space: nowrap;
  margin-right: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  order: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const BugsPageHeader = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { isUserLoading, isLoading, isError, campaign, project } =
    useCampaign(campaignId);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return isUserLoading || isError ? null : (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumb>
          <Link to={project.route}>
            <Anchor id="breadcrumb-parent">{project.name}</Anchor>
          </Link>
          <Link to={getLocalizeoFirstLevelDashboardRoute(campaignId)}>
            <Anchor>{campaign.customer_title}</Anchor>
          </Link>
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
    </LayoutWrapper>
  );
};
export { BugsPageHeader, BugsPageHeaderLoader };
