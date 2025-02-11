import { InputToggle, PageHeader } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

const Title = () => (
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

export { Title };
