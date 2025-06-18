import {
  Anchor,
  GlobalAlert,
  MD,
  PageHeader,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import styled from 'styled-components';
import { useMoveCampaignModalContext } from '../MoveCampaignModal';
import { EditableTitle } from './EditableTitle';
import { HeaderSkeleton } from './HeaderSkeleton';
import { Metas } from './Meta';
import { useCampaign } from './useCampaign';

const StyledAlertTextWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  align-items: center;
  justify-content: flex-start;
`;

const CampaignPageHeader = ({ campaignId }: { campaignId: number }) => {
  const { setIsOpen } = useMoveCampaignModalContext();
  const navigate = useNavigate();
  const { isUserLoading, isLoading, isError, campaign, project } =
    useCampaign(campaignId);

  const { t } = useTranslation();

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return isUserLoading || isError ? null : (
    <>
      {!!project.is_archive && (
        <GlobalAlert
          type="warning"
          message={
            <StyledAlertTextWrapper>
              <MD isBold>{t('__CAMPAIGN_ARCHIVE_HEADER_ALERT_1')}</MD>
              <MD>{t('__CAMPAIGN_ARCHIVE_HEADER_ALERT_2')}</MD>
            </StyledAlertTextWrapper>
          }
          cta={{
            label: t('__CAMPAIGN_ARCHIVE_UNARCHIVE_BUTTON'),
            onClick: () => {
              setIsOpen(true);
            },
          }}
        />
      )}
      <LayoutWrapper>
        <PageHeader>
          <PageHeader.Breadcrumbs>
            {project.hasAccess ? (
              <Anchor
                id="breadcrumb-parent"
                onClick={() => navigate(project.route)}
              >
                {project.name}
              </Anchor>
            ) : (
              project.name
            )}
          </PageHeader.Breadcrumbs>
          <PageHeader.Main mainTitle={campaign.customer_title}>
            <PageHeader.Title>
              <EditableTitle campaignId={campaignId} />
            </PageHeader.Title>
            <PageHeader.Meta>
              <Metas campaign={campaign} />
            </PageHeader.Meta>
          </PageHeader.Main>
        </PageHeader>
      </LayoutWrapper>
    </>
  );
};
export default CampaignPageHeader;
