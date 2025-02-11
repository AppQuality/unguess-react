import { Page } from 'src/features/templates/Page';
import { InputToggle, PageHeader } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';

const CustomTitle = () => (
  <LayoutWrapper>
    <PageHeader.Main mainTitle="temp">
      <PageHeader.Title>
        <InputToggle className="editable-title">
          <InputToggle.Item
            textSize="xxxl"
            maxLength={64}
            style={{ paddingLeft: 0 }}
          />
        </InputToggle>
      </PageHeader.Title>
    </PageHeader.Main>
  </LayoutWrapper>
);

const Temp = () => {
  const a = 1;

  return (
    <Page title="temp" route="temp">
      <ModuleWrapper>
        <CustomTitle />
        Temp
        <ModuleWrapper.Debugger />
      </ModuleWrapper>
    </Page>
  );
};

export { Temp };
