import { theme } from 'src/app/theme';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as IncomingIcon } from 'src/assets/icons/pill-icon-incoming.svg';
import { ReactComponent as CompletedIcon } from 'src/assets/icons/pill-icon-completed.svg';
import { IconPill } from 'src/common/components/pills/IconPill';
import { useTranslation } from 'react-i18next';

export const StatusPill = ({ status, ...props }: { status: string }) => {
  const { t } = useTranslation();

  switch (status) {
    case 'incoming':
      return (
        <IconPill
          className="campaign-status-pill incoming"
          icon={<IncomingIcon />}
          title={t('__CAMPAIGNS_TABLE_COLUMN_STATUS_INCOMING')}
          color={theme.palette.azure[600]}
          {...props}
        />
      );
    case 'completed':
      return (
        <IconPill
          className="campaign-status-pill completed"
          icon={<CompletedIcon />}
          title={t('__CAMPAIGNS_TABLE_COLUMN_STATUS_COMPLETED')}
          color={theme.palette.green[800]}
          {...props}
        />
      );
    case 'running':
    default:
      return (
        <IconPill
          className="campaign-status-pill running"
          icon={<ProgressIcon />}
          title={t('__CAMPAIGNS_TABLE_COLUMN_STATUS_PROGRESS')}
          color={theme.palette.yellow[700]}
          {...props}
        />
      );
  }
};
