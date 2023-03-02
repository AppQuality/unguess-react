import { useTranslation } from 'react-i18next';
import { Tag } from '@appquality/unguess-design-system';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';

export const DesktopTag = () => {
  const { t } = useTranslation();
  return (
    <Tag id="pill-desktop-header" size="large" hue="rgba(0,0,0,0)">
      <Tag.Avatar>
        <DesktopIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
    </Tag>
  );
};
