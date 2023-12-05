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
import { addBusinessDays } from 'date-fns';
import { EXPRESS_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';

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

export const WhoStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [radioValue, setRadioValue] = useState(values.campaign_language);

  const handleRadioClick = (value: string) => {
    setRadioValue(value);
    props.setFieldValue('campaign_language', value);

    // Update initial values for when
    if (values.campaign_date) {
      let endDate = addBusinessDays(
        values.campaign_date,
        EXPRESS_BUSINESS_DAYS_TO_ADD
      );

      if (value === 'en') {
        endDate = addBusinessDays(
          values.campaign_date,
          EXPRESS_BUSINESS_DAYS_TO_ADD + 1
        );
      }

      props.setFieldValue('campaign_date_end', endDate);
    }
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
