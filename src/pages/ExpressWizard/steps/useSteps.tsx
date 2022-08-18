import { FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  What as WhatExpress1,
  Who as WhoExpress1,
  Where as WhereExpress1,
  Confirmation as ConfirmationExpress1,
} from './express-1';

import {
  What as WhatExpress2,
  Who as WhoExpress2,
  Where as WhereExpress2,
  How as HowExpress2,
  Confirmation as ConfirmationExpress2,
} from './express-2';

import {
  What as WhatExpress3,
  Who as WhoExpress3,
  Where as WhereExpress3,
  How as HowExpress3,
  Confirmation as ConfirmationExpress3,
} from './express-3';

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
      return [
        WhatExpress3,
        WhereExpress3,
        WhoExpress3,
        HowExpress3,
        ConfirmationExpress3,
      ];
    case 'bug-hunting':
      return [
        WhatExpress2,
        WhereExpress2,
        WhoExpress2,
        HowExpress2,
        ConfirmationExpress2,
      ];
    default: // exploratory-test
      return [WhatExpress1, WhereExpress1, WhoExpress1, ConfirmationExpress1];
  }
};
