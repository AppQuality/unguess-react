import { WhatStep } from './fields/what';
import { WhereWebStep } from './fields/whereWeb';
import { WhoStep } from './fields/who';
import { WhenStep } from './fields/when';

export interface WizardModel extends WhatStep, WhereWebStep, WhoStep, WhenStep {};