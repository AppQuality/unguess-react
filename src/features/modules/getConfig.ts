import { components } from 'src/common/schema';
import { getModuleBySlug } from 'src/pages/Plan/modules/Factory';

type ModuleByType<W extends components['schemas']['Module']['type']> = Extract<
  components['schemas']['Module'],
  { type: W }
>;

export const getConfig = <L extends components['schemas']['Module']['type']>(
  type: L
): ModuleByType<L> | null => {
  switch (type) {
    case 'dates':
      return {
        type,
        variant: 'default',
        output: {
          start: '',
        },
      } as ModuleByType<L>;
    case 'out_of_scope':
      return {
        type,
        variant: 'default',
        output: '',
      } as ModuleByType<L>;
    case 'title':
      return {
        type,
        variant: 'default',
        output: '',
      } as ModuleByType<L>;
    case 'literacy':
      return {
        type,
        variant: 'default',
        output: [
          { level: 'beginner', percentage: 33.33 },
          { level: 'intermediate', percentage: 33.33 },
          { level: 'expert', percentage: 33.33 },
        ],
      } as ModuleByType<L>;
    case 'language':
      return {
        type,
        variant: 'default',
        output: 'en',
      } as ModuleByType<L>;
    case 'locality':
      return {
        type,
        variant: 'default',
        output: [
          {
            type: 'country',
            values: ['IT'],
          },
        ],
      } as ModuleByType<L>;
    case 'target':
      return {
        type,
        variant: 'default',
        output: 5,
      } as ModuleByType<L>;
    case 'touchpoints':
      return {
        type,
        variant: 'default',
        output: [] as ModuleByType<'touchpoints'>['output'],
      } as ModuleByType<L>;
    case 'bank':
      return {
        type,
        variant: 'default',
        output: [] as ModuleByType<'bank'>['output'],
      } as ModuleByType<L>;
    case 'elettricity_supply':
      return {
        type,
        variant: 'default',
        output: [] as ModuleByType<'elettricity_supply'>['output'],
      } as ModuleByType<L>;
    case 'gas_supply':
      return {
        type,
        variant: 'default',
        output: [] as ModuleByType<'gas_supply'>['output'],
      } as ModuleByType<L>;
    case 'mobile_internet':
      return {
        type,
        variant: 'default',
        output: [] as ModuleByType<'mobile_internet'>['output'],
      } as ModuleByType<L>;
    case 'home_internet':
      return {
        type,
        variant: 'default',
        output: [] as ModuleByType<'home_internet'>['output'],
      } as ModuleByType<L>;
    default:
      return {
        type,
        variant: getModuleBySlug(type)?.defaultVariant,
        output: getModuleBySlug(type)?.defaultData,
      } as ModuleByType<L>;
  }
};
