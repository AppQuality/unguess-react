import { useTranslation } from 'react-i18next';
import { Pill } from 'src/common/components/Pill';
import { theme } from 'src/app/theme';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';

export const DesktopPill = () => {
  const { t } = useTranslation();
  return (
    <Pill
      id="pill-desktop-header"
      icon={<DesktopIcon />}
      title={t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
      color={theme.palette.azure[600]}
    />
  );
};
