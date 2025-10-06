import {
  Button,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSubmit } from 'src/features/modules/useModuleConfiguration';
import { useValidateForm } from 'src/features/planModules';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import { usePlan } from '../../../hooks/usePlan';

const SaveConfigurationButton = () => {
  const { t } = useTranslation();

  const { planId } = useParams();
  const { addToast } = useToast();
  const { validateForm } = useValidateForm();
  const { handleSubmit: submitModuleConfiguration, isLoading: isSubmitting } =
    useSubmit(planId || '');

  const { plan } = usePlan(planId);

  if (!plan) return null;

  const { status } = getPlanStatus({
    planStatus: plan.status,
    quote: plan.quote,
    t,
  });

  const handleSaveConfiguration = async () => {
    validateForm();
    try {
      await submitModuleConfiguration();
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__PLAN_SAVE_DRAFT_TOAST_SUCCESS')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    } catch (e) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={t('__PLAN_SAVE_DRAFT_TOAST_ERROR')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    }
  };

  return (
    <Button
      type="button"
      size="small"
      disabled={isSubmitting || status !== 'draft'}
      onClick={handleSaveConfiguration}
    >
      {t('__PLAN_SAVE_CONFIGURATION_CTA')}
    </Button>
  );
};

export { SaveConfigurationButton };
