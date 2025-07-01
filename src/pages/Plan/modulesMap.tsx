import Bank from './modules/Bank';
import { Dates } from './modules/Dates';
import ElectricityProviders from './modules/Electricity';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';
import GasProviders from './modules/Gas';
import InternetHomeProviders from './modules/InternetHome';
import InternetMobileProviders from './modules/InternetMobile';
import Language from './modules/Language';
import Literacy from './modules/Literacy';
import Locality from './modules/Locality';
import OutOfScope from './modules/OutOfScope';
import TargetSize from './modules/TargetSize';
import { Title } from './modules/Title';
import { TouchPoints } from './modules/Touchpoints';

export const MODULES_BY_TAB = {
  setup: ['touchpoints', ...getModulesByTab('setup')],
  target: [
    'target',
    'language',
    'literacy',
    'locality',
    'bank',
    'elettricity_supply',
    'mobile_internet',
    'home_internet',
    'gas_supply',
    ...getModulesByTab('target'),
  ],
  instructions: ['out_of_scope', ...getModulesByTab('instructions')],
};

export const modulesMap = {
  setup_note: getModuleBySlug('setup_note').Component,
  title: Title,
  tasks: getModuleBySlug('tasks').Component,
  dates: Dates,
  age: getModuleBySlug('age').Component,
  goal: getModuleBySlug('goal').Component,
  target_note: getModuleBySlug('target_note').Component,
  target: TargetSize,
  language: Language,
  gender: getModuleBySlug('gender').Component,
  employment: getModuleBySlug('employment').Component,
  literacy: Literacy,
  instruction_note: getModuleBySlug('instruction_note').Component,
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
