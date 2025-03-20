import { InputToggle, LG, SM } from '@appquality/unguess-design-system';
import { useModule } from 'src/features/modules/useModule';
import { components } from 'src/common/schema';
import { useTranslation } from 'react-i18next';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { ChangeEvent, useState } from 'react';
import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';

const Title = () => {
  const { value, setOutput } = useModule('title');
  const [isEditing, setIsEditing] = useState(false);
  const { getPlanStatus } = useModuleConfiguration();
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
  const handleFocus = () => {
    setIsEditing(true);
  };
  const truncateEllipsis = (str: string) => {
    if (str.length > 24) {
      return `${str.slice(0, 24)}...`;
    }
    return str;
  };

  const { error, validate } = useValidation({
    type: 'title',
    validate: validation,
  });
  const handleBlur = () => {
    setIsEditing(false);
    validate();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOutput(e.target.value);
  };
  return (
    <div>
      {getPlanStatus() === 'draft' ? (
        <InputToggle className="editable-title" data-qa="title-module">
          <InputToggle.Item
            data-qa="title-input"
            onBlur={handleBlur}
            textSize="lg"
            style={{ paddingLeft: 0 }}
            value={
              isEditing ? value?.output : truncateEllipsis(value?.output ?? '')
            }
            onFocus={handleFocus}
            onChange={handleChange}
          />
        </InputToggle>
      ) : (
        <LG color={appTheme.palette.blue[600]} data-qa="title-output">
          {truncateEllipsis(value?.output ?? '')}
        </LG>
      )}
      {error && typeof error === 'string' && (
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
