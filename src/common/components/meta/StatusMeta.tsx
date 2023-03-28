import { useTranslation } from 'react-i18next';
import { CampaignStatus } from 'src/types';
import { Meta } from '../Meta';
import { getStatusInfo } from '../utils/getStatusInfo';

interface StatusMetaArgs extends React.HTMLAttributes<HTMLDivElement> {
  status: CampaignStatus;
  children?: React.ReactNode;
  counter?: number | string;
  isRound?: boolean;
}

export const StatusMeta = ({ status, counter, ...props }: StatusMetaArgs) => {
  const { t } = useTranslation();
  const statusInfo = getStatusInfo(status, t);

  return (
    <Meta
      size="large"
      className={`campaign-status-pill ${status}`}
      color={statusInfo.color}
      icon={statusInfo.icon}
      secondaryText={counter}
      {...props}
    >
      {statusInfo.text}
    </Meta>
  );
};
