import { Alert } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

export const AiErrorAlert = () => {
  const { t } = useTranslation();
  return (
    <Alert type="error">
      <Alert.Title>
        {t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ERROR_TITLE')}
      </Alert.Title>
      {t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ERROR_MESSAGE')}
    </Alert>
  );
};
