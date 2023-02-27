import { useTranslation } from 'react-i18next';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { Tag } from '@appquality/unguess-design-system';

export const TabletTag = () => {
  const { t } = useTranslation();
  return (
    <Tag id="pill-tablet-header" size="large" hue="rgba(0,0,0,0)">
      <Tag.Avatar>
        <TabletIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_TABLET')}
    </Tag>
  );
};
