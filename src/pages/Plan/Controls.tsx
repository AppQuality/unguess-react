import { Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useValidationContext } from 'src/features/modules/FormProvider';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { SendRequestModal } from './modals/SendRequestModal';

export const Controls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSendRequest = () => {
    setIsModalOpen(true);
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
        onClick={handleSendRequest}
      >
        {t('__PLAN_REQUEST_QUOTATION_CTA')}
      </Button>
      {error && <div data-qa="request-quotation-error-message">{error}</div>}
      {isModalOpen && (
        <SendRequestModal
          onQuit={() => setIsModalOpen(false)}
          onConfirm={handleQuoteRequest}
        />
      )}
    </div>
  );
};
