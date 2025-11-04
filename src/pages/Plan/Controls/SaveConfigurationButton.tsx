import {
  Button,
  Notification,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSubmit } from 'src/features/modules/useModuleConfiguration';
import { useValidateForm } from 'src/features/planModules';
import { usePlan, usePlanIsDraft } from '../../../hooks/usePlan';
import { ReactComponent as SaveIcon } from 'src/assets/icons/save-icon.svg';

const SaveConfigurationButton = () => {
  const { t } = useTranslation();

  const { planId } = useParams();
  const { addToast } = useToast();
  const { validateForm } = useValidateForm();
  const { handleSubmit: submitModuleConfiguration, isLoading: isSubmitting } =
    useSubmit(planId || '');

  const { plan } = usePlan(planId);
  const isDraft = usePlanIsDraft(planId);

  if (!plan) return null;

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
    <Tooltip
      size="large"
      type="light"
      placement="top-start"
      content={t('__PLAN_SAVE_CONFIGURATION_TOOLTIP')}
    >
      <Button
        type="button"
        size="small"
        disabled={isSubmitting || !isDraft}
        onClick={handleSaveConfiguration}
      >
        <Button.StartIcon>
          <SaveIcon />
        </Button.StartIcon>
        {t('__PLAN_SAVE_CONFIGURATION_CTA')}
      </Button>
    </Tooltip>
  );
};

export { SaveConfigurationButton };
