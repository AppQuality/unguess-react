import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { Button } from '@appquality/unguess-design-system';
import { WhatStep } from '../what';

export const WhatForm = (props: FormikProps<WizardModel>) => (
  <WhatStep {...props} />
);

export const WhatFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onNextClick } = props;

  return (
    <Button
      id="express-wizard-what-next-button"
      isPrimary
      onClick={onNextClick}
    >
      {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
    </Button>
  );
};
