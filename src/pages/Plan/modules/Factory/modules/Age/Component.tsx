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

const Age = () => {
  type AgeRange = {
    min: components['schemas']['OutputModuleAge'][number]['min'];
    max: components['schemas']['OutputModuleAge'][number]['max'];
  };

  const { getPlanStatus } = useModuleConfiguration();
  const MAXAGE = 70; // the highest permitted value chosen by user/design
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('age');
  const { t } = useTranslation();
  const Icon = useIconWithValidation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'age' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__AGE_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'age',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const defaultAgeRanges = [
    {
      min: 16,
      max: 17,
      label: t('__PLAN_PAGE_MODULE_AGE_16_18_LABEL'),
    },
    {
      min: 18,
      max: 24,
      label: '18 - 24 years old',
    },
    {
      min: 25,
      max: 34,
      label: '25 - 34 years old',
    },
    {
      min: 35,
      max: 54,
      label: '35 - 54 years old',
    },
    {
      min: 55,
      max: MAXAGE,
      label: 'Over 55',
    },
  ];

  const ageError =
    error && typeof error === 'object' && `age.value` in error
      ? error[`age.value`]
      : false;

  const updateOutput = (desiredAgeRanges: { range: AgeRange }[]) => {
    if (desiredAgeRanges.length > 0) {
      const fixedPercentage: number = Number(
        (100 / desiredAgeRanges.length).toFixed(2) // the percentage is equally divided and it's the same for all genders
      );
      setOutput(
        desiredAgeRanges.map((item) => ({
          ...item.range,
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

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <div>
      <AccordionNew
        hasBorder
        className="age-checkboxes"
        data-qa="age-module"
        type={ageError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_AGE_LABEL')} />
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
                  {t('__PLAN_PAGE_MODULE_AGE_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          {isDefaultVariant && (
            <AccordionNew.Panel>
              <Label>{t('__PLAN_PAGE_MODULE_AGE_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <FormField
                style={{
                  marginTop: appTheme.space.sm,
                }}
              >
                <Checkbox
                  key="all"
                  value="all"
                  name="age-all"
                  disabled={getPlanStatus() !== 'draft'}
                  // checked if all ages are selected
                  checked={defaultAgeRanges.every((ageRange) =>
                    value?.output.some(
                      (item) =>
                        item.min === ageRange.min && item.max === ageRange.max
                    )
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOutput(
                        defaultAgeRanges.map((ar) => ({
                          range: {
                            min: ar.min,
                            max: ar.max,
                          },
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
                    {t('__PLAN_PAGE_MODULE_AGE_ALL_LABEL')}
                  </Label>
                  <Hint>{t('__PLAN_PAGE_MODULE_AGE_ALL_LABEL_HINT')}</Hint>
                </Checkbox>
              </FormField>
              <div style={{ marginLeft: appTheme.space.md }}>
                {defaultAgeRanges.map((ar) => (
                  <FormField
                    key={`range-${ar.min}-${ar.max}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`range-${ar.min}`}
                      value={`${ar.min}-${ar.max}`}
                      name={`range-${ar.min}-${ar.max}`}
                      disabled={getPlanStatus() !== 'draft'}
                      checked={value?.output.some(
                        (item) => item.min <= ar.min && item.max >= ar.max
                      )}
                      onChange={(e) => {
                        const updatedAgeRanges = e.target.checked
                          ? [
                              ...(value?.output || []),
                              {
                                min: ar.min,
                                max: ar.max,
                              },
                            ]
                          : value?.output?.filter(
                              (item) =>
                                item.min !== ar.min && item.max !== ar.max
                            );
                        updateOutput(
                          updatedAgeRanges.map((a) => ({ range: a }))
                        );
                      }}
                    >
                      <Label
                        style={{
                          color: appTheme.palette.grey[800],
                          fontSize: appTheme.fontSizes.md,
                        }}
                      >
                        {ar.label}
                      </Label>
                    </Checkbox>
                  </FormField>
                ))}
              </div>

              {ageError && (
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
                    data-qa="age-error"
                  >
                    {ageError}
                  </Span>
                </div>
              )}
            </AccordionNew.Panel>
          )}
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

export default Age;
