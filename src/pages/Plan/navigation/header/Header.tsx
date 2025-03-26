import { GlobalAlert, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import styled from 'styled-components';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useGetWorkspacesByWidPlansAndPidQuery } from 'src/features/api';
import { useParams } from 'react-router-dom';

import { BreadCrumbTabs } from './BreadCrumbTabs';
import { TitleGroup } from './TitleGroup';
import { Controls } from '../../Controls';

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

const PlanPageHeader = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { planId } = useParams();
  const { data: plan } = useGetWorkspacesByWidPlansAndPidQuery(
    {
      wid: Number(activeWorkspace?.id).toString(),
      pid: Number(planId).toString(),
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

  const planStatus =
    plan?.status === 'pending_review' ? plan?.quote?.status : plan?.status;
  const getGlobalAlert = () => {
    switch (planStatus) {
      case 'pending':
        return (
          <GlobalAlert
            message={<>{t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_MESSAGE')}</>}
            title={t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_TITLE')}
            type="info"
          />
        );
      case 'proposed':
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
      <LayoutWrapper isNotBoxed>
        <PageHeader
          style={{
            padding: `${appTheme.space.md} 0`,
            border: 'none',
          }}
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
      </LayoutWrapper>
      {getGlobalAlert()}
    </>
  );
};

export default PlanPageHeader;
