import { Button } from '@appquality/unguess-design-system';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import {
  FormProvider,
  useValidationContext,
} from 'src/features/modules/FormProvider';
import { useTranslation } from 'react-i18next';
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
    <>
      <Button
        type="button"
        disabled={isSubmitting || getPlanStatus() !== 'draft'}
        onClick={handleSaveConfiguration}
      >
        {t('__PLAN_SAVE_CONFIGURATION_CTA')}
      </Button>
      <Button
        type="button"
        disabled={isRequestQuoteCTADisabled()}
        onClick={handleQuoteRequest}
      >
        {t('__PLAN_REQUEST_QUOTATION_CTA')}
      </Button>
      {error && <div data-qa="request-quotation-error-message">{error}</div>}
      <FormProvider.Debugger />
    </>
  );
};
