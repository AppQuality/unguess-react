import {
  CheckboxCard,
  ContainerCard,
  Fieldset,
  FormField,
  Hint,
  Label,
  MD,
  MediaInput,
  Message,
  Radio,
  Row,
  Span,
  XL,
  XXL,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as SmartphoneIconActive } from 'src/assets/icons/device-smartphone-active.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/device-smartphone.svg';
import { ReactComponent as TabletIconActive } from 'src/assets/icons/device-tablet-active.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/device-tablet.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  margin-top: ${({ theme }) => theme.space.md};
`;

const PrimarySpan = styled(Span)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
`;

const InnerField = styled(FormField)`
  margin-top: ${({ theme }) => theme.space.sm};
  margin-left: ${({ theme }) => theme.space.base * 6}px;
`;

export const WhereAppStep = (props: FormikProps<WizardModel>) => {
  const { errors, values, setFieldValue, handleChange, getFieldProps } = props;
  let initialRadioValue = 'none';
  if (values.isIOS) {
    initialRadioValue = 'ios';
  } else if (values.isAndroid) {
    initialRadioValue = 'android';
  }

  const [radioValue, setRadioValue] = useState(initialRadioValue);

  // Reset web step
  if (values.customBrowser) setFieldValue('customBrowser', false);
  if (values.withDesktop) setFieldValue('withDesktop', false);

  useEffect(() => {
    if (radioValue === 'ios') {
      setFieldValue('isIOS', true);
      setFieldValue('isAndroid', false);
    } else if (radioValue === 'android') {
      setFieldValue('isIOS', false);
      setFieldValue('isAndroid', true);
    }
  }, [radioValue, setFieldValue]);

  const { t } = useTranslation();

  return (
    <ContainerCard>
      <Row>
        <WizardCol>
          <XXL>
            <Trans i18nKey="__EXPRESS_WIZARD_STEP_WHERE_TITLE">
              <PrimarySpan isBold>Where</PrimarySpan>
              do we test?
            </Trans>
          </XXL>
          <MD>
            <Trans i18nKey="__EXPRESS_WIZARD_STEP_WHERE_SUBTITLE">
              Choose what kind of <Span isBold>devices</Span> do you want to
              test on
            </Trans>
            <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
          </MD>
        </WizardCol>
      </Row>

      <CardDivider />

      {/** --- Device Type Checkboxes --- */}
      <StyledRow>
        <WizardCol xs={12} style={{ marginBottom: appTheme.space.md }}>
          <XL isBold>{t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_LABEL')}</XL>
        </WizardCol>
        <WizardCol xs={12} sm={6}>
          <FormField style={{ height: '100%' }}>
            <CheckboxCard
              label={t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_SMARTPHONE')}
              icon={<SmartphoneIcon />}
              iconActive={<SmartphoneIconActive />}
              name="withSmartphone"
              defaultChecked={values.withSmartphone}
              onToggle={(isChecked) => {
                setFieldValue('withSmartphone', isChecked);
              }}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12} sm={6}>
          <FormField style={{ height: '100%' }}>
            <CheckboxCard
              label={t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_TABLET')}
              icon={<TabletIcon />}
              iconActive={<TabletIconActive />}
              name="withTablet"
              defaultChecked={values.withTablet}
              onToggle={(isChecked) => {
                setFieldValue('withTablet', isChecked);
              }}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12}>
          {(errors.withSmartphone || errors.withTablet) && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.xs }}
            >
              {t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_ERROR')}
            </Message>
          )}
        </WizardCol>
      </StyledRow>

      {/** --- Operating System --- */}
      <StyledRow style={{ marginTop: appTheme.space.lg }}>
        <WizardCol>
          <XL isBold>{t('__EXPRESS_WIZARD_STEP_APP_WHERE_OS_TITLE')}</XL>
        </WizardCol>
      </StyledRow>
      <StyledRow>
        <WizardCol>
          <Fieldset>
            <Fieldset.Legend>
              {t('__EXPRESS_WIZARD_STEP_APP_WHERE_OS_LABEL')}
            </Fieldset.Legend>
            <FormField>
              <Radio
                name="device-platform"
                value="ios"
                checked={radioValue === 'ios'}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                  setFieldValue('isIOS', e.target.value === 'ios');
                  handleChange(e);
                }}
              >
                <Label isRegular>
                  {t('__EXPRESS_WIZARD_STEP_APP_WHERE_OS_IOS_LABEL')}
                </Label>
              </Radio>
            </FormField>
            {/** iOS Link */}
            {values.isIOS && (
              <InnerField>
                <Label>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_LABEL')}
                  <Span style={{ color: appTheme.components.text.dangerColor }}>
                    *
                  </Span>
                </Label>
                <Hint>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_DESCRIPTION')}
                </Hint>
                <MediaInput
                  start={<LinkIcon />}
                  type="url"
                  placeholder="https://www.example.com"
                  {...getFieldProps('iOSLink')}
                  {...(errors.iOSLink && { validation: 'error' })}
                />

                <Message {...(errors.iOSLink && { validation: 'error' })}>
                  {errors.iOSLink
                    ? t('__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_ERROR')
                    : t('__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_INFO')}
                </Message>
              </InnerField>
            )}
            <FormField style={{ marginTop: `${appTheme.space.base * 4}px` }}>
              <Radio
                name="device-platform"
                value="android"
                checked={radioValue === 'android'}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                  setFieldValue('isAndroid', e.target.value === 'android');
                  handleChange(e);
                }}
              >
                <Label isRegular>
                  {t('__EXPRESS_WIZARD_STEP_APP_WHERE_OS_ANDROID_LABEL')}
                </Label>
              </Radio>
            </FormField>
            {/** iOS Link */}
            {values.isAndroid && (
              <InnerField>
                <Label>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_LABEL')}
                  <Span style={{ color: appTheme.components.text.dangerColor }}>
                    *
                  </Span>
                </Label>
                <Hint>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_DESCRIPTION')}
                </Hint>
                <MediaInput
                  start={<LinkIcon />}
                  type="url"
                  placeholder="https://www.example.com"
                  {...getFieldProps('androidLink')}
                  {...(errors.androidLink && { validation: 'error' })}
                />

                <Message {...(errors.androidLink && { validation: 'error' })}>
                  {errors.androidLink
                    ? t('__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_ERROR')
                    : t('__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_INFO')}
                </Message>
              </InnerField>
            )}
          </Fieldset>
        </WizardCol>
        <WizardCol xs={12}>
          {(errors.isIOS || errors.isAndroid) && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.sm }}
            >
              {t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_OPERATING_SYSTEM_ERROR')}
            </Message>
          )}
        </WizardCol>
      </StyledRow>
    </ContainerCard>
  );
};
