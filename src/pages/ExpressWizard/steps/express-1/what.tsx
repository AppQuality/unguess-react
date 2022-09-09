import {
  Col,
  Dropdown,
  Grid,
  Item,
  Label,
  MediaInput,
  Menu,
  Paragraph,
  RadioCard,
  Row,
  Select,
  Span,
  XL,
  XXL,
  theme as globalTheme,
  ContainerCard,
} from '@appquality/unguess-design-system';
import { Field as FormField } from '@zendeskgarden/react-forms';
import { Field as DropdownField } from '@zendeskgarden/react-dropdowns';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { t } from 'i18next';
import { ReactComponent as WebappIcon } from 'src/assets/icons/webapp.svg';
import { ReactComponent as WebappIconActive } from 'src/assets/icons/webapp-active.svg';
import { ReactComponent as MobileappIcon } from 'src/assets/icons/mobileapp.svg';
import { ReactComponent as MobileappIconActive } from 'src/assets/icons/mobileapp-active.svg';
import { ReactComponent as DocumentIcon } from 'src/assets/icons/document-icon.svg';
import { ReactComponent as FlagIcon } from 'src/assets/icons/flag-icon.svg';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { useState } from 'react';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';

interface Reasons {
  [key: string]: string;
}

export const reasonItems: Reasons = {
  'reason-a': t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_OPTION_1'),
  'reason-b': t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_OPTION_2'),
  'reason-c': t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_OPTION_3'),
};

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.grey[800]};
  span {
    color: ${({ theme }) => theme.colors.primaryHue};
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
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const WhatStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [radioValue, setRadioValue] = useState(values.product_type);
  const [selectedItem, setSelectedItem] = useState(values.campaign_reason);

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
      <StyledFormField>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_LABEL')}
          <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
        </Label>
        <MediaInput
          type="text"
          start={<DocumentIcon />}
          placeholder={t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER')}
          {...props.getFieldProps('campaign_name')}
          focusInset
          {...(errors.campaign_name && { validation: 'error' })}
        />
        {errors.campaign_name && (
          <HelpTextMessage validation="error">
            {errors.campaign_name}
          </HelpTextMessage>
        )}
      </StyledFormField>
      <StyledFormField>
        <Dropdown
          {...props.getFieldProps('campaign_reason')}
          {...(errors.campaign_reason && { validation: 'error' })}
          onSelect={(item) => {
            props.setFieldValue('campaign_reason', item);
            setSelectedItem(item);
          }}
          selectedItem={selectedItem}
        >
          <DropdownField>
            <Label>
              {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_LABEL')}
            </Label>
            <Select start={<FlagIcon />}>
              {selectedItem && reasonItems[`${selectedItem}`]}
            </Select>
            {errors.campaign_reason && (
              <HelpTextMessage validation="error">
                {errors.campaign_reason}
              </HelpTextMessage>
            )}
          </DropdownField>
          <Menu>
            {Object.keys(reasonItems).map((key) => (
              <Item key={key} value={key}>
                {reasonItems[`${key}`]}
              </Item>
            ))}
          </Menu>
        </Dropdown>
      </StyledFormField>
      <StyledFormField style={{ marginTop: globalTheme.space.lg }}>
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
  campaign_name: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED')
  ),
  campaign_reason: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_REQUIRED')
  ),
  product_type: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_REQUIRED')
  ),
});
