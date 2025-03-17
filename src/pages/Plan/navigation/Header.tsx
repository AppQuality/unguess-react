import { PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import styled from 'styled-components';
import { Controls } from '../Controls';
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

const PlanPageHeader = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default PlanPageHeader;
