import { useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { Tag } from 'src/common/Tag';

export const TabletTag = () => {
  const { t } = useTranslation();
  return (
    <Tag
      id="pill-tablet-header"
      color={theme.palette.azure[600]}
      size="large"
      hue="rgba(0,0,0,0)"
    >
      <Tag.Avatar>
        <TabletIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_TABLET')}
    </Tag>
  );
};
