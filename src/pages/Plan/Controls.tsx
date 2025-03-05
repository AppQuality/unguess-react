import { Button } from '@appquality/unguess-design-system';
import { useSave } from 'src/features/modules/useSave';
import { FormProvider } from 'src/features/modules/FormProvider';
import { useTranslation } from 'react-i18next';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';

export const Controls = () => {
  const { isSubmitting, getPlanStatus } = useSave();
  const { t } = useTranslation();
  const { isRequestQuoteCTADisabled, handleQuoteRequest, error } =
    useRequestQuotation();

  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitting || getPlanStatus() !== 'draft'}
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
