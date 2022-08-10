import { t } from 'i18next';
import { WhatStepValidationSchema } from './what';
import { WhereStepValidationSchema } from './whereWeb';
import { WhoStepValidationSchema } from './who';
import { WhenStepValidationSchema } from './when';
import { ConfirmationValidationSchema } from './confirm';
import { WhatForm, WhatFormButtons } from './forms/WhatForm';
import { WhereForm, WhereFormButtons } from './forms/WhereForm';
import { WhoForm, WhoFormButtons } from './forms/WhoForm';
import { WhenForm, WhenFormButtons } from './forms/WhenForm';

import {
  ConfirmationForm,
  ConfirmationFormButtons,
} from './forms/ConfirmationForm';

export const What = {
  id: 'what',
  label: t('__EXPRESS_WIZARD_STEP_WHAT_LABEL'),
  content: t('__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION'),
  form: WhatForm,
  validationSchema: WhatStepValidationSchema,
  buttons: WhatFormButtons,
};

export const Where = {
  id: 'where',
  label: t('__EXPRESS_WIZARD_STEP_WHERE_LABEL'),
  content: t('__EXPRESS_WIZARD_STEP_WHERE_DESCRIPTION'),
  form: WhereForm,
  validationSchema: WhereStepValidationSchema,
  buttons: WhereFormButtons,
};

export const Who = {
  id: 'who',
  label: t('__EXPRESS_WIZARD_STEP_WHO_LABEL'),
  content: t('__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION'),
  form: WhoForm,
  validationSchema: WhoStepValidationSchema,
  buttons: WhoFormButtons,
};

export const When = {
  id: 'when',
  label: t('__EXPRESS_WIZARD_STEP_WHEN_LABEL'),
  content: t('__EXPRESS_WIZARD_STEP_WHEN_DESCRIPTION'),
  form: WhenForm,
  validationSchema: WhenStepValidationSchema,
  buttons: WhenFormButtons,
};

export const Confirmation = {
  id: 'confirmation',
  label: t('__EXPRESS_WIZARD_STEP_CONFIRM_LABEL'),
  content: t('__EXPRESS_WIZARD_STEP_CONFIRM_DESCRIPTION'),
  form: ConfirmationForm,
  validationSchema: ConfirmationValidationSchema,
  buttons: ConfirmationFormButtons,
};
