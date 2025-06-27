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
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

const Income = () => {
  type IncomeRange = {
    min: components['schemas']['OutputModuleIncomeRange'][number]['min'];
    max: components['schemas']['OutputModuleIncomeRange'][number]['max'];
  };

  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('annual_income_range');
  const { t } = useTranslation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'annual_income_range' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__INCOME_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'annual_income_range',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const defaultIncomeRange = [
    {
      min: 0,
      max: 25000,
      label: t('__PLAN_PAGE_MODULE_INCOME_UNDER_25K_LABEL'),
    },
    {
      min: 25001,
      max: 50000,
      label: t('__PLAN_PAGE_MODULE_INCOME_25K_TO_50K_LABEL'),
    },
    {
      min: 50001,
      max: 999999999,
      label: t('__PLAN_PAGE_MODULE_INCOME_OVER_50K_LABEL'),
    },
  ];

  const incomeError =
    error && typeof error === 'object' && `annual_income_range.value` in error
      ? error[`annual_income_range.value`]
      : false;

  const updateOutput = (desiredIncomeRanges: { range: IncomeRange }[]) => {
    if (desiredIncomeRanges.length > 0) {
      setOutput(
        desiredIncomeRanges.map((item) => ({
          ...item.range,
          percentage: 0,
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
        className="income-checkboxes"
        data-qa="income-module"
        type={incomeError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header
            icon={getIconFromModuleType('annual_income_range')}
          >
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_INCOME_LABEL')} />
            {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
              getPlanStatus() === 'draft' && (
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
                    {t('__PLAN_PAGE_MODULE_INCOME_REMOVE_BUTTON')}
                  </Button>
                </AccordionNew.Meta>
              )}
          </AccordionNew.Header>
          {isDefaultVariant && (
            <AccordionNew.Panel>
              <Label>{t('__PLAN_PAGE_MODULE_INCOME_TITLE')}</Label>
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
                  checked={defaultIncomeRange.every((incomeRange) =>
                    value?.output.some(
                      (item) =>
                        item.min === incomeRange.min &&
                        item.max === incomeRange.max
                    )
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOutput(
                        defaultIncomeRange.map((ar) => ({
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
                    {t('__PLAN_PAGE_MODULE_INCOME_ALL_LABEL')}
                  </Label>
                  <Hint>{t('__PLAN_PAGE_MODULE_INCOME_ALL_LABEL_HINT')}</Hint>
                </Checkbox>
              </FormField>
              <div style={{ marginLeft: appTheme.space.md }}>
                {defaultIncomeRange.map((ar) => (
                  <FormField
                    key={`range-${ar.min}-${ar.max}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`income-range-${ar.min}`}
                      value={`${ar.min}-${ar.max}`}
                      name={`income-range-${ar.min}-${ar.max}`}
                      disabled={getPlanStatus() !== 'draft'}
                      checked={value?.output.some(
                        (item) => item.min <= ar.min && item.max >= ar.max
                      )}
                      onChange={(e) => {
                        const updatedIncomeRanges = e.target.checked
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
                          updatedIncomeRanges.map((a) => ({ range: a }))
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

              {incomeError && (
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
                    data-qa="income-error"
                  >
                    {incomeError}
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

export default Income;
