import { useTranslation } from 'react-i18next';
import { Pill } from 'src/common/components/Pill';
import { theme } from 'src/app/theme';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';

export const SmartphonePill = () => {
  const { t } = useTranslation();
  return (
    <Pill
      id="pill-smartphone-header"
      icon={<SmartphoneIcon />}
      title={t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_SMARTPHONE')}
      color={theme.palette.azure[600]}
    />
  );
};
