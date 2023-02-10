import { theme } from 'src/app/theme';
import { IconPill } from 'src/common/components/pills/IconPill';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';
import { ReactComponent as ExperientalIcon } from 'src/assets/icons/pill-icon-experiental.svg';

export const CampaignTypePill = ({
  type,
  isFunctional,
}: {
  type: string;
  isFunctional: boolean;
}) =>
  !isFunctional ? ( // FUNCTIONAL or EXPERIENTAL
    <IconPill
      className="campaign-type-pill"
      icon={<ExperientalIcon />}
      title={type}
      color={theme.palette.red[600]}
    />
  ) : (
    <IconPill
      className="campaign-type-pill"
      icon={<GearIcon />}
      title={type}
      color={theme.palette.blue[600]}
    />
  );
