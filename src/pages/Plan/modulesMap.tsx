import AdditionalTarget from './modules/AdditionalTarget';
import Age from './modules/Age';
import Browser from './modules/Browser';
import { Dates } from './modules/Dates';
import Employment from './modules/Employment';
import Gender from './modules/Gender';
import Goal from './modules/Goal';
import InstructionsNote from './modules/InstructionsNote';
import Language from './modules/Language';
import Literacy from './modules/Literacy';
import Locality from './modules/Locality';
import OutOfScope from './modules/OutOfScope';
import SetupNote from './modules/SetupNote';
import TargetNote from './modules/TargetNote';
import TargetSize from './modules/TargetSize';
import { Tasks } from './modules/Tasks';
import { Title } from './modules/Title';
import { TouchPoints } from './modules/Touchpoints';

export const MODULES_BY_TAB = {
  setup: ['setup_note', 'goal', 'touchpoints', 'browser'],
  target: [
    'target_note',
    'target',
    'language',
    'gender',
    'age',
    'employment',
    'literacy',
    'locality',
    'additional_target',
  ],
  instructions: ['instruction_note', 'tasks', 'out_of_scope'],
};

export const modulesMap = {
  setup_note: SetupNote,
  title: Title,
  tasks: Tasks,
  dates: Dates,
  age: Age,
  goal: Goal,
  target_note: TargetNote,
  target: TargetSize,
  language: Language,
  gender: Gender,
  employment: Employment,
  literacy: Literacy,
  instruction_note: InstructionsNote,
  out_of_scope: OutOfScope,
  browser: Browser,
  touchpoints: TouchPoints,
  additional_target: AdditionalTarget,
  locality: Locality,
};
