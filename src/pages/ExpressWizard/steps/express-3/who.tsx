import {
  ContainerCard,
  FormField as Field,
  Hint,
  Label,
  Message,
  Paragraph,
  Radio,
  Row,
  Span,
  Tag,
  XL,
  XXL,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TranslationIcon } from 'src/assets/icons/translation-icon.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-icon.svg';
import { ReactComponent as WorldIcon } from 'src/assets/icons/world-icon.svg';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';
import * as Yup from 'yup';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  span {
    ${(props) => retrieveComponentStyles('text.primary', props)};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledLanguageTitle = styled(XL)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const StyledRadioField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledTag = styled(Tag)`
  margin-right: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const UsersTags = () => (
  <>
    <StyledTag size="large">
      <StyledTag.Avatar>
        <UsersIcon />
      </StyledTag.Avatar>
      <Span>{t('__EXPRESS_3_WIZARD_STEP_WHO_TAG_USERS')}</Span>
    </StyledTag>
    <StyledTag size="large">
      <StyledTag.Avatar>
        <TranslationIcon />
      </StyledTag.Avatar>
      <Span>{t('__EXPRESS_3_WIZARD_STEP_WHO_TAG_USERS_LOCATION')}</Span>
    </StyledTag>
    <StyledTag size="large">
      <StyledTag.Avatar>
        <WorldIcon />
      </StyledTag.Avatar>
      <Span>{t('__EXPRESS_3_WIZARD_STEP_WHO_TAG_USERS_LANGUAGE')}</Span>
    </StyledTag>
  </>
);

interface RadioItem {
  label: string;
  description?: string;
  value: string;
}

export const WhoStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [age, setAge] = useState(values.age_range);
  const [gender, setGender] = useState(values.gender);
  const [literacy, setLiteracy] = useState(values.digital_literacy);

  const handleAgeClick = (value: string) => {
    setAge(value);
    props.setFieldValue('age_range', value);
  };

  const handleGenderClick = (value: string) => {
    setGender(value);
    props.setFieldValue('gender', value);
  };

  const handleLiteracyClick = (value: string) => {
    setLiteracy(value);
    props.setFieldValue('digital_literacy', value);
  };

  const ageRanges = ['18-24', '25-34', '35-54', '55-70'];
  const genders: RadioItem[] = [
    { label: t('__EXPRESS_3_WIZARD_STEP_WHO_GENDER_MALE'), value: 'male' },
    { label: t('__EXPRESS_3_WIZARD_STEP_WHO_GENDER_FEMALE'), value: 'female' },
  ];
  const literacies: RadioItem[] = [
    {
      label: t('__EXPRESS_3_WIZARD_STEP_WHO_LITERACY_EXPERT'),
      description: t('__EXPRESS_3_WIZARD_STEP_WHO_LITERACY_EXPERT_DESCRIPTION'),
      value: 'expert',
    },
    {
      label: t('__EXPRESS_3_WIZARD_STEP_WHO_LITERACY_INTERMEDIATE'),
      description: t(
        '__EXPRESS_3_WIZARD_STEP_WHO_LITERACY_INTERMEDIATE_DESCRIPTION'
      ),
      value: 'intermediate',
    },
    {
      label: t('__EXPRESS_3_WIZARD_STEP_WHO_LITERACY_BEGINNER'),
      description: t(
        '__EXPRESS_3_WIZARD_STEP_WHO_LITERACY_BEGINNER_DESCRIPTION'
      ),
      value: 'beginner',
    },
  ];

  return (
    <ContainerCard>
      <StepTitle>
        <Span isBold>{t('__EXPRESS_WIZARD_STEP_WHO_LABEL')}</Span>&nbsp;
        {t('__EXPRESS_WIZARD_STEP_WHO_LABEL_EXTRA')}
      </StepTitle>
      <Paragraph>
        {t('__EXPRESS_3_WIZARD_STEP_WHO_LABEL_SELECTION_CRITERIA')}
      </Paragraph>

      <CardDivider />
      <UsersTags />
      <StyledFormField>
        <StyledLanguageTitle>
          {t('__EXPRESS_3_WIZARD_STEP_WHO_DEMOGRAPHICS_CRITERIA_TITLE')}
        </StyledLanguageTitle>
        <Paragraph>
          {t('__EXPRESS_3_WIZARD_STEP_WHO_DEMOGRAPHICS_CRITERIA_DESCRIPTION')}
        </Paragraph>
      </StyledFormField>

      {/* Age ranges Radio buttons */}
      <StyledFormField>
        <Label>
          {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_AGE_RANGE_LABEL')}
          <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
        </Label>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('age_range')}
                {...(errors.age_range && { validation: 'error' })}
                value="all"
                checked={age === 'all'}
                onChange={(e) => handleAgeClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_AGE_RANGE_ALL')}
                </Label>
                <Hint>
                  {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_AGE_RANGE_ALL_HINT')}
                </Hint>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>

        {ageRanges.map((ageRange) => (
          <Row>
            <WizardCol>
              <StyledRadioField>
                <Radio
                  {...props.getFieldProps('age_range')}
                  {...(errors.age_range && { validation: 'error' })}
                  value={ageRange}
                  checked={age === ageRange}
                  onChange={(e) => handleAgeClick(e.target.value)}
                >
                  <Label isRegular>{ageRange}</Label>
                </Radio>
              </StyledRadioField>
            </WizardCol>
          </Row>
        ))}

        {errors.age_range && (
          <Message validation="error">{errors.age_range}</Message>
        )}
      </StyledFormField>

      {/* Gender Radio buttons */}
      <StyledFormField>
        <Label>
          {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_GENDER_LABEL')}
          <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
        </Label>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('gender')}
                {...(errors.gender && { validation: 'error' })}
                value="all"
                checked={gender === 'all'}
                onChange={(e) => handleGenderClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_GENDER_ALL')}
                </Label>
                <Hint>
                  {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_GENDER_ALL_HINT')}
                </Hint>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>

        {genders.map((gen: RadioItem) => (
          <Row>
            <WizardCol>
              <StyledRadioField>
                <Radio
                  {...props.getFieldProps('gender')}
                  {...(errors.gender && { validation: 'error' })}
                  value={gen.value}
                  checked={gen.value === gender}
                  onChange={(e) => handleGenderClick(e.target.value)}
                >
                  <Label isRegular>{gen.label}</Label>
                  {gen.description && <Hint>{gen.description}</Hint>}
                </Radio>
              </StyledRadioField>
            </WizardCol>
          </Row>
        ))}

        {errors.gender && <Message validation="error">{errors.gender}</Message>}
      </StyledFormField>

      {/* Literacy Radio buttons */}
      <StyledFormField>
        <Label>
          {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_LITERACY_LABEL')}
          <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
        </Label>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('digital_literacy')}
                {...(errors.digital_literacy && { validation: 'error' })}
                value="all"
                checked={literacy === 'all'}
                onChange={(e) => handleLiteracyClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_LITERACY_ALL')}
                </Label>
                <Hint>
                  {t('__EXPRESS_3_WIZARD_STEP_WHO_FIELD_LITERACY_ALL_HINT')}
                </Hint>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>

        {literacies.map((item: RadioItem) => (
          <Row>
            <WizardCol>
              <StyledRadioField>
                <Radio
                  {...props.getFieldProps('digital_literacy')}
                  {...(errors.digital_literacy && { validation: 'error' })}
                  value={item.value}
                  checked={item.value === literacy}
                  onChange={(e) => handleLiteracyClick(e.target.value)}
                >
                  <Label isRegular>{item.label}</Label>
                  {item.description && <Hint>{item.description}</Hint>}
                </Radio>
              </StyledRadioField>
            </WizardCol>
          </Row>
        ))}

        {errors.digital_literacy && (
          <Message validation="error">{errors.digital_literacy}</Message>
        )}
      </StyledFormField>
    </ContainerCard>
  );
};

export const WhoStepValidationSchema = Yup.object().shape({
  campaign_language: Yup.string(),
});
