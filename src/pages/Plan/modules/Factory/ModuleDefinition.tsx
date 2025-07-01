import { components } from 'src/common/schema';
import { PlanTab } from '../../context/planContext';

type ModuleSchemaMap = {
  [M in components['schemas']['Module'] as M['type']]: {
    output: M['output'];
    variant: M['variant'];
  };
};
type Slug = keyof ModuleSchemaMap;

export interface ModuleDefinition<T extends Slug> {
  slug: T;
  Component: React.ComponentType<any>;
  NavChildren?: React.ComponentType<any>;
  useTitle: () => string;
  useSubtitle?: () => string;
  useIcon: (withValidation?: boolean) => React.ReactNode;
  defaultVariant: ModuleSchemaMap[T]['variant'];
  defaultData: ModuleSchemaMap[T]['output'];
  tab: PlanTab | 'none';
}

type InferModuleDefinition<S extends Slug> = ModuleDefinition<S> & {
  slug: S;
};

export function createModuleDefinition<S extends Slug>(
  def: InferModuleDefinition<S>
): InferModuleDefinition<S> {
  return def;
}
