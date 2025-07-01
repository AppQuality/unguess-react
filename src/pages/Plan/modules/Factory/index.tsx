import { components } from 'src/common/schema';
import { ModuleDefinition } from './ModuleDefinition';
import { GoalModule } from './modules/Goal';
import { IncomeModule } from './modules/IncomeModule';
import { TasksModule } from './modules/Tasks';

const modules: Record<
  string,
  ModuleDefinition<components['schemas']['Module']['type']>
> = {
  [GoalModule.slug]: GoalModule,
  [IncomeModule.slug]: IncomeModule,
  [TasksModule.slug]: TasksModule,
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
