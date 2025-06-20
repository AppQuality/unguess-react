import {
  AccordionNew,
  Button,
  Checkbox,
  Col,
  FormField,
  Grid,
  Hint,
  Label,
  Row,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { ReactComponent as PlusIcon } from '@zendeskgarden/svg-icons/src/16/plus-circle-fill.svg';
import { ReactComponent as XIcon } from '@zendeskgarden/svg-icons/src/16/x-circle-fill.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';
import PercentageInput from './GenderPercentageInput';

const Gender = () => {
  type GenderTypes =
    components['schemas']['OutputModuleGender'][number]['gender'];
  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, setVariant, remove } = useModule('gender');
  const initialFemale =
    value?.output?.find((g) => g.gender === 'female')?.percentage ?? 0;
  const initialMale =
    value?.output?.find((g) => g.gender === 'male')?.percentage ?? 0;
  const initialVariant = value?.variant ?? 'default';
  const [isAddPercentageClicked, setIsAddPercentageClicked] = useState(
    initialVariant === 'percentage'
  );
  const [femalePercentage, setFemalePercentage] = useState(initialFemale);
  const [malePercentage, setMalePercentage] = useState(initialMale);

  const moduleOutputContainsGender = (gender: GenderTypes) =>
    value?.output?.some((g) => g.gender === gender);

  const genderTypes: GenderTypes[] = ['male', 'female'];

  // Initialize desiredGenders from value.output or as an empty array
  const [desiredGenders, setDesiredGenders] = useState<GenderTypes[]>(
    value?.output?.map((g) => g.gender) || genderTypes
  );

  const checkIsPercentageVariant = () => value?.variant === 'percentage';

  const PercentageInputRow = styled(Row)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: ${appTheme.space.sm};
    margin-bottom: ${appTheme.space.sm};
  `;

  const { t } = useTranslation();

  // Error if percentage variant is active and any selected gender has 0 percentage
  const unassignedGenderPercentageError =
    checkIsPercentageVariant() &&
    value?.output.some(
      (g) =>
        (g.gender === 'male' && malePercentage === 0) ||
        (g.gender === 'female' && femalePercentage === 0)
    );

  const percentageError =
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

    // TODO: update this check to show the error messages here
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

  const updateOutput = () => {
    if (!desiredGenders?.length) {
      setOutput([]);
      return;
    }

    const output = desiredGenders.map((gender) => {
      if (value?.variant === 'default') {
        return { gender, percentage: 0 };
      }

      const percentage =
        gender === 'female' ? femalePercentage : malePercentage;

      return { gender, percentage };
    });

    setOutput(output);
  };

  useEffect(() => {
    if (value?.variant === 'default') {
      setMalePercentage(0);
      setFemalePercentage(0);
    } else {
      const hasMale = moduleOutputContainsGender('male');
      const hasFemale = moduleOutputContainsGender('female');
      if (hasMale && hasFemale) {
        setMalePercentage(50);
        setFemalePercentage(50);
      } else if (hasMale) {
        setMalePercentage(100);
      } else if (hasFemale) {
        setFemalePercentage(100);
      }
    }
  }, [value?.variant]);

  useEffect(() => {
    setVariant(isAddPercentageClicked ? 'percentage' : 'default');
  }, [isAddPercentageClicked]);

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  useEffect(() => {
    validate();
  }, [value?.output]);

  useEffect(() => {
    if (
      value?.variant === 'percentage' &&
      desiredGenders.length > 0 &&
      value?.output?.length === 1
    ) {
      setFemalePercentage(Number(100 / desiredGenders.length));
      setMalePercentage(Number(100 / desiredGenders.length));
    }
    if (
      value?.variant === 'percentage' &&
      desiredGenders.length === 1 &&
      value?.output?.length > 1
    ) {
      if (value.output[0].gender === 'male') setMalePercentage(100);
      else setFemalePercentage(100);
    }
    updateOutput();
  }, [desiredGenders, femalePercentage, malePercentage]);

  const totalPercentage =
    (moduleOutputContainsGender('female') ? femalePercentage : 0) +
    (moduleOutputContainsGender('male') ? malePercentage : 0);

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
          <AccordionNew.Header icon={getIconFromModuleType('gender')}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_GENDER_ACCORDION_LABEL')}
            />
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
                    {t('__PLAN_PAGE_MODULE_GENDER_REMOVE_BUTTON')}
                  </Button>
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
                      onClick={() =>
                        setIsAddPercentageClicked(!isAddPercentageClicked)
                      }
                    >
                      {!isAddPercentageClicked && (
                        <>
                          <Button.StartIcon>
                            <PlusIcon />
                          </Button.StartIcon>
                          {t(
                            '__PLAN_PAGE_MODULE_GENDER_ADD_PERCENTAGE_BUTTON_LABEL'
                          )}
                        </>
                      )}
                      {checkIsPercentageVariant() && (
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
                      checked={genderTypes.every((gender) =>
                        desiredGenders.some(
                          (item) => item === gender.toLowerCase()
                        )
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDesiredGenders(genderTypes);
                        } else {
                          setDesiredGenders([]);
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
                          marginBottom: appTheme.space.sm,
                        }}
                      >
                        <Checkbox
                          id={`gender-${gender}`}
                          role="checkbox"
                          key={gender}
                          value={gender.toLowerCase()}
                          name={`gender-${gender}`}
                          disabled={getPlanStatus() !== 'draft'}
                          checked={desiredGenders.some(
                            (item) => item === gender.toLowerCase()
                          )}
                          onChange={(e) => {
                            const previousGenders =
                              desiredGenders.map((item) => item) || [];
                            let updatedGenders: GenderTypes[] = [];
                            if (e.target.checked) {
                              updatedGenders = [
                                ...previousGenders,
                                e.target.value as GenderTypes,
                              ];
                            } else {
                              updatedGenders = previousGenders
                                .filter((item) => item !== e.target.value)
                                .map((item) => item as GenderTypes);
                            }
                            setDesiredGenders(updatedGenders);
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
                {isAddPercentageClicked && (
                  <Col size={6} style={{ marginBottom: appTheme.space.xxs }}>
                    <PercentageInputRow>
                      <PercentageInput
                        planStatus={getPlanStatus()}
                        data-qa="male-percentage-input"
                        readOnly={
                          !moduleOutputContainsGender('male') ||
                          (!moduleOutputContainsGender('female') &&
                            malePercentage === 100)
                        }
                        gender="male"
                        value={
                          moduleOutputContainsGender('male')
                            ? malePercentage
                            : 0
                        } // defaults to 0 only frontend but not added to output
                        onChange={setMalePercentage}
                      />
                    </PercentageInputRow>
                    <PercentageInputRow>
                      <PercentageInput
                        planStatus={getPlanStatus()}
                        data-qa="female-percentage-input"
                        readOnly={
                          !moduleOutputContainsGender('female') ||
                          (!moduleOutputContainsGender('male') &&
                            femalePercentage === 100)
                        }
                        gender="female"
                        value={
                          moduleOutputContainsGender('female')
                            ? femalePercentage
                            : 0
                        } // defaults to 0 only frontend but not added to output
                        onChange={setFemalePercentage}
                      />
                    </PercentageInputRow>
                  </Col>
                )}
              </Row>
              {isAddPercentageClicked && (
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
