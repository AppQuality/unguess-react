import {
  Skeleton,
  Tag,
  TextDescription,
  XL,
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as OSIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { Pipe } from 'src/common/components/Pipe';
import { WrappedText } from 'src/common/components/WrappedText';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { NeedReviewTag } from './NeedReviewTag';

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

export default () => {
  const { campaignId } = useParams();
  const currentBugId = getSelectedBugId();
  const {
    data: bug,
    isLoading,
    isError,
    isFetching,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId ?? '',
    bid: currentBugId ? currentBugId.toString() : '',
  });
  if (isError || !bug) return null;

  if (isLoading || isFetching) return <Skeleton />;
  return (
    <Container>
      <SeverityContainer>
        <SeverityTag
          hasBackground
          severity={bug.severity.name.toLowerCase() as Severities}
        />
        {bug.status.id === 4 && <NeedReviewTag />}
      </SeverityContainer>
      <XL
        isBold
        style={{
          marginTop: appTheme.space.xxs,
          marginBottom: appTheme.space.xs,
        }}
      >
        <WrappedText>{bug.title.compact}</WrappedText>
      </XL>
      <TextDescription
        style={{
          marginBottom: appTheme.space.md,
        }}
      >
        {bug.title.context ? bug.title.context.join(', ') : null}
      </TextDescription>
      <BugInfo>
        <TextDescription
          isSmall
          isBold
          style={{
            textTransform: 'capitalize',
            marginRight: appTheme.space.sm,
          }}
        >
          {bug.type.name}
        </TextDescription>
        <Pipe size="regular" />
        <Tag hue="white" style={{ textTransform: 'capitalize' }}>
          <Tag.Avatar>{getDeviceIcon(bug.device.type)}</Tag.Avatar>
          {bug.device.type === 'desktop'
            ? bug.device.desktop_type
            : `${bug.device.manufacturer} ${bug.device.model}`}
        </Tag>
        <Tag hue="white" style={{ textTransform: 'capitalize' }}>
          <Tag.Avatar>
            <OSIcon />
          </Tag.Avatar>
          {bug.device.os} {bug.device.os_version}
        </Tag>
      </BugInfo>
    </Container>
  );
};
