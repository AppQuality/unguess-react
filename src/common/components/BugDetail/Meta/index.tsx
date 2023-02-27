import { XL, MD, SM, Tag } from '@appquality/unguess-design-system';
import { ReactComponent as OSIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { Bug } from 'src/features/api';
import { Pipe } from 'src/common/components/Pipe';
import { WrappedText } from 'src/common/components/WrappedText';
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
      return <TabletIcon />;
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
      <SeverityTag
        hasBackground
        severity={bug.severity.name.toLowerCase() as Severities}
      />
      {bug.status.id === 4 && <NeedReviewPill />}
    </SeverityContainer>
    <XL
      isBold
      style={{
        marginTop: globalTheme.space.xxs,
        marginBottom: globalTheme.space.xs,
        color: globalTheme.palette.grey[800],
      }}
    >
      <WrappedText>{bug.title.compact}</WrappedText>
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
      <Tag hue="white">
        <Tag.Avatar>{getDeviceIcon(bug.device.type)}</Tag.Avatar>
        <SM style={{ textTransform: 'capitalize' }}>
          {bug.device.type === 'desktop'
            ? bug.device.desktop_type
            : `${bug.device.manufacturer} ${bug.device.model}`}
        </SM>
      </Tag>
      <Tag hue="white">
        <Tag.Avatar>
          <OSIcon />
        </Tag.Avatar>
        <SM style={{ textTransform: 'capitalize' }}>
          {bug.device.os} {bug.device.os_version}
        </SM>
      </Tag>
    </BugInfo>
  </Container>
);
