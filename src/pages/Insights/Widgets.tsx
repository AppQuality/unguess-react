import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import styled from 'styled-components';
import { ObservedThemesWidget } from './Widgets/ObservedThemesWidget';
import { ProgressMonitoringWidget } from './Widgets/ProgressMonitoringWidget';
import { UserAnalysisWidget } from './Widgets/UserAnalysisWidget';

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

const Widgets = () => {
  const { entityId } = useOutletContext<CampaignHubContext>();

  if (!entityId) {
    return null;
  }

  return (
    <div style={{ containerType: 'inline-size' }}>
      <Grid style={{ paddingTop: appTheme.space.xxl }}>
        <UserAnalysisWidget campaignId={entityId} />
        <ObservedThemesWidget campaignId={entityId} />
        <ProgressMonitoringWidget campaignId={entityId} />
      </Grid>
    </div>
  );
};

export { Widgets };
