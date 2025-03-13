import {
  AccordionNew,
  Button,
  Checkbox,
  Label,
  Hint,
  FormField,
  Span,
} from '@appquality/unguess-design-system';
import { useModule } from 'src/features/modules/useModule';
import { components } from 'src/common/schema';
import { useTranslation } from 'react-i18next';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useEffect } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { ReactComponent as BookClosedIcon } from '@zendeskgarden/svg-icons/src/16/book-closed-fill.svg';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';

const DigitalLiteracy = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  type DigitalLiteracyLevel =
    components['schemas']['OutputModuleLiteracy'][number]['level'];

  const literacyLevels: components['schemas']['OutputModuleLiteracy'][number]['level'][] =
    ['expert', 'intermediate', 'beginner'];

  const { value, setOutput, remove } = useModule('literacy');
  const { t } = useTranslation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'literacy' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__DIGITAL_LITERACY_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'literacy',
    validate: validation,
  });

  const literacyError =
    error && typeof error === 'object' && `literacy.value` in error
      ? error[`literacy.value`]
      : false;

  const getLabelsAndHints = (level: string) => {
    switch (level) {
      case 'beginner':
        return {
          label: t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_BEGINNER_LABEL'),
          hint: t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_BEGINNER_HINT'),
        };
      case 'intermediate':
        return {
          label: t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_INTERMEDIATE_LABEL'),
          hint: t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_INTERMEDIATE_HINT'),
        };
      case 'expert':
        return {
          label: t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_EXPERT_LABEL'),
          hint: t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_EXPERT_HINT'),
        };
      default:
        return { label: '', hint: '' };
    }
  };

  const updateOutput = (
    newOutput: { level: DigitalLiteracyLevel; percentage: number }[]
  ) => {
    if (newOutput.length > 0) {
      const newPercentage = 100 / newOutput.length;
      const finalOutput = newOutput.map((item) => ({
        ...item,
        percentage: newPercentage,
      }));
      setOutput(finalOutput);
    } else {
      setOutput([]);
    }
  };

  useEffect(() => {
    validate();
  }, [value]);

  return (
    <div>
      <AccordionNew
        hasBorder
        className="literacy-checkboxes"
        data-qa="digital-literacy-module"
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={<BookClosedIcon />}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_ACCORDION_LABEL')}
            />
            {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
              <AccordionNew.Meta>
                <Button isBasic isDanger isLink onClick={remove}>
                  <Button.StartIcon>
                    <DeleteIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <FormField>
              <Checkbox
                key="all"
                value="all"
                name="literacy-all"
                // checked if all levels are selected
                checked={literacyLevels.every((level) =>
                  value?.output.some(
                    (item) => item.level === level.toLowerCase()
                  )
                )}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    const newOutput = literacyLevels.map((level) => ({
                      level: level.toLowerCase() as DigitalLiteracyLevel,
                      percentage: 0,
                    }));
                    updateOutput(newOutput);
                  } else {
                    updateOutput([]);
                  }
                }}
              >
                <Label
                  style={{
                    color: appTheme.palette.grey[800],
                    fontSize: appTheme.fontSizes.md,
                  }}
                >
                  {t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_ALL_LABEL')}
                </Label>
                <Hint>
                  {t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_ALL_LABEL_HINT')}
                </Hint>
              </Checkbox>
            </FormField>
            <div style={{ marginLeft: appTheme.space.md }}>
              {literacyLevels.map((level) => (
                <FormField key={level}>
                  <Checkbox
                    key={level}
                    value={level.toLowerCase()}
                    name={`literacy-${level}`}
                    checked={value?.output.some(
                      (item) => item.level === level.toLowerCase()
                    )}
                    onChange={(e) => {
                      const levelValue = e.target.value as DigitalLiteracyLevel;
                      const isChecked = e.target.checked;
                      let updatedOutput = value?.output || [];
                      if (isChecked) {
                        updatedOutput = [
                          ...updatedOutput,
                          { level: levelValue, percentage: 0 },
                        ];
                      } else {
                        updatedOutput = updatedOutput.filter(
                          (item) => item.level !== levelValue
                        );
                      }
                      updateOutput(updatedOutput);
                    }}
                  >
                    <Label
                      style={{
                        color: appTheme.palette.grey[800],
                        fontSize: appTheme.fontSizes.md,
                      }}
                    >
                      {getLabelsAndHints(level).label}
                    </Label>
                    <Hint>{getLabelsAndHints(level).hint}</Hint>
                  </Checkbox>
                </FormField>
              ))}
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>

      {literacyError && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AlertIcon />
          <Span
            style={{
              marginLeft: appTheme.space.xs,
              color: appTheme.palette.red[600],
            }}
            data-qa="literacy-error"
          >
            {literacyError}
          </Span>
        </div>
      )}
    </div>
  );
};

export default DigitalLiteracy;
