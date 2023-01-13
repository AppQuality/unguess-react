import { LG, MD, SM } from '@appquality/unguess-design-system';
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

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.sm};
`;

const BugInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
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
    <SeverityPill severity={bug.severity.name.toLowerCase() as Severities} />
    <LG
      isBold
      style={{
        margin: `${globalTheme.space.base}px 0`,
      }}
    >
      {bug.title.compact}
    </LG>
    <MD style={{ color: globalTheme.palette.grey[600] }}>
      {bug.title.context?.map(
        (context) =>
          `${context}${
            bug.title.context && bug.title.context.length > 1 ? ', ' : ''
          }`
      )}
    </MD>
    <BugInfo>
      <SM style={{ color: globalTheme.palette.grey[600] }}>{bug.type.name}</SM>
      <Pipe />
      <IconPill title={bug.device.type} icon={getDeviceIcon(bug.device.type)} />
      <IconPill
        title={`${bug.device.os} ${bug.device.os_version}`}
        icon={<OSIcon />}
      />
    </BugInfo>
  </Container>
);
