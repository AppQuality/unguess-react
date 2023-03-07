import { useTranslation } from 'react-i18next';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { Meta } from 'src/common/components/Meta';

export const TabletMeta = () => {
  const { t } = useTranslation();
  return (
    <Meta id="pill-tablet-header" size="large" icon={<TabletIcon />}>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_TABLET')}
    </Meta>
  );
};
