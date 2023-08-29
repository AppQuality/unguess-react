import { useTranslation } from 'react-i18next';
import { ReactComponent as TvIcon } from 'src/assets/icons/pill-icon-tv.svg';
import { Meta } from 'src/common/components/Meta';

export const TvMeta = () => {
  const { t } = useTranslation();
  return (
    <Meta id="pill-tv-header" size="large" icon={<TvIcon />}>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_TV')}
    </Meta>
  );
};
