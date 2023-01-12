import { LG, MD, Tag } from '@appquality/unguess-design-system';
import { ReactComponent as OSIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { Pill } from 'src/common/components/Pill';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { Bug } from 'src/features/api';

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

const Divider = styled.div`
  display: inline-block;
  width: 1px;
  height: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.palette.grey[300]};
  margin-right: ${({ theme }) => theme.space.sm};
`;

const StyledPill = styled(Pill)`
  text-transform: capitalize;
`;

function getDeviceIcon(device: string) {
  switch (device) {
    case 'mobile':
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
}) => {
  console.log('meta');

  return (
    <Container>
      {/* TODO: Replace this Tag with new severity pill component */}
      <Tag isPill size="small">
        {bug.severity.name}
      </Tag>
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
        <StyledPill title={bug.type.name} />
        {/* TODO: Replace this Divider with common divider component */}
        <Divider />
        <StyledPill
          title={bug.device.type}
          icon={getDeviceIcon(bug.device.type)}
        />{' '}
        <StyledPill
          title={`${bug.device.os} ${bug.device.os_version}`}
          icon={<OSIcon />}
        />
      </BugInfo>
    </Container>
  );
};
