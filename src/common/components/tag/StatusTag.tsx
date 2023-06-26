import { Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { CampaignStatus } from 'src/types';
import { getStatusInfo } from '../utils/getStatusInfo';

interface StatusTagArgs extends React.HTMLAttributes<HTMLDivElement> {
  status: CampaignStatus;
  children?: React.ReactNode;
  counter?: number | string;
  isRound?: boolean;
}

export const StatusTag = ({
  status,
  children,
  counter,
  isRound,
  ...props
}: StatusTagArgs) => {
  const { t } = useTranslation();
  const statusInfo = getStatusInfo(status, t);

  return (
    <Tag
      size="large"
      className={`campaign-status-pill ${status}`}
      color={statusInfo.color}
      hue="rgba(0,0,0,0)"
      isRound={isRound}
      {...props}
    >
      {typeof statusInfo.icon !== 'undefined' && (
        <Tag.Avatar>{statusInfo.icon}</Tag.Avatar>
      )}
      {
        // children if passed, otherwise default text for normal pills and icon for round pills
        children || (isRound ? statusInfo.icon : statusInfo.text)
      }
      {typeof counter !== 'undefined' && (
        <Tag.SecondaryText isBold color={appTheme.palette.grey[700]}>
          {counter.toString()}
        </Tag.SecondaryText>
      )}
    </Tag>
  );
};
