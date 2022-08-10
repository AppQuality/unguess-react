import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  WhatStepValidationSchema as WhatStepValidationSchemaExpress1,
  WhatForm as WhatFormExpress1,
  WhatFormButtons as WhatFormButtonsExpress1,
  WhereStepValidationSchema as WhereStepValidationSchemaExpress1,
  WhereForm as WhereFormExpress1,
  WhereFormButtons as WhereFormButtonsExpress1,
  WhoStepValidationSchema as WhoStepValidationSchemaExpress1,
  WhoForm as WhoFormExpress1,
  WhoFormButtons as WhoFormButtonsExpress1,
  WhenStepValidationSchema as WhenStepValidationSchemaExpress1,
  WhenForm as WhenFormExpress1,
  WhenFormButtons as WhenFormButtonsExpress1,
  HowStepValidationSchema as HowStepValidationSchemaExpress1,
  HowForm as HowFormExpress1,
  HowFormButtons as HowFormButtonsExpress1,
  ConfirmationValidationSchema as ConfirmationValidationSchemaExpress1,
  ConfirmationForm as ConfirmationFormExpress1,
  ConfirmationFormButtons as ConfirmationFormButtonsExpress1,
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
  const { t } = useTranslation();

  const WhatStepExpress1 = {
    id: 'what',
    label: t('__EXPRESS_WIZARD_STEP_WHAT_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION'),
    form: WhatFormExpress1,
    validationSchema: WhatStepValidationSchemaExpress1,
    buttons: WhatFormButtonsExpress1,
  };

  const WhereStepExpress1 = {
    id: 'where',
    label: t('__EXPRESS_WIZARD_STEP_WHERE_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHERE_DESCRIPTION'),
    form: WhereFormExpress1,
    validationSchema: WhereStepValidationSchemaExpress1,
    buttons: WhereFormButtonsExpress1,
  };

  const WhoStepExpress1 = {
    id: 'who',
    label: t('__EXPRESS_WIZARD_STEP_WHO_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION'),
    form: WhoFormExpress1,
    validationSchema: WhoStepValidationSchemaExpress1,
    buttons: WhoFormButtonsExpress1,
  };

  const WhenStepExpress1 = {
    id: 'when',
    label: t('__EXPRESS_WIZARD_STEP_WHEN_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHEN_DESCRIPTION'),
    form: WhenFormExpress1,
    validationSchema: WhenStepValidationSchemaExpress1,
    buttons: WhenFormButtonsExpress1,
  };

  const HowStepExpress1 = {
    id: 'how',
    label: t('__EXPRESS_WIZARD_STEP_HOW_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_HOW_DESCRIPTION'),
    form: HowFormExpress1,
    validationSchema: HowStepValidationSchemaExpress1,
    buttons: HowFormButtonsExpress1,
  };

  const ConfirmationStepExpress1 = {
    id: 'confirmation',
    label: t('__EXPRESS_WIZARD_STEP_CONFIRM_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_CONFIRM_DESCRIPTION'),
    form: ConfirmationFormExpress1,
    validationSchema: ConfirmationValidationSchemaExpress1,
    buttons: ConfirmationFormButtonsExpress1,
  };

  switch (type) {
    case 'unmoderated-usability-testing':
      return [];
    case 'bug-hunting':
      return [];
    default: // exploratory-test
      return [
        WhatStepExpress1,
        WhereStepExpress1,
        WhoStepExpress1,
        WhenStepExpress1,
        ConfirmationStepExpress1,
      ];
  }
};
