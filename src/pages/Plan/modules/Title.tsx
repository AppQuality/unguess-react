import { InputToggle, PageHeader } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useModule } from 'src/features/modules/useModule';

const Title = () => {
  const { value, setOutput, remove } = useModule('title');

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
                  setOutput(e.target.value);
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
