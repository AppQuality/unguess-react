import Age from './modules/Age';
import { Dates } from './modules/Dates';
import SetupNote from './modules/SetupNote';
import { Tasks } from './modules/Tasks';
import { Title } from './modules/Title';
import Goal from './modules/Goal';
import TargetNote from './modules/TargetNote';
import TargetSize from './modules/TargetSize';
import Language from './modules/Language';
import Gender from './modules/Gender';
import Literacy from './modules/Literacy';
import InstructionsNote from './modules/InstructionsNote';
import OutOfScope from './modules/OutOfScope';
import Browser from './modules/Browser';
import { TouchPoints } from './modules/Touchpoints';

export const MODULES_BY_TAB = {
  setup: ['setup_note', 'goal', 'touchpoints', 'browser'],
  target: ['target_note', 'target', 'language', 'gender', 'age', 'literacy'],
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
  literacy: Literacy,
  instruction_note: InstructionsNote,
  out_of_scope: OutOfScope,
  browser: Browser,
  touchpoints: TouchPoints,
};
