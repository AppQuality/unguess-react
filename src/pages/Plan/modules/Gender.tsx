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
  const [isAddPercentageClicked, setIsAddPercentageClicked] = useState(false);

  const [femalePercentage, setFemalePercentage] = useState(0);
  const [malePercentage, setMalePercentage] = useState(0);

  const genderTypes: GenderTypes[] = ['male', 'female'];

  const { value, setOutput, setVariant, remove } = useModule('gender');
  const { t } = useTranslation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'gender' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__GENDER_ERROR_REQUIRED') };
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
        desiredGenders.map((item) => {
          let percentage = fixedPercentage;
          if (isAddPercentageClicked) {
            if (desiredGenders.length === 1) {
              percentage = 100;
              if (item.gender === 'female') {
                setFemalePercentage(100);
                setMalePercentage(0);
              } else {
                setMalePercentage(100);
                setFemalePercentage(0);
              }
            } else if (item.gender === 'female') {
              percentage = femalePercentage;
            } else if (item.gender === 'male') {
              percentage = malePercentage;
            }
          }

          console.log('updateOutput', { ...item, percentage });
          return {
            ...item,
            percentage,
          };
        })
      );
    } else {
      setOutput([]);
      setFemalePercentage(0);
      setMalePercentage(0);
    }
  };

  useEffect(() => {
    setVariant(isAddPercentageClicked ? 'percentage' : 'default');
  }, [isAddPercentageClicked]);

  useEffect(() => {
    if (value?.variant === 'percentage') {
      setIsAddPercentageClicked(true);
      setFemalePercentage(
        value.output.find((v) => v.gender === 'female')?.percentage || 0
      );
      setMalePercentage(
        value.output.find((v) => v.gender === 'male')?.percentage || 0
      );
    }
  }, [value?.variant]);

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  const updatePercentages = () => {
    if (!isAddPercentageClicked) return;
    const genders = value?.output.map((v) => ({
      gender: v.gender as GenderTypes,
    }));
    if (genders && genders.length > 0) {
      updateOutput(genders);
    }
  };

  useEffect(() => {
    validate();
  }, [value]);

  const handleFemaleChange = (v: number) => {
    setFemalePercentage(v);
    updatePercentages();
  };

  const handleMaleChange = (v: number) => {
    setMalePercentage(v);
    updatePercentages();
  };

  const handlePercentage = () => {
    const newValue = !isAddPercentageClicked;
    setIsAddPercentageClicked(newValue);
    setVariant(newValue ? 'percentage' : 'default');
  };

  const totalPercentage =
    (value?.output.some((v) => v.gender === 'female') ? femalePercentage : 0) +
    (value?.output.some((v) => v.gender === 'male') ? malePercentage : 0);

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
                <Col style={{ marginBottom: appTheme.space.sm }}>
                  <Label>{t('__PLAN_PAGE_MODULE_GENDER_TITLE')}</Label>
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                </Col>
                <Col>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="small" onClick={handlePercentage}>
                      {!isAddPercentageClicked && (
                        <>
                          <Button.StartIcon>
                            <PlusIcon />
                          </Button.StartIcon>
                          <Label>
                            {t(
                              '__PLAN_PAGE_MODULE_GENDER_ADD_PERCENTAGE_BUTTON_LABEL'
                            )}
                          </Label>
                        </>
                      )}
                      {(value?.variant === 'percentage' ||
                        isAddPercentageClicked) && (
                        <>
                          <Button.StartIcon>
                            <XIcon />
                          </Button.StartIcon>
                          <Label>
                            {t(
                              '__PLAN_PAGE_MODULE_GENDER_REMOVE_PERCENTAGE_BUTTON_LABEL'
                            )}
                          </Label>
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
                      key="all"
                      value="all"
                      name="gender-all"
                      disabled={getPlanStatus() !== 'draft'}
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
                      <Hint>
                        {t('__PLAN_PAGE_MODULE_GENDER_ALL_LABEL_HINT')}
                      </Hint>
                    </Checkbox>
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col size={isAddPercentageClicked ? 6 : 12}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: appTheme.space.sm,
                      marginLeft: appTheme.space.md,
                    }}
                  >
                    {genderTypes.map((gender) => (
                      <FormField
                        key={gender}
                        style={{ marginTop: appTheme.space.sm }}
                      >
                        <Checkbox
                          key={gender}
                          value={gender.toLowerCase()}
                          name={`gender-${gender}`}
                          disabled={getPlanStatus() !== 'draft'}
                          checked={value?.output.some(
                            (item) => item.gender === gender.toLowerCase()
                          )}
                          onChange={(e) => {
                            const previousGenders =
                              value?.output.map((item) => item.gender) || [];
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
                            updateOutput(
                              updatedGenders.map((g) => ({ gender: g }))
                            );
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
                </Col>
                {isAddPercentageClicked && (
                  <Col size={6}>
                    <Row
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <PercentageInput
                        readOnly={
                          malePercentage === 0 &&
                          !value?.output.some((g) => g.gender === 'male')
                        }
                        gender="male"
                        value={malePercentage ?? 0}
                        onChange={handleMaleChange}
                      />
                    </Row>
                    <Row
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <PercentageInput
                        readOnly={
                          femalePercentage === 0 &&
                          !value?.output.some((g) => g.gender === 'female')
                        }
                        gender="female"
                        value={femalePercentage ?? 0}
                        onChange={handleFemaleChange}
                      />
                    </Row>
                  </Col>
                )}
              </Row>
              {isAddPercentageClicked && (
                <>
                  <Divider style={{ marginBottom: appTheme.space.md }} />
                  <Row>
                    <Col>
                      <Label
                        style={{
                          marginLeft: appTheme.space.md,
                        }}
                      >
                        {t('__PLAN_PAGE_MODULE_GENDER_TOTAL_PERCENTAGE_LABEL')}
                      </Label>
                    </Col>
                    <Col>
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
