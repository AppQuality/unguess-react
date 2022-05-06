import { WhatStep } from './fields/what';
import { WhereWebStep } from './fields/whereWeb';
import { WhereAppStep } from './fields/whereApp';
import { WhoStep } from './fields/who';
import { WhenStep } from './fields/when';

export interface WizardModel extends WhatStep, WhereWebStep, WhereAppStep, WhoStep, WhenStep {};
