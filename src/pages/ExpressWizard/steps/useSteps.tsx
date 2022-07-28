import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  WhatStepValidationSchema,
  WhereStepValidationSchema,
  WhoStepValidationSchema,
  WhenStepValidationSchema,
  HowStepValidationSchema,
  ConfirmationValidationSchema,
} from '.';
import { WizardModel } from '../wizardModel';
import { WizardButtonsProps } from './forms/types';
import { WhatForm, WhatFormButtons } from './forms/WhatForm';
import { WhereForm, WhereFormButtons } from './forms/WhereForm';
import { WhoForm, WhoFormButtons } from './forms/WhoForm';
import { WhenForm, WhenFormButtons } from './forms/WhenForm';
import { HowForm, HowFormButtons } from './forms/HowForm';
import {
  ConfirmationForm,
  ConfirmationFormButtons,
} from './forms/ConfirmationForm';

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
  const WhatStep = {
    id: 'what',
    label: t('__EXPRESS_WIZARD_STEP_WHAT_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION'),
    form: WhatForm,
    validationSchema: WhatStepValidationSchema,
    buttons: WhatFormButtons,
  };

  const WhereStep = {
    id: 'where',
    label: t('__EXPRESS_WIZARD_STEP_WHERE_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHERE_DESCRIPTION'),
    form: WhereForm,
    validationSchema: WhereStepValidationSchema,
    buttons: WhereFormButtons,
  };

  const WhoStep = {
    id: 'who',
    label: t('__EXPRESS_WIZARD_STEP_WHO_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION'),
    form: WhoForm,
    validationSchema: WhoStepValidationSchema,
    buttons: WhoFormButtons,
  };

  const WhenStep = {
    id: 'when',
    label: t('__EXPRESS_WIZARD_STEP_WHEN_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_WHEN_DESCRIPTION'),
    form: WhenForm,
    validationSchema: WhenStepValidationSchema,
    buttons: WhenFormButtons,
  };

  const HowStep = {
    id: 'how',
    label: t('__EXPRESS_WIZARD_STEP_HOW_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_HOW_DESCRIPTION'),
    form: HowForm,
    validationSchema: HowStepValidationSchema,
    buttons: HowFormButtons,
  };

  const ConfirmationStep = {
    id: 'confirmation',
    label: t('__EXPRESS_WIZARD_STEP_CONFIRM_LABEL'),
    content: t('__EXPRESS_WIZARD_STEP_CONFIRM_DESCRIPTION'),
    form: ConfirmationForm,
    validationSchema: ConfirmationValidationSchema,
    buttons: ConfirmationFormButtons,
  };

  switch (type) {
    case 'bug-hunting':
      return [WhatStep, WhereStep, WhoStep, HowStep, ConfirmationStep];
    default:
      return [WhatStep, WhereStep, WhoStep, WhenStep, ConfirmationStep];
  }
};
