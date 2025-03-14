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
import { ReactComponent as UserGroupIcon } from '@zendeskgarden/svg-icons/src/16/user-group-fill.svg';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';

const Age = () => {
  type AgeRange = Pick<
    components['schemas']['OutputModuleAge'][number],
    'min' | 'max'
  >;

  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const UserGroupIconError = styled(UserGroupIcon)`
    color: ${appTheme.palette.red[900]};
  `;

  const { value, setOutput, remove } = useModule('age');
  const { t } = useTranslation();
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

  const defaultAgeRanges: { min: number; max: number }[] = [
    {
      min: 16,
      max: 24,
    },
    {
      min: 25,
      max: 34,
    },
    {
      min: 35,
      max: 54,
    },
    {
      min: 55,
      max: 70,
    },
  ];

  // for future use cases we can pass the ranges from other input sources
  const generateAgeRanges = (
    ranges: { min: number; max: number }[] = defaultAgeRanges
  ) => {
    const ageRanges: AgeRange[] = [];
    ranges.forEach((range) => {
      ageRanges.push({
        min: range.min,
        max: range.max,
      });
    });
    return ageRanges;
  };

  const ageRanges = generateAgeRanges();

  const ageError =
    error && typeof error === 'object' && `age.value` in error
      ? error[`age.value`]
      : false;

  const getLabels = (ageRange: AgeRange) => {
    switch (ageRange.min) {
      case 16:
        return t('__PLAN_PAGE_MODULE_AGE_BASE_RANGE_LABEL');
      case 25:
        return t('__PLAN_PAGE_MODULE_AGE_FIRST_RANGE_LABEL');
      case 35:
        return t('__PLAN_PAGE_MODULE_AGE_SECOND_RANGE_LABEL');
      case 55:
        return t('__PLAN_PAGE_MODULE_AGE_THIRD_RANGE_LABEL');
      default:
        return '';
    }
  };

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
          <AccordionNew.Header
            icon={
              ageError ? (
                <UserGroupIconError />
              ) : (
                <UserGroupIcon color={appTheme.palette.blue[600]} />
              )
            }
          >
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_AGE_LABEL')} />
            {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
              <AccordionNew.Meta>
                <Button isBasic isDanger isLink onClick={remove}>
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
                  name="gender-all"
                  disabled={getPlanStatus() === 'pending_review'}
                  // checked if all genders are selected
                  checked={ageRanges.every((ageRange) =>
                    value?.output.some(
                      (item) =>
                        item.min === ageRange.min && item.max === ageRange.max
                    )
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOutput(
                        ageRanges.map((ar) => ({
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
                {ageRanges.map((ar) => (
                  <FormField
                    key="range"
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`range-${ar.min}`}
                      value={`${ar.min}-${ar.max}`}
                      name={`range-${ar.min}-${ar.max}`}
                      disabled={getPlanStatus() === 'pending_review'}
                      checked={value?.output.some(
                        (item) => item.min === ar.min && item.max === ar.max
                      )}
                      onChange={(e) => {
                        const previousAgeRanges = value?.output.map(
                          (item) => item
                        );
                        let updatedAgeRanges: AgeRange[] = [];
                        if (e.target.checked) {
                          updatedAgeRanges = [
                            ...(previousAgeRanges || []),
                            {
                              min: ar.min,
                              max: ar.max,
                            },
                          ];
                        } else {
                          updatedAgeRanges = previousAgeRanges
                            ?.filter(
                              (item) =>
                                item.min !== ar.min && item.max !== ar.max
                            )
                            .map((item) => item) as AgeRange[];
                        }
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
                        {getLabels(ar)}
                      </Label>
                      <Hint>{getLabels(ar)}</Hint>
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
                    data-qa="gender-error"
                  >
                    {ageError}
                  </Span>
                </div>
              )}
            </AccordionNew.Panel>
          )}
        </AccordionNew.Section>
      </AccordionNew>
    </div>
  );
};

export default Age;
