import { GlobalAlert, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { usePlanContext } from '../../context/planContext';
import { Controls } from '../../Controls';
import { SaveAsTemplateModal } from '../../modals/SaveAsTemplateModal';
import { BreadCrumbTabs } from './BreadCrumbTabs';
import { useGlobalAlert } from './getGlobalAlert';
import { TitleGroup } from './TitleGroup';

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    grid-row-gap: ${(p) => p.theme.space.xxs};
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  &:last-child {
    justify-content: flex-end;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    &:last-child {
      display: none;
    }
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
  const { isSaveTemplateModalOpen } = usePlanContext();
  const { planId } = useParams();
  const globalAlert = useGlobalAlert();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

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

      {isSaveTemplateModalOpen && planId && (
        <SaveAsTemplateModal planId={planId} />
      )}
      {globalAlert}
      {isMobile && (
        <GlobalAlert
          message={<>{t('PLAN_GLOBAL_ALERT_MOBILE_GO_TO_DESKTOP_MESSAGE')}</>}
          title={t('PLAN_GLOBAL_ALERT_MOBILE_GO_TO_DESKTOP_TITLE')}
          type="accent"
        />
      )}
    </>
  );
};

export default PlanPageHeader;
