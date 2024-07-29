import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ObservedThemesWidget } from './Widgets/ObservedThemesWidget';
import { ProgressMonitoringWidget } from './Widgets/ProgressMonitoringWidget';
import { UserAnalysisWidget } from './Widgets/UserAnalysisWidget';

const Widgets = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    return null;
  }

  const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-gap: ${appTheme.space.md};
    @container (max-width: 1100px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      .progress-monitoring-widget {
        grid-column: 1 / -1;
      }
    }
  `;

  return (
    <div style={{ containerType: 'inline-size' }}>
      <Grid style={{ paddingTop: appTheme.space.xxl }}>
        <UserAnalysisWidget campaignId={campaignId} />
        <ObservedThemesWidget campaignId={campaignId} />
        <ProgressMonitoringWidget campaignId={campaignId} />
      </Grid>
    </div>
  );
};

export { Widgets };
