import { FormikProps } from 'formik';
import { WizardModel } from '../../wizardModel';

export interface WizardButtonsProps {
  formikArgs: FormikProps<WizardModel>;
  onNextClick: () => void;
  onBackClick: () => void;
}
