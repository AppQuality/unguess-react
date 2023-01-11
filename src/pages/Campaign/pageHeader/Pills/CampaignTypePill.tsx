import { theme } from 'src/app/theme';
import { IconPill } from 'src/common/components/pills/IconPill';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';

export const CampaignTypePill = ({ type }: { type: string }) => (
  <IconPill
    className="campaign-type-pill"
    icon={<GearIcon />}
    title={type}
    color={theme.palette.blue[600]}
  />
);
