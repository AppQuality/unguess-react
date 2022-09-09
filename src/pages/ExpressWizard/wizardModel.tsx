import { WhatStep } from './fields/what';
import { WhereWebStep } from './fields/whereWeb';
import { WhereAppStep } from './fields/whereApp';
import { WhoStep } from './fields/who';
import { HowStep } from './fields/how';
import { WhenStep } from './fields/when';
import { ConfirmStep } from './fields/confirm';

export interface WizardModel
  extends WhatStep,
    WhereWebStep,
    WhereAppStep,
    WhoStep,
    HowStep,
    WhenStep,
    ConfirmStep {
  has_bug_form?: boolean;
  has_bug_parade?: boolean;
  base_cp_duration?: number;
}
