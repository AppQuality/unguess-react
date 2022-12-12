import { theme } from 'src/app/theme';
import { Pill } from 'src/common/components/Pill';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';

export const CampaignTypePill = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => (
  <Pill
    {...{ className }}
    icon={<GearIcon />}
    title={type}
    color={theme.palette.blue[600]}
  />
);
