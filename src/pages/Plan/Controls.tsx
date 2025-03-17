import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useValidationContext } from 'src/features/modules/FormProvider';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';

export const Controls = () => {
  const { isSubmitting, getPlanStatus, submitModuleConfiguration } =
    useModuleConfiguration();
  const { validateForm } = useValidationContext();
  const { t } = useTranslation();
  const { isRequestQuoteCTADisabled, handleQuoteRequest, error } =
    useRequestQuotation();
  const handleSaveConfiguration = () => {
    validateForm();
    submitModuleConfiguration();
  };

  return (
    <div style={{ display: 'flex', gap: appTheme.space.xs }}>
      <Button
        type="button"
        size="small"
        disabled={isSubmitting || getPlanStatus() !== 'draft'}
        onClick={handleSaveConfiguration}
      >
        {t('__PLAN_SAVE_CONFIGURATION_CTA')}
      </Button>
      <Button
        isAccent
        isPrimary
        type="button"
        size="small"
        disabled={isRequestQuoteCTADisabled()}
        onClick={handleQuoteRequest}
      >
        {t('__PLAN_REQUEST_QUOTATION_CTA')}
      </Button>
      {error && <div data-qa="request-quotation-error-message">{error}</div>}
    </div>
  );
};
