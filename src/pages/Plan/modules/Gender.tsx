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

const Gender = () => {
  type GenderTypes =
    components['schemas']['OutputModuleGender'][number]['gender'];
  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const UserGroupIconError = styled(UserGroupIcon)`
    color: ${appTheme.palette.red[900]};
  `;
  const genderTypes: GenderTypes[] = ['male', 'female'];

  const { value, setOutput, remove } = useModule('gender');
  const { t } = useTranslation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'gender' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__DIGITAL_LITERACY_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'gender',
    validate: validation,
  });

  const genderError =
    error && typeof error === 'object' && `gender.value` in error
      ? error[`gender.value`]
      : false;

  const getLabelsAndHints = (gender: string) => {
    switch (gender) {
      case 'male':
        return {
          label: t('__PLAN_PAGE_MODULE_GENDER_MALE_LABEL'),
          hint: t('__PLAN_PAGE_MODULE_GENDER_MALE_HINT'),
        };
      case 'female':
        return {
          label: t('__PLAN_PAGE_MODULE_MODULE_GENDER_FEMALE_LABEL'),
          hint: t('__PLAN_PAGE_MODULE_MODULE_GENDER_FEMALE_HINT'),
        };
      default:
        return { label: '', hint: '' };
    }
  };

  const updateOutput = (desiredGenders: { gender: GenderTypes }[]) => {
    if (desiredGenders.length > 0) {
      const fixedPercentage: number = Number(
        (100 / desiredGenders.length).toFixed(2) // the percentage is equally divided and it's the same for all genders
      );
      setOutput(
        desiredGenders.map((item) => ({
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
        className="gender-checkboxes"
        data-qa="gender-module"
        type={genderError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header
            icon={
              genderError ? (
                <UserGroupIconError />
              ) : (
                <UserGroupIcon color={appTheme.palette.blue[600]} />
              )
            }
          >
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_GENDER_ACCORDION_LABEL')}
            />
            {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
              <AccordionNew.Meta>
                <Button isBasic isDanger isLink onClick={remove}>
                  <Button.StartIcon>
                    <DeleteIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_GENDER_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <Label>{t('__PLAN_PAGE_MODULE_GENDER_TITLE')}</Label>
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
                checked={genderTypes.every((gender) =>
                  value?.output.some(
                    (item) => item.gender === gender.toLowerCase()
                  )
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateOutput(
                      genderTypes.map((g) => ({
                        gender: g.toLowerCase() as GenderTypes,
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
                  {t('__PLAN_PAGE_MODULE_GENDER_ALL_LABEL')}
                </Label>
                <Hint>{t('__PLAN_PAGE_MODULE_GENDER_ALL_LABEL_HINT')}</Hint>
              </Checkbox>
            </FormField>
            <div style={{ marginLeft: appTheme.space.md }}>
              {genderTypes.map((gender) => (
                <FormField
                  key={gender}
                  style={{
                    marginTop: appTheme.space.sm,
                  }}
                >
                  <Checkbox
                    key={gender}
                    value={gender.toLowerCase()}
                    name={`gender-${gender}`}
                    disabled={getPlanStatus() === 'pending_review'}
                    checked={value?.output.some(
                      (item) => item.gender === gender.toLowerCase()
                    )}
                    onChange={(e) => {
                      const previousGenders = value?.output.map(
                        (item) => item.gender
                      );
                      let updatedGenders: GenderTypes[] = [];
                      if (e.target.checked) {
                        updatedGenders = [
                          ...(previousGenders || []),
                          e.target.value as GenderTypes,
                        ];
                      } else {
                        updatedGenders = previousGenders
                          ?.filter((item) => item !== e.target.value)
                          .map((item) => item) as GenderTypes[];
                      }
                      updateOutput(updatedGenders.map((g) => ({ gender: g })));
                    }}
                  >
                    <Label
                      style={{
                        color: appTheme.palette.grey[800],
                        fontSize: appTheme.fontSizes.md,
                      }}
                    >
                      {getLabelsAndHints(gender).label}
                    </Label>
                    <Hint>{getLabelsAndHints(gender).hint}</Hint>
                  </Checkbox>
                </FormField>
              ))}
            </div>

            {genderError && (
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
                  {genderError}
                </Span>
              </div>
            )}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </div>
  );
};

export default Gender;
