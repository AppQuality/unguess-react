import { theme } from 'src/app/theme';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as IncomingIcon } from 'src/assets/icons/pill-icon-incoming.svg';
import { ReactComponent as CompletedIcon } from 'src/assets/icons/pill-icon-completed.svg';
import { Pill } from 'src/common/components/Pill';

export const StatusPill = ({ status }: { status: string }) => {
  switch (status) {
    case 'incoming':
      return (
        <Pill
          className="campaign-status-pill incoming"
          icon={<IncomingIcon />}
          title="Incoming"
          color={theme.palette.azure[600]}
        />
      );
    case 'completed':
      return (
        <Pill
          className="campaign-status-pill completed"
          icon={<CompletedIcon />}
          title="Completed"
          color={theme.palette.green[800]}
        />
      );
    case 'running':
    default:
      return (
        <Pill
          className="campaign-status-pill running"
          icon={<ProgressIcon />}
          title="Running"
          color={theme.palette.yellow[700]}
        />
      );
  }
};
