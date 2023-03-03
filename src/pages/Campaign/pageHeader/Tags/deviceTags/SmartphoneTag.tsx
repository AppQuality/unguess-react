import { useTranslation } from 'react-i18next';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { Meta } from 'src/common/components/Meta';

export const SmartphoneTag = () => {
  const { t } = useTranslation();
  return (
    <Meta id="pill-smartphone-header" size="large" icon={<SmartphoneIcon />}>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_SMARTPHONE')}
    </Meta>
  );
};
