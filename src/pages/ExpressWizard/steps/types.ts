import { FormikProps } from 'formik';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export interface WizardButtonsProps {
  formikArgs: FormikProps<WizardModel>;
  onNextClick: () => void;
  onBackClick: () => void;
}
