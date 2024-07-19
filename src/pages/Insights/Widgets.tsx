import { LG } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { ObservedThemesWidget } from './Widgets/ObservedThemesWidget';
import { ProgressMonitoringWidget } from './Widgets/ProgressMonitoringWidget';
import { UserAnalysisWidget } from './Widgets/UserAnalysisWidget';

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
  const { campaignId } = useParams();

  if (!campaignId) {
    return null;
  }

  return (
    <Container>
      <UserAnalysisWidget campaignId={campaignId} />
      <ObservedThemesWidget campaignId={campaignId} />
      <ProgressMonitoringWidget campaignId={campaignId} />
    </Container>
  );
};

export { Widgets };
