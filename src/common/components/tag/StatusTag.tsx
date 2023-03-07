import { Tag } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { CampaignStatus } from 'src/types';
import { getColorByStatus } from '../utils/getColorByStatus';
import { getIconByStatus } from '../utils/getIconByStatus';
import { getDefaultTextByStatus } from '../utils/getDefaultTextByStatus';

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
