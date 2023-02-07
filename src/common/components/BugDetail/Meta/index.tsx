import { LG, MD } from '@appquality/unguess-design-system';
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
import { InfoTitle } from './InfoTitle';
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
    <LG
      isBold
      style={{
        marginTop: globalTheme.space.xxs,
        marginBottom: `${globalTheme.space.base}px`,
      }}
    >
      {bug.title.compact}
    </LG>
    <MD style={{ color: globalTheme.palette.grey[600] }}>
      {bug.title.context ? bug.title.context.join(', ') : null}
    </MD>
    <BugInfo>
      <InfoTitle style={{ textTransform: 'capitalize' }}>
        {bug.type.name}
      </InfoTitle>
      <Pipe style={{ height: globalTheme.lineHeights.md }} />
      <IconPill
        size="medium"
        title={
          <InfoTitle>
            {bug.device.type === 'desktop'
              ? bug.device.desktop_type
              : `${bug.device.manufacturer} ${bug.device.model}`}
          </InfoTitle>
        }
        icon={getDeviceIcon(bug.device.type)}
        style={{ textTransform: 'capitalize' }}
      />
      <IconPill
        size="medium"
        title={
          <InfoTitle>
            {bug.device.os} {bug.device.os_version}
          </InfoTitle>
        }
        icon={<OSIcon />}
        style={{ textTransform: 'capitalize' }}
      />
    </BugInfo>
  </Container>
);
