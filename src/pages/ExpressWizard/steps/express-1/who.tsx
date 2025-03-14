import {
  ContainerCard,
  FormField as Field,
  Label,
  Message,
  Paragraph,
  Radio,
  Row,
  Span,
  XL,
  XXL,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
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
  padding-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const StyledRadioField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

export const WhoStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [radioValue, setRadioValue] = useState(values.campaign_language);

  const handleRadioClick = (value: string) => {
    setRadioValue(value);
    props.setFieldValue('campaign_language', value);
  };

  return (
    <ContainerCard>
      <StepTitle>
        <Span isBold>{t('__EXPRESS_WIZARD_STEP_WHO_LABEL')}</Span>&nbsp;
        {t('__EXPRESS_WIZARD_STEP_WHO_LABEL_EXTRA')}
      </StepTitle>
      <Paragraph>{t('__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION')}</Paragraph>
      <CardDivider />
      <StyledFormField>
        <StyledLanguageTitle>
          {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_TITLE')}
        </StyledLanguageTitle>
        <Paragraph>
          {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_DESCRIPTION')}
        </Paragraph>
      </StyledFormField>
      <StyledFormField>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_LABEL')}
          <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
        </Label>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('campaign_language')}
                {...(errors.campaign_language && { validation: 'error' })}
                value="it"
                checked={radioValue === 'it'}
                onChange={(e) => handleRadioClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_IT')}
                </Label>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('campaign_language')}
                {...(errors.campaign_language && { validation: 'error' })}
                value="en"
                checked={radioValue === 'en'}
                onChange={(e) => handleRadioClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_EN')}
                </Label>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('campaign_language')}
                {...(errors.campaign_language && { validation: 'error' })}
                value="es"
                checked={radioValue === 'es'}
                onChange={(e) => handleRadioClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_ES')}
                </Label>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>
        <Row>
          <WizardCol>
            <StyledRadioField>
              <Radio
                {...props.getFieldProps('campaign_language')}
                {...(errors.campaign_language && { validation: 'error' })}
                value="fr"
                checked={radioValue === 'fr'}
                onChange={(e) => handleRadioClick(e.target.value)}
              >
                <Label isRegular>
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_FR')}
                </Label>
              </Radio>
            </StyledRadioField>
          </WizardCol>
        </Row>
        {errors.campaign_language && (
          <Message validation="error">{errors.campaign_language}</Message>
        )}
      </StyledFormField>
    </ContainerCard>
  );
};

export const WhoStepValidationSchema = Yup.object().shape({
  campaign_language: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHO_FIELD_CAMPAIGN_LANGUAGE_REQUIRED')
  ),
});
