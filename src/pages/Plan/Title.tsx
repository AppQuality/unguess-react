import { InputToggle, PageHeader } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';

const Title = () => {
  const { value, set, remove } = useModuleContext('title');

  return (
    <LayoutWrapper>
      <PageHeader.Main mainTitle="temp">
        <PageHeader.Title>
          <InputToggle className="editable-title" data-qa="title-module">
            <InputToggle.Item
              textSize="xxxl"
              maxLength={64}
              style={{ paddingLeft: 0 }}
              value={value?.output || ''}
              onChange={(e) => {
                if (!e.target.value) {
                  remove();
                } else {
                  set({
                    output: e.target.value,
                  });
                }
              }}
            />
          </InputToggle>
        </PageHeader.Title>
      </PageHeader.Main>
    </LayoutWrapper>
  );
};

export { Title };
