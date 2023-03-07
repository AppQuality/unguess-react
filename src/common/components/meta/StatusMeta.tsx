import { useTranslation } from 'react-i18next';
import { CampaignStatus } from 'src/types';
import { Meta } from '../Meta';
import { getColorByStatus } from '../utils/getColorByStatus';
import { getDefaultTextByStatus } from '../utils/getDefaultTextByStatus';
import { getIconByStatus } from '../utils/getIconByStatus';

interface StatusMetaArgs extends React.HTMLAttributes<HTMLDivElement> {
  status: CampaignStatus;
  children?: React.ReactNode;
  counter?: number | string;
  isRound?: boolean;
}

export const StatusMeta = ({ status, counter, ...props }: StatusMetaArgs) => {
  const { t } = useTranslation();
  return (
    <Meta
      size="large"
      className={`campaign-status-pill ${status}`}
      color={getColorByStatus(status)}
      icon={getIconByStatus(status)}
      secondaryText={counter}
      {...props}
    >
      {getDefaultTextByStatus(status, t)}
    </Meta>
  );
};
