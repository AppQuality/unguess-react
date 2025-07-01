import Bank from './modules/Bank';
import { Dates } from './modules/Dates';
import ElectricityProviders from './modules/Electricity';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';
import GasProviders from './modules/Gas';
import InternetHomeProviders from './modules/InternetHome';
import InternetMobileProviders from './modules/InternetMobile';
import { Title } from './modules/Title';

export const MODULES_BY_TAB = {
  setup: getModulesByTab('setup'),
  target: [
    'bank',
    'elettricity_supply',
    'mobile_internet',
    'home_internet',
    'gas_supply',
    ...getModulesByTab('target'),
  ],
  instructions: getModulesByTab('instructions'),
};

export const modulesMap = {
  setup_note: getModuleBySlug('setup_note').Component,
  title: Title,
  tasks: getModuleBySlug('tasks').Component,
  dates: Dates,
  age: getModuleBySlug('age').Component,
  goal: getModuleBySlug('goal').Component,
  target_note: getModuleBySlug('target_note').Component,
  target: getModuleBySlug('target').Component,
  language: getModuleBySlug('language').Component,
  gender: getModuleBySlug('gender').Component,
  employment: getModuleBySlug('employment').Component,
  literacy: getModuleBySlug('literacy').Component,
  instruction_note: getModuleBySlug('instruction_note').Component,
  out_of_scope: getModuleBySlug('out_of_scope').Component,
  browser: getModuleBySlug('browser').Component,
  touchpoints: getModuleBySlug('touchpoints').Component,
  additional_target: getModuleBySlug('additional_target').Component,
  locality: getModuleBySlug('locality').Component,
  elettricity_supply: ElectricityProviders, // Placeholder for future module
  mobile_internet: InternetMobileProviders,
  home_internet: InternetHomeProviders,
  gas_supply: GasProviders,
  annual_income_range: getModuleBySlug('annual_income_range').Component, // Placeholder for future module
  bank: Bank,
};
