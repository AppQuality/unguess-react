import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from '@appquality/unguess-design-system';
import { InsightFormValues } from './FormProvider';

const ActionBar = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<InsightFormValues>();

  if (values.id !== 0) return null;
  if (values.observations.length === 0) return null;

  return (
    <Button
      onClick={() => {
        // eslint-disable-next-line no-alert
        alert('openDrawer');
      }}
    >
      {t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_CREATE_INSIGHT')}
    </Button>
  );
};

export { ActionBar };
