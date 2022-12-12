import { useTranslation } from 'react-i18next';
import { Pill } from 'src/common/components/Pill';
import { theme } from 'src/app/theme';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';

export const TabletPill = () => {
  const { t } = useTranslation();
  return (
    <Pill
      id="pill-smartphone-header"
      icon={<TabletIcon />}
      title={t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_SMARTPHONE')}
      color={theme.palette.azure[600]}
    />
  );
};
