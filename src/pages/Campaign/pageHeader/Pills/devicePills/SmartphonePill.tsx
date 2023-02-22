import { useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { Tag } from 'src/common/Tag';

export const SmartphonePill = () => {
  const { t } = useTranslation();
  return (
    <Tag
      id="pill-smartphone-header"
      color={theme.palette.azure[600]}
      size="large"
      hue="rgba(0,0,0,0)"
    >
      <Tag.Avatar>
        <SmartphoneIcon />
      </Tag.Avatar>
      {t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_SMARTPHONE')}
    </Tag>
  );
};
