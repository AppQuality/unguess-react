import {
  AccordionNew,
  Checkbox,
  Col,
  FormField,
  Grid,
  Hint,
  IconButton,
  Label,
  Row,
  Span,
  Tooltip,
  Button,
} from '@appquality/unguess-design-system';
import { ReactComponent as PlusIcon } from '@zendeskgarden/svg-icons/src/16/plus-circle-fill.svg';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { ReactComponent as XIcon } from '@zendeskgarden/svg-icons/src/16/x-circle-fill.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { Divider } from 'src/common/components/divider';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';
import PercentageInput from './GenderPercentageInput';
import { useIconWithValidation } from './useIcon';

const PercentageInputRow = styled(Row)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: ${appTheme.space.sm};
  margin-bottom: ${appTheme.space.sm};
`;

const Gender = () => {
  type GenderTypes =
    components['schemas']['OutputModuleGender'][number]['gender'];
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, setVariant, remove } = useModule('gender');

  const Icon = useIconWithValidation();

  const moduleOutputContainsGender = (gender: GenderTypes) =>
    value?.output?.some((g) => g.gender === gender);

  const genderTypes: GenderTypes[] = ['male', 'female'];

  const checkIsPercentageVariant = () => value?.variant === 'percentage';

  const { t } = useTranslation();

  // Error if percentage variant is active and any selected gender has 0 percentage
  const unassignedGenderPercentageError =
    checkIsPercentageVariant() &&
    value?.output.some(
      (g) =>
        (g.gender === 'male' && g.percentage === 0) ||
        (g.gender === 'female' && g.percentage === 0)
    ) &&
    value?.output.length > 0;

  const percentageError =
    (value?.output?.length ?? 0) > 0 &&
    checkIsPercentageVariant() &&
    (value?.output?.find((g) => g.gender === 'male')?.percentage ?? 0) +
      (value?.output?.find((g) => g.gender === 'female')?.percentage ?? 0) !==
      100;

  const validation = (
    module: components['schemas']['Module'] & { type: 'gender' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__GENDER_ERROR_REQUIRED') };
    }

    // Only to trigger module error, but the message is shown at the bottom of the module
    if (unassignedGenderPercentageError || percentageError) {
      return {
        value: '',
      };
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

  useEffect(() => {
    // If variant is default, always reset percentages to 0
    if (value?.variant === 'default') {
      setOutput(
        value?.output?.map((g) => ({
          gender: g.gender,
          percentage: g.percentage || 0, // Ensure percentage is set to 0 if not already defined
        }))
      );
    }
    if (value?.variant === 'percentage') {
      // If variant is percentage, set percentages based on current output
      setOutput(
        value?.output.map((g) => ({
          ...g,
          percentage:
            value?.output && value.output.length > 0 // output can be empty, so we need to handle that case
              ? Number(100 / value.output.length)
              : 0,
        }))
      );
    }
  }, [value?.variant]);

  const handleChangeVariant = () => {
    setVariant(value?.variant === 'default' ? 'percentage' : 'default');
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  useEffect(() => {
    validate();
  }, [value?.output]);

  const totalPercentage =
    (value?.output?.find((g) => g.gender === 'female')?.percentage ?? 0) +
    (value?.output?.find((g) => g.gender === 'male')?.percentage ?? 0);

  return (
    <div>
      <AccordionNew
        hasBorder
        className="gender-checkboxes"
        data-qa="gender-module"
        type={
          genderError || unassignedGenderPercentageError || percentageError
            ? 'danger'
            : 'default'
        }
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_GENDER_ACCORDION_LABEL')}
            />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t('__PLAN_PAGE_MODULE_GENDER_REMOVE_TOOLTIP_BUTTON')}
                >
                  <IconButton
                    isDanger
                    onClick={(e) => {
                      handleDelete();
                      e.stopPropagation();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <Grid>
              <Row>
                <Col size={8} style={{ marginBottom: appTheme.space.sm }}>
                  <Label>{t('__PLAN_PAGE_MODULE_GENDER_TITLE')}</Label>
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                </Col>
                <Col size={4} style={{ marginBottom: appTheme.space.sm }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      aria-label="change-variant"
                      size="small"
                      disabled={getPlanStatus() !== 'draft'}
                      onClick={handleChangeVariant}
                    >
                      {value?.variant === 'default' ? (
                        <>
                          <Button.StartIcon>
                            <PlusIcon />
                          </Button.StartIcon>
                          {t(
                            '__PLAN_PAGE_MODULE_GENDER_ADD_PERCENTAGE_BUTTON_LABEL'
                          )}
                        </>
                      ) : (
                        <>
                          <Button.StartIcon>
                            <XIcon />
                          </Button.StartIcon>
                          {t(
                            '__PLAN_PAGE_MODULE_GENDER_REMOVE_PERCENTAGE_BUTTON_LABEL'
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} style={{ marginBottom: appTheme.space.sm }}>
                  <FormField>
                    <Checkbox
                      role="checkbox"
                      key="all"
                      value="all"
                      name="gender-all"
                      disabled={getPlanStatus() !== 'draft'}
                      // checked if all genders are selected
                      checked={value?.output?.length === genderTypes.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOutput(
                            genderTypes.map((gender) => ({
                              gender,
                              percentage:
                                value?.variant === 'percentage'
                                  ? 100 / genderTypes.length
                                  : 0,
                            }))
                          );
                        } else {
                          setOutput([]);
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
                      <Hint>
                        {t('__PLAN_PAGE_MODULE_GENDER_ALL_LABEL_HINT')}
                      </Hint>
                    </Checkbox>
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col
                  size={checkIsPercentageVariant() ? 6 : 12}
                  style={{ marginBottom: appTheme.space.xxs }}
                >
                  <div
                    style={{
                      paddingLeft: appTheme.space.md,
                    }}
                  >
                    {genderTypes.map((gender) => (
                      <FormField
                        key={gender}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: appTheme.space.lg,
                          marginBottom: checkIsPercentageVariant()
                            ? appTheme.space.sm
                            : undefined,
                        }}
                      >
                        <Checkbox
                          id={`gender-${gender}`}
                          role="checkbox"
                          key={gender}
                          value={gender.toLowerCase()}
                          name={`gender-${gender}`}
                          disabled={getPlanStatus() !== 'draft'}
                          checked={value?.output?.some(
                            (item) => item.gender === gender.toLowerCase()
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOutput([
                                ...(value?.output ?? []),
                                {
                                  gender,
                                  percentage:
                                    value?.variant === 'percentage'
                                      ? 100 -
                                        (value?.output?.find(
                                          (item) =>
                                            item.gender ===
                                            (gender === 'male'
                                              ? 'female'
                                              : 'male')
                                        )?.percentage ?? 0)
                                      : 0,
                                },
                              ]);
                            } else {
                              setOutput(
                                (value?.output ?? []).filter(
                                  (item) => item.gender !== gender
                                )
                              );
                            }
                          }}
                        >
                          <Label
                            htmlFor={`gender-${gender}`}
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
                </Col>
                {value?.variant === 'percentage' && (
                  <Col size={6} style={{ marginBottom: appTheme.space.xxs }}>
                    <PercentageInputRow>
                      <PercentageInput
                        planStatus={getPlanStatus()}
                        data-qa="male-percentage-input"
                        disabled={!moduleOutputContainsGender('male')}
                        readOnly={
                          !moduleOutputContainsGender('female') &&
                          value?.output?.find((item) => item.gender === 'male')
                            ?.percentage === 100
                        }
                        gender="male"
                        value={
                          value?.output?.find((item) => item.gender === 'male')
                            ?.percentage || 0
                        } // defaults to 0 only frontend but not added to output
                      />
                    </PercentageInputRow>
                    <PercentageInputRow>
                      <PercentageInput
                        planStatus={getPlanStatus()}
                        data-qa="female-percentage-input"
                        disabled={!moduleOutputContainsGender('female')}
                        readOnly={
                          !moduleOutputContainsGender('male') &&
                          value?.output?.find(
                            (item) => item.gender === 'female'
                          )?.percentage === 100
                        }
                        gender="female"
                        value={
                          value?.output?.find(
                            (item) => item.gender === 'female'
                          )?.percentage || 0
                        } // defaults to 0 only frontend but not added to output
                      />
                    </PercentageInputRow>
                  </Col>
                )}
              </Row>
              {value?.variant === 'percentage' && (
                <>
                  <Divider style={{ marginBottom: appTheme.space.md }} />
                  <Row>
                    <Col style={{ marginBottom: appTheme.space.xxs }}>
                      <Label
                        style={{
                          marginLeft: appTheme.space.md,
                        }}
                      >
                        {t('__PLAN_PAGE_MODULE_GENDER_TOTAL_PERCENTAGE_LABEL')}
                      </Label>
                    </Col>
                    <Col style={{ marginBottom: appTheme.space.xxs }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginRight: appTheme.space.xxl,
                        }}
                      >
                        <Label
                          style={{
                            color:
                              totalPercentage !== 100
                                ? appTheme.palette.red[600]
                                : undefined,
                          }}
                        >
                          {totalPercentage}%
                        </Label>
                      </div>
                    </Col>
                  </Row>
                </>
              )}

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

              {percentageError && (
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
                    data-qa="gender-percentage-error"
                  >
                    {t('__PLAN_PAGE_MODULE_GENDER_PERCENTAGE_ERROR')}
                  </Span>
                </div>
              )}
              {unassignedGenderPercentageError && (
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
                    data-qa="gender-unassigned-percentage-error"
                  >
                    {t('__PLAN_PAGE_MODULE_GENDER_UNASSIGNED_PERCENTAGE_ERROR')}
                  </Span>
                </div>
              )}
            </Grid>
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

export default Gender;
