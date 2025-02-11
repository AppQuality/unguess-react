import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { Page } from 'src/features/templates/Page';

const Temp = () => {
  const a = 1;

  return (
    <Page title="temp" route="temp">
      <ModuleWrapper>
        Temp
        <ModuleWrapper.Debugger />
      </ModuleWrapper>
    </Page>
  );
};

export { Temp };
