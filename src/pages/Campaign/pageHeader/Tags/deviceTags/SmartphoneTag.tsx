import { useTranslation } from 'react-i18next';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { Tag } from '@appquality/unguess-design-system';

export const SmartphoneTag = () => {
  const { t } = useTranslation();
  return (
    <Tag id="pill-smartphone-header" size="large" hue="rgba(0,0,0,0)">
      <Tag.Avatar>
        <SmartphoneIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_SMARTPHONE')}
    </Tag>
  );
};
