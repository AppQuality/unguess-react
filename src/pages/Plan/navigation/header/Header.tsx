import { GlobalAlert, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetPlansByPidQuery } from 'src/features/api';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import styled from 'styled-components';
import { Controls } from '../../Controls';
import { BreadCrumbTabs } from './BreadCrumbTabs';
import { TitleGroup } from './TitleGroup';

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  &:last-child {
    justify-content: flex-end;
  }
`;

const StickyLayoutWrapper = styled(LayoutWrapper)`
  background-color: ${(p) => p.theme.palette.white};
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    z-index: 101;
  }
`;

const PlanPageHeader = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { planId } = useParams();
  const { data: plan } = useGetPlansByPidQuery(
    {
      pid: Number(planId).toString(),
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

  const getGlobalAlert = () => {
    if (!plan) return null;
    const { status: planStatus } = getPlanStatus(plan, t);
    switch (planStatus) {
      case 'submitted':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_TITLE')}
            type="info"
          />
        );
      case 'pending_quote_review':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_AWATING_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_AWATING_STATE_TITLE')}
            type="accent"
          />
        );
      case 'approved':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_APPROVED_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_APPROVED_STATE_TITLE')}
            type="success"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <StickyLayoutWrapper isNotBoxed id="sticky-plan-page-header">
        <PageHeader
          style={{
            padding: `${appTheme.space.md} 0`,
            border: 'none',
          }}
          data-qa="plan-page-header"
        >
          <PageHeader.Main mainTitle={t('__PLAN_PAGE_TITLE')}>
            <StyledWrapper>
              <SectionWrapper>
                <TitleGroup />
              </SectionWrapper>
              <SectionWrapper>
                <BreadCrumbTabs />
              </SectionWrapper>
              <SectionWrapper>
                <Controls />
              </SectionWrapper>
            </StyledWrapper>
          </PageHeader.Main>
        </PageHeader>
      </StickyLayoutWrapper>
      {getGlobalAlert()}
    </>
  );
};

export default PlanPageHeader;
