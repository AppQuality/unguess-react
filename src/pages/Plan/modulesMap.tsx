import { Dates } from './modules/Dates';
import { getModuleBySlug, getModulesByTab } from './modules/Factory';
import { Title } from './modules/Title';

export const MODULES_BY_TAB = {
  setup: getModulesByTab('setup'),
  target: getModulesByTab('target'),
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
  elettricity_supply: getModuleBySlug('elettricity_supply').Component,
  mobile_internet: getModuleBySlug('mobile_internet').Component,
  home_internet: getModuleBySlug('home_internet').Component,
  gas_supply: getModuleBySlug('gas_supply').Component,
  annual_income_range: getModuleBySlug('annual_income_range').Component,
  bank: getModuleBySlug('bank').Component,
};
