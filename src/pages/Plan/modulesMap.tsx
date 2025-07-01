import AdditionalTarget from './modules/AdditionalTarget';
import Age from './modules/Age';
import Bank from './modules/Bank';
import Browser from './modules/Browser';
import { Dates } from './modules/Dates';
import ElectricityProviders from './modules/Electricity';
import Employment from './modules/Employment';
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
  setup: ['setup_note', 'touchpoints', 'browser', ...getModulesByTab('setup')],
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
  age: Age,
  goal: getModuleBySlug('goal').Component,
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
  elettricity_supply: ElectricityProviders, // Placeholder for future module
  mobile_internet: InternetMobileProviders,
  home_internet: InternetHomeProviders,
  gas_supply: GasProviders,
  annual_income_range: getModuleBySlug('annual_income_range').Component, // Placeholder for future module
  bank: Bank,
};
