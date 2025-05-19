import { Button } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

export const Step2 = () => {
  const { setFieldValue } = useFormikContext();
  const { t } = useTranslation();
  const goToNextStep = () => {
    setFieldValue('step', 3);
  };
  const goToPreviousStep = () => {
    setFieldValue('step', 1);
  };
  return (
    <div>
      <h2>Step 2</h2>
      <p>This is the second step of the join process.</p>
      <Button onClick={goToPreviousStep}>
        {t('SIGNUP_FORM_RETURN_TO_STEP_1')}
      </Button>
      <Button onClick={goToNextStep}>{t('SIGNUP_FORM_GO_TO_STEP_3')}</Button>
    </div>
  );
};
