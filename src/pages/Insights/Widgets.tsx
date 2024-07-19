import { LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { UserAnalysisWidget } from './Widgets/UserAnalysisWidget';
import { ObservedThemesWidget } from './Widgets/ObservedThemesWidget';
import { ProgressMonitoringWidget } from './Widgets/ProgressMonitoringWidget';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};
  @media ${LG} {
    flex-direction: row;
  }

  & > * {
    flex: 0 1 33%;
  }
`;

const Widgets = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <UserAnalysisWidget />
      <ObservedThemesWidget />
      <ProgressMonitoringWidget />
    </Container>
  );
};

export { Widgets };
