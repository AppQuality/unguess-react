import {
  ContainerCard,
  Hint,
  Label,
  Message,
  Paragraph,
  Radio,
  Row,
  Span,
  XL,
  XXL,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { t } from 'i18next';
import { useState } from 'react';
import { WizardModel } from '../wizardModel';
import { CardDivider } from '../cardDivider';
import { WizardCol } from '../wizardCol';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.grey[800]};
  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledLanguageTitle = styled(XL)`
  padding-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const StyledRadioField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledHint = styled(Hint)`
  color: ${({ theme }) => theme.palette.yellow[800]};
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
        <Label>{t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_LABEL')}</Label>
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
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_1')}
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
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_2')}
                </Label>
                <StyledHint>
                  {t('__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_2_HINT')}
                </StyledHint>
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
