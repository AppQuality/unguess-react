import { FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  What as WhatExpress1,
  Who as WhoExpress1,
  Where as WhereExpress1,
  When as WhenExpress1,
  How as HowExpress1,
  Confirmation as ConfirmationExpress1,
} from './express-1';

import { WizardButtonsProps } from './types';
import { WizardModel } from '../wizardModel';

export interface StepItem {
  id: string;
  label: string;
  content: string;
  form: (props: FormikProps<WizardModel>) => JSX.Element;
  validationSchema: Yup.ObjectSchema<any>;
  buttons: (props: WizardButtonsProps) => JSX.Element;
}

export const useExpressStep = (type: string): Array<StepItem> => {
  switch (type) {
    case 'unmoderated-usability-testing':
      return [];
    case 'bug-hunting':
      return [];
    default: // exploratory-test
      return [
        WhatExpress1,
        WhereExpress1,
        WhoExpress1,
        WhenExpress1,
        ConfirmationExpress1,
      ];
  }
};
