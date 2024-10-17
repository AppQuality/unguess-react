import {
  Col,
  ContainerCard,
  FormField,
  Grid,
  Paragraph,
  RadioCard,
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
import { ReactComponent as MobileappIconActive } from 'src/assets/icons/mobileapp-active.svg';
import { ReactComponent as MobileappIcon } from 'src/assets/icons/mobileapp.svg';
import { ReactComponent as WebappIconActive } from 'src/assets/icons/webapp-active.svg';
import { ReactComponent as WebappIcon } from 'src/assets/icons/webapp.svg';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
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

const StyledOrCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledProductTypeTitle = styled(XL)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const WhatStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [radioValue, setRadioValue] = useState(values.product_type);

  const handleRadioClick = (value: string) => {
    setRadioValue(value);
    props.setFieldValue('product_type', value);
  };

  return (
    <ContainerCard>
      <StepTitle>
        <Span isBold>{t('__EXPRESS_WIZARD_STEP_WHAT_LABEL')}</Span>&nbsp;
        {t('__EXPRESS_WIZARD_STEP_WHAT_LABEL_EXTRA')}
      </StepTitle>
      <Paragraph>{t('__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION')}</Paragraph>
      <CardDivider />
      <StyledFormField style={{ marginTop: appTheme.space.lg }}>
        <StyledProductTypeTitle>
          {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_LABEL')}
        </StyledProductTypeTitle>
        <Grid>
          <Row>
            <WizardCol xs={12} sm={5}>
              <FormField style={{ height: '100%' }}>
                <RadioCard
                  label={t(
                    '__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_WEBAPP_LABEL'
                  )}
                  icon={<WebappIcon />}
                  iconActive={<WebappIconActive />}
                  {...props.getFieldProps('product_type')}
                  {...(errors.product_type && { validation: 'error' })}
                  value="webapp"
                  checked={radioValue === 'webapp'}
                  onChecked={handleRadioClick}
                />
              </FormField>
            </WizardCol>
            <StyledOrCol>
              <Paragraph>
                {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_OR_LABEL')}
              </Paragraph>
            </StyledOrCol>
            <WizardCol xs={12} sm={5}>
              <FormField style={{ height: '100%' }}>
                <RadioCard
                  label={t(
                    '__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_MOBILEAPP_LABEL'
                  )}
                  icon={<MobileappIcon />}
                  iconActive={<MobileappIconActive />}
                  {...props.getFieldProps('product_type')}
                  {...(errors.product_type && { validation: 'error' })}
                  value="mobileapp"
                  checked={radioValue === 'mobileapp'}
                  onChecked={handleRadioClick}
                />
              </FormField>
            </WizardCol>
          </Row>
          {errors.product_type && (
            <HelpTextMessage validation="error">
              {errors.product_type}
            </HelpTextMessage>
          )}
        </Grid>
      </StyledFormField>
    </ContainerCard>
  );
};

export const WhatStepValidationSchema = Yup.object().shape({
  campaign_reason: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_REQUIRED')
  ),
  product_type: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_REQUIRED')
  ),
});
