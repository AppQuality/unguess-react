import { theme } from 'src/app/theme';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/campaign-progress.svg';
import { ReactComponent as IncomingIcon } from 'src/assets/icons/campaign-incoming.svg';
import { ReactComponent as CompletedIcon } from 'src/assets/icons/campaign-completed.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/campaign-functional.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/campaign-experiential.svg';
import { Tag } from 'src/common/Tag';
import { Span } from '@appquality/unguess-design-system';
import { TFunction, useTranslation } from 'react-i18next';

export type CampaignStatus =
  | 'running'
  | 'completed'
  | 'incoming'
  | 'functional'
  | 'experiential';

interface StatusPillArgs {
  status: CampaignStatus;
  children?: React.ReactNode;
  counter?: number;
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
      return theme.palette.blue[600];
    case 'experiential':
      return theme.palette.purple[600];
    default:
      return theme.palette.grey[700];
  }
};

const getIconByStatus = (status: CampaignStatus) => {
  switch (status) {
    case 'running':
      return <ProgressIcon />;
    case 'completed':
      return <CompletedIcon />;
    case 'incoming':
      return <IncomingIcon />;
    case 'functional':
      return <FunctionalIcon />;
    case 'experiential':
      return <ExperientialIcon />;
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

export const StatusPill = ({
  status,
  children,
  counter,
  isRound,
}: StatusPillArgs) => {
  const { t } = useTranslation();
  return (
    <Tag
      size="large"
      className={`campaign-status-pill ${status}`}
      color={getColorByStatus(status)}
      hue="rgba(0,0,0,0)"
      isRound={isRound}
    >
      {typeof getIconByStatus(status) !== 'undefined' && (
        <Tag.Avatar>{getIconByStatus(status)}</Tag.Avatar>
      )}
      {
        // children if passed, otherwise default text for normal pills and nothing for round pills (just icon)
        children || (!isRound && getDefaultTextByStatus(status, t))
      }
      {counter && <Span>{counter}</Span>}
    </Tag>
  );
};
