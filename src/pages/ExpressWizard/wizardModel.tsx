import { WhatStep } from './fields/what';
import { WhereWebStep } from './fields/whereWeb';
import { WhoStep } from './fields/who';

export interface WizardModel extends WhatStep, WhereWebStep, WhoStep {}