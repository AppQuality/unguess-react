import { XL, MD, SM } from '@appquality/unguess-design-system';
import { ReactComponent as OSIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { Bug } from 'src/features/api';
import { IconPill } from 'src/common/components/pills/IconPill';
import { Pipe } from 'src/common/components/Pipe';
import { NeedReviewPill } from './NeedReviewPill';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
`;

const SeverityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.xxs} 0;
`;

const BugInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.space.xxs} 0;
`;

function getDeviceIcon(device: string) {
  switch (device) {
    case 'smartphone':
      return <SmartphoneIcon />;
    case 'tablet':
      return <TabletIcon />;
    case 'desktop':
      return <DesktopIcon />;
    default:
      return null;
  }
}

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => (
  <Container>
    <SeverityContainer>
      <SeverityPill severity={bug.severity.name.toLowerCase() as Severities} />
      {bug.status.id === 4 && <NeedReviewPill />}
    </SeverityContainer>
    <XL
      isBold
      style={{
        marginTop: globalTheme.space.xxs,
        marginBottom: `${globalTheme.space.base}px`,
        color: globalTheme.palette.grey[800],
      }}
    >
      {bug.title.compact}
    </XL>
    <MD
      style={{
        color: globalTheme.palette.grey[600],
        marginBottom: globalTheme.space.md,
      }}
    >
      {bug.title.context ? bug.title.context.join(', ') : null}
    </MD>
    <BugInfo>
      <SM style={{ textTransform: 'capitalize' }}>{bug.type.name}</SM>
      <Pipe style={{ height: globalTheme.lineHeights.md }} />
      <IconPill
        size="medium"
        title={
          <SM>
            {bug.device.type === 'desktop'
              ? bug.device.desktop_type
              : `${bug.device.manufacturer} ${bug.device.model}`}
          </SM>
        }
        icon={getDeviceIcon(bug.device.type)}
        style={{ textTransform: 'capitalize' }}
      />
      <IconPill
        size="medium"
        title={
          <SM>
            {bug.device.os} {bug.device.os_version}
          </SM>
        }
        icon={<OSIcon />}
        style={{ textTransform: 'capitalize' }}
      />
    </BugInfo>
  </Container>
);
