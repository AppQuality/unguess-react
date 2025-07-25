import {
  AccordionNew,
  Button,
  Checkbox,
  FormField,
  Hint,
  Label,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';

import { useIconWithValidation } from './useIcon';

const DigitalLiteracy = () => {
  type DigitalLiteracyLevel =
    components['schemas']['OutputModuleLiteracy'][number]['level'];
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const Icon = useIconWithValidation();

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

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

  const updateOutput = (desiredLevels: { level: DigitalLiteracyLevel }[]) => {
    if (desiredLevels.length > 0) {
      const fixedPercentage: number = Number(
        (100 / desiredLevels.length).toFixed(2) // the percentage is equally divided and it's the same for all levels
      );
      setOutput(
        desiredLevels.map((item) => ({
          ...item,
          percentage: fixedPercentage,
        }))
      );
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
        type={literacyError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_ACCORDION_LABEL')}
            />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Button
                  isBasic
                  isDanger
                  onClick={(e) => {
                    handleDelete();
                    e.stopPropagation();
                  }}
                >
                  <Button.StartIcon>
                    <DeleteIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <Label>{t('__PLAN_PAGE_MODULE_DIGITAL_LITERACY_TITLE')}</Label>
            <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
            <FormField
              style={{
                marginTop: appTheme.space.sm,
              }}
            >
              <Checkbox
                key="all"
                value="all"
                name="literacy-all"
                disabled={getPlanStatus() !== 'draft'}
                // checked if all levels are selected
                checked={literacyLevels.every((level) =>
                  value?.output.some(
                    (item) => item.level === level.toLowerCase()
                  )
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateOutput(
                      literacyLevels.map((level) => ({
                        level: level.toLowerCase() as DigitalLiteracyLevel,
                      }))
                    );
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
                <FormField
                  key={level}
                  style={{
                    marginTop: appTheme.space.sm,
                  }}
                >
                  <Checkbox
                    key={level}
                    value={level.toLowerCase()}
                    name={`literacy-${level}`}
                    disabled={getPlanStatus() !== 'draft'}
                    checked={value?.output.some(
                      (item) => item.level === level.toLowerCase()
                    )}
                    onChange={(e) => {
                      const previousLevels = value?.output.map(
                        (item) => item.level
                      );
                      let updatedLevels: DigitalLiteracyLevel[] = [];
                      if (e.target.checked) {
                        updatedLevels = [
                          ...(previousLevels || []),
                          e.target.value as DigitalLiteracyLevel,
                        ];
                      } else {
                        updatedLevels = previousLevels
                          ?.filter((item) => item !== e.target.value)
                          .map((item) => item) as DigitalLiteracyLevel[];
                      }
                      updateOutput(updatedLevels.map((l) => ({ level: l })));
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

            {literacyError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: appTheme.space.sm,
                }}
              >
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
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </div>
  );
};

export default DigitalLiteracy;
