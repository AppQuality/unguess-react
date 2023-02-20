import { useTranslation } from 'react-i18next';
import { Tag } from 'src/common/Tag';
import { theme } from 'src/app/theme';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';

export const DesktopPill = () => {
  const { t } = useTranslation();
  return (
    <Tag id="pill-desktop-header" color={theme.palette.azure[600]} hue="white">
      <Tag.Avatar>
        <DesktopIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
    </Tag>
  );
};
