import { InputToggle, PageHeader } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { components } from 'src/common/schema';
import { useErrorContext } from 'src/features/modules/FormProvider';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';

const Title = () => {
  const { value, setOutput, remove } = useModule('title');
  const { errors } = useErrorContext();
  const { isValid, error, validate } = useValidation({
    type: 'title',
    validate: (v: components['schemas']['ModuleTitle']) => {
      if (v.output === 'invalid') {
        return 'Title should not be "invalid"';
      }
      if (v.output === 'valid') {
        return true;
      }
      if (v.output) {
        return { '0': 'Title should be empty' };
      }
      return true;
    },
  });

  useEffect(() => {
    validate();
  }, [value]);

  return (
    <LayoutWrapper>
      <PageHeader.Main mainTitle="temp">
        <PageHeader.Title>
          Error: {JSON.stringify(error)}
          <br />
          Errors: {JSON.stringify(errors)}
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
