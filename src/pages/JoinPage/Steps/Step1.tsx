import { Button } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

export const Step1 = () => {
  const { setFieldValue } = useFormikContext();
  const { t } = useTranslation();
  const goToNextStep = () => {
    setFieldValue('step', 2);
  };
  return (
    <div role="tabpanel" title="Step 1">
      <h2>Step 1 lsdnfds</h2>
      <p>This is the first step of the join process.</p>
      <Button role="tab" onClick={goToNextStep}>
        {t('SIGNUP_FORM_GO_TO_STEP_2')}
      </Button>
    </div>
  );
};
