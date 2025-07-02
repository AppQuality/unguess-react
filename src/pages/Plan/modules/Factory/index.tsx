import { components } from 'src/common/schema';
import { ModuleDefinition } from './ModuleDefinition';
import { AdditionalTarget } from './modules/AdditionalTarget';
import { AgeModule } from './modules/Age';
import { BankModule } from './modules/Bank';
import { BrowserModule } from './modules/Browser';
import { DatesModule } from './modules/Dates';
import { ElectricityModule } from './modules/Electricity';
import { EmploymentModule } from './modules/Employment';
import { GasModule } from './modules/GasSupply';
import { GenderModule } from './modules/Gender';
import { GoalModule } from './modules/Goal';
import { IncomeModule } from './modules/IncomeModule';
import { InstructionNoteModule } from './modules/InstructionNote';
import { InternetHomeModule } from './modules/InternetHome';
import { InternetMobileModule } from './modules/InternetMobile';
import { LanguageModule } from './modules/Language';
import { LiteracyModule } from './modules/Literacy';
import { LocalityModule } from './modules/Locality';
import { OutOfScopeModule } from './modules/OutOfScope';
import { SetupNoteModule } from './modules/SetupNote';
import { TargetNoteModule } from './modules/TargetNote';
import { TargetSizeModule } from './modules/TargetSize';
import { TasksModule } from './modules/Tasks';
import { TitleModule } from './modules/Title';
import { TouchpointsModule } from './modules/Touchpoints';

const modules: Record<
  string,
  ModuleDefinition<components['schemas']['Module']['type']>
> = {
  [GoalModule.slug]: GoalModule,
  [IncomeModule.slug]: IncomeModule,
  [TasksModule.slug]: TasksModule,
  [AdditionalTarget.slug]: AdditionalTarget,
  [AgeModule.slug]: AgeModule,
  [BrowserModule.slug]: BrowserModule,
  [EmploymentModule.slug]: EmploymentModule,
  [GenderModule.slug]: GenderModule,
  [SetupNoteModule.slug]: SetupNoteModule,
  [InstructionNoteModule.slug]: InstructionNoteModule,
  [OutOfScopeModule.slug]: OutOfScopeModule,
  [TargetNoteModule.slug]: TargetNoteModule,
  [LocalityModule.slug]: LocalityModule,
  [LanguageModule.slug]: LanguageModule,
  [TargetSizeModule.slug]: TargetSizeModule,
  [LiteracyModule.slug]: LiteracyModule,
  [TouchpointsModule.slug]: TouchpointsModule,
  [BankModule.slug]: BankModule,
  [InternetMobileModule.slug]: InternetMobileModule,
  [ElectricityModule.slug]: ElectricityModule,
  [GasModule.slug]: GasModule,
  [InternetHomeModule.slug]: InternetHomeModule,
  [TitleModule.slug]: TitleModule,
  [DatesModule.slug]: DatesModule,
};

export function getModuleBySlug(
  slug: string
): ModuleDefinition<components['schemas']['Module']['type']> {
  if (!slug || !modules[`${slug}`]) {
    throw new Error(`Module with slug "${slug}" not found.`);
  }
  return modules[`${slug}`];
}

export function getModulesByTab(
  tab: ModuleDefinition<components['schemas']['Module']['type']>['tab']
): ModuleDefinition<components['schemas']['Module']['type']>['slug'][] {
  return Object.values(modules)
    .filter((module) => module.tab === tab)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .map((m) => m.slug);
}
