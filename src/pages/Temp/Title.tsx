import { InputToggle, PageHeader } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';

const Title = () => {
  const { value, set } = useModuleContext('title');

  return (
    <LayoutWrapper>
      <PageHeader.Main mainTitle="temp">
        <PageHeader.Title>
          <InputToggle className="editable-title">
            <InputToggle.Item
              textSize="xxxl"
              maxLength={64}
              style={{ paddingLeft: 0 }}
              value={value?.output || ''}
              onChange={(e) =>
                set({
                  variant: 'default',
                  output: e.target.value,
                })
              }
            />
          </InputToggle>
        </PageHeader.Title>
      </PageHeader.Main>
    </LayoutWrapper>
  );
};

export { Title };
