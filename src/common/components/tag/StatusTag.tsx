import {
  Tag,
  StatusCompletedIcon,
  StatusIncomingIcon,
  StatusRunningIcon,
  CampaignExperientialIcon,
  CampaignFunctionalIcon,
} from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { TFunction, useTranslation } from 'react-i18next';

export type CampaignStatus =
  | 'running'
  | 'completed'
  | 'incoming'
  | 'functional'
  | 'experiential';

interface StatusTagArgs extends React.HTMLAttributes<HTMLDivElement> {
  status: CampaignStatus;
  children?: React.ReactNode;
  counter?: number | string;
  isRound?: boolean;
}

const getColorByStatus = (status: CampaignStatus) => {
  switch (status) {
    case 'running':
      return theme.palette.yellow[700];
    case 'completed':
      return theme.palette.green[800];
    case 'incoming':
      return theme.palette.azure[600];
    case 'functional':
      return theme.palette.blue[700];
    case 'experiential':
      return theme.palette.green[700];
    default:
      return theme.palette.grey[700];
  }
};

const getIconByStatus = (status: CampaignStatus) => {
  switch (status) {
    case 'running':
      return <StatusRunningIcon />;
    case 'completed':
      return <StatusCompletedIcon />;
    case 'incoming':
      return <StatusIncomingIcon />;
    case 'functional':
      return <CampaignFunctionalIcon />;
    case 'experiential':
      return <CampaignExperientialIcon />;
    default:
      return undefined;
  }
};

const getDefaultTextByStatus = (status: CampaignStatus, t: TFunction) => {
  switch (status) {
    case 'running':
      return t('__CAMPAIGN_STATUS_RUNNING__');
    case 'completed':
      return t('__CAMPAIGN_STATUS_COMPLETED__');
    case 'incoming':
      return t('__CAMPAIGN_STATUS_INCOMING__');
    case 'functional':
      return t('__CAMPAIGN_TYPE_FUNCTIONAL__');
    case 'experiential':
      return t('__CAMPAIGN_TYPE_EXPERIENTIAL__');
    default:
      return undefined;
  }
};

export const StatusTag = ({
  status,
  children,
  counter,
  isRound,
  ...props
}: StatusTagArgs) => {
  const { t } = useTranslation();
  return (
    <Tag
      size="large"
      className={`campaign-status-pill ${status}`}
      color={getColorByStatus(status)}
      hue="rgba(0,0,0,0)"
      isRound={isRound}
      {...props}
    >
      {typeof getIconByStatus(status) !== 'undefined' && (
        <Tag.Avatar>{getIconByStatus(status)}</Tag.Avatar>
      )}
      {
        // children if passed, otherwise default text for normal pills and icon for round pills
        children ||
          (isRound
            ? getIconByStatus(status)
            : getDefaultTextByStatus(status, t))
      }
      {typeof counter !== 'undefined' && (
        <Tag.SecondaryText isBold color={theme.palette.grey[700]}>
          {counter.toString()}
        </Tag.SecondaryText>
      )}
    </Tag>
  );
};
