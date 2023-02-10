import { useTranslation } from 'react-i18next';
import { IconPill } from 'src/common/components/pills/IconPill';
import { theme } from 'src/app/theme';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';

export const TabletPill = () => {
  const { t } = useTranslation();
  return (
    <IconPill
      id="pill-tablet-header"
      icon={<TabletIcon />}
      title={t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_TABLET')}
      color={theme.palette.azure[600]}
    />
  );
};
