import { Anchor, PageHeader, XXXL } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { HeaderSkeleton } from 'src/pages/Campaign/pageHeader/HeaderSkeleton';
import { Tools } from 'src/pages/Bugs/PageHeader/Tools';
import { useCampaign } from 'src/pages/Campaign/pageHeader/useCampaign';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import BugsPageHeaderLoader from './PageHeaderLoader';
import { FlexWrapper } from './FlexWrapper';

const HeaderItemWrapper = styled.div``;

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
      </PageHeader.Breadcrumb>
      <PageHeader.Main infoTitle={campaign.customer_title}>
        <PageHeader.Title>
          <FlexWrapper>
            <HeaderItemWrapper>
              <XXXL isBold>{t('__PAGE_TITLE_BUGS_COLLECTION')}</XXXL>
            </HeaderItemWrapper>
            <HeaderItemWrapper>
              <Tools
                campaignId={campaignId}
                customerTitle={campaign.customer_title}
              />
            </HeaderItemWrapper>
          </FlexWrapper>
        </PageHeader.Title>
      </PageHeader.Main>
    </PageHeader>
  );
};
export { BugsPageHeader, BugsPageHeaderLoader };
