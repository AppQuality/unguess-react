import { useTranslation } from 'react-i18next';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { Meta } from 'src/common/components/Meta';

export const DesktopTag = () => {
  const { t } = useTranslation();
  return (
    <Meta id="pill-desktop-header" size="large" icon={<DesktopIcon />}>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
    </Meta>
  );
};
