import { LG, MD, SM, Span } from '@appquality/unguess-design-system';
import { ReactComponent as OSIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as NeedReviewIcon } from 'src/assets/icons/pill-icon-need-review.svg';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { Bug } from 'src/features/api';
import { IconPill } from 'src/common/components/pills/IconPill';
import { Pipe } from 'src/common/components/Pipe';
import { useTranslation } from 'react-i18next';

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
  margin: ${({ theme }) => theme.space.xxs} 0;
`;

const InfoTitle = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[600]};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
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
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <SeverityPill severity={bug.severity.name.toLowerCase() as Severities} />
      {bug.status.id === 4 && (
        <div style={{ float: 'right' }}>
          <IconPill
            size="medium"
            iconPosition="right"
            title={
              <InfoTitle>{t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}</InfoTitle>
            }
            icon={<NeedReviewIcon />}
          />
        </div>
      )}
      <LG
        isBold
        style={{
          marginTop: globalTheme.space.sm,
          marginBottom: `${globalTheme.space.base}px`,
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
        <SM
          style={{
            color: globalTheme.palette.grey[600],
            textTransform: 'capitalize',
            fontWeight: globalTheme.fontWeights.regular,
          }}
        >
          {bug.type.name}
        </SM>
        <Pipe style={{ height: '20px' }} />
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
};
