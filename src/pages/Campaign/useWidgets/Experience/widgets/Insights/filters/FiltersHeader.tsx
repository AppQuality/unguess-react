import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

export const FiltersHeader = () => {
  const { t } = useTranslation();

  return (
    <MD
      isBold
      style={{
        color: appTheme.palette.grey[800],
      }}
    >
      {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_FILTERS_TITLE')}
    </MD>
  );
};
