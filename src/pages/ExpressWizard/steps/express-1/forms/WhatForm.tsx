import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WaterButton } from 'src/common/components/waterButton';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { WhatStep } from '../what';

export const WhatForm = (props: FormikProps<WizardModel>) => (
  <WhatStep {...props} />
);

export const WhatFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onNextClick } = props;

  return (
    <WaterButton
      id="express-wizard-what-next-button"
      isPill
      isPrimary
      onClick={onNextClick}
    >
      {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
    </WaterButton>
  );
};
