import { InputToggle, SM } from '@appquality/unguess-design-system';
import { useModule } from 'src/features/modules/useModule';
import { components } from 'src/common/schema';
import { useTranslation } from 'react-i18next';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { ChangeEvent } from 'react';
import { appTheme } from 'src/app/theme';

const Title = () => {
  const { value, setOutput } = useModule('title');
  const { t } = useTranslation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'title' }
  ) => {
    let error;
    if (module.output.length > 256) {
      error = t('__PLAN_TITLE_ERROR_MAX_LENGTH');
    }
    if (!module.output.trim()) {
      error = t('__PLAN_TITLE_ERROR_EMPTY');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'title',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOutput(e.target.value);
    validate();
  };
  return (
    <div>
      <InputToggle className="editable-title" data-qa="title-module">
        <InputToggle.Item
          data-qa="title-input"
          onBlur={handleBlur}
          textSize="xl"
          style={{ paddingLeft: 0 }}
          value={value?.output}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </InputToggle>
      {error && (
        <SM
          style={{ color: appTheme.components.text.dangerColor }}
          data-qa="title-error"
        >
          {error}
        </SM>
      )}
    </div>
  );
};

export { Title };
