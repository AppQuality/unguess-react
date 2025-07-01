import { components } from 'src/common/schema';
import { ModuleDefinition } from './ModuleDefinition';
import { AdditionalTarget } from './modules/AdditionalTarget';
import { AgeModule } from './modules/Age';
import { BrowserModule } from './modules/Browser';
import { EmploymentModule } from './modules/Employment';
import { GenderModule } from './modules/Gender';
import { GoalModule } from './modules/Goal';
import { IncomeModule } from './modules/IncomeModule';
import { InstructionNoteModule } from './modules/InstructionNote';
import { LanguageModule } from './modules/Language';
import { LiteracyModule } from './modules/Literacy';
import { LocalityModule } from './modules/Locality';
import { OutOfScopeModule } from './modules/OutOfScope';
import { SetupNoteModule } from './modules/SetupNote';
import { TargetNoteModule } from './modules/TargetNote';
import { TargetSizeModule } from './modules/TargetSize';
import { TasksModule } from './modules/Tasks';

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
  [TargetNoteModule.slug]: TargetNoteModule,
  [InstructionNoteModule.slug]: InstructionNoteModule,
  [OutOfScopeModule.slug]: OutOfScopeModule,
  [TargetNoteModule.slug]: TargetNoteModule,
  [LocalityModule.slug]: LocalityModule,
  [LanguageModule.slug]: LanguageModule,
  [TargetSizeModule.slug]: TargetSizeModule,
  [LiteracyModule.slug]: LiteracyModule,
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
  tab: 'setup' | 'target' | 'instructions'
): ModuleDefinition<components['schemas']['Module']['type']>['slug'][] {
  return Object.values(modules)
    .filter((module) => module.tab === tab)
    .map((m) => m.slug);
}
