import Bank from './modules/Bank';
import { Dates } from './modules/Dates';
import ElectricityProviders from './modules/Electricity';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';
import GasProviders from './modules/Gas';
import Gender from './modules/Gender';
import InstructionsNote from './modules/InstructionsNote';
import InternetHomeProviders from './modules/InternetHome';
import InternetMobileProviders from './modules/InternetMobile';
import Language from './modules/Language';
import Literacy from './modules/Literacy';
import Locality from './modules/Locality';
import OutOfScope from './modules/OutOfScope';
import SetupNote from './modules/SetupNote';
import TargetNote from './modules/TargetNote';
import TargetSize from './modules/TargetSize';
import { Title } from './modules/Title';
import { TouchPoints } from './modules/Touchpoints';

export const MODULES_BY_TAB = {
  setup: ['setup_note', 'touchpoints', ...getModulesByTab('setup')],
  target: [
    'target_note',
    'target',
    'language',
    'gender',
    'literacy',
    'locality',
    'bank',
    'elettricity_supply',
    'mobile_internet',
    'home_internet',
    'gas_supply',
    ...getModulesByTab('target'),
  ],
  instructions: [
    'instruction_note',
    'out_of_scope',
    ...getModulesByTab('instructions'),
  ],
};

export const modulesMap = {
  setup_note: SetupNote,
  title: Title,
  tasks: getModuleBySlug('tasks').Component,
  dates: Dates,
  age: getModuleBySlug('age').Component,
  goal: getModuleBySlug('goal').Component,
  target_note: TargetNote,
  target: TargetSize,
  language: Language,
  gender: Gender,
  employment: getModuleBySlug('employment').Component,
  literacy: Literacy,
  instruction_note: InstructionsNote,
  out_of_scope: OutOfScope,
  browser: getModuleBySlug('browser').Component,
  touchpoints: TouchPoints,
  additional_target: getModuleBySlug('additional_target').Component,
  locality: Locality,
  elettricity_supply: ElectricityProviders, // Placeholder for future module
  mobile_internet: InternetMobileProviders,
  home_internet: InternetHomeProviders,
  gas_supply: GasProviders,
  annual_income_range: getModuleBySlug('annual_income_range').Component, // Placeholder for future module
  bank: Bank,
};
