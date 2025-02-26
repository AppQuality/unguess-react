import { LG } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';

export const Dates = () => {
  const { value, set, remove } = useModuleContext('dates');

  return (
    <div data-qa="dates-module">
      <LG>Dates</LG>
    </div>
  );
};
