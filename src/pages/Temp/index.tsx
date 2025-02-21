import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { Page } from 'src/features/templates/Page';
import { Tasks } from './Tasks';
import { Title } from './Title';

const Temp = () => {
  const a = 1;

  return (
    <Page title="temp" route="temp">
      <ModuleWrapper>
        <Title />
        <Tasks />
        Temp
        <ModuleWrapper.Debugger />
      </ModuleWrapper>
    </Page>
  );
};

export { Temp };
