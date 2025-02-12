import {
  Checkbox,
  CheckboxCard,
  ContainerCard,
  FormField,
  Hint,
  Input,
  Label,
  MD,
  MediaInput,
  Message,
  Paragraph,
  Row,
  Span,
  Toggle,
  XXL,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as LaptopIconActive } from 'src/assets/icons/device-laptop-active.svg';
import { ReactComponent as LaptopIcon } from 'src/assets/icons/device-laptop.svg';
import { ReactComponent as SmartphoneIconActive } from 'src/assets/icons/device-smartphone-active.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/device-smartphone.svg';
import { ReactComponent as TabletIconActive } from 'src/assets/icons/device-tablet-active.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/device-tablet.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { Notes, NotesTitle } from 'src/pages/ExpressWizard/notesCard';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import * as Yup from 'yup';
import { PrimarySpan, SpacedField, StyledRow } from './where/styled';

export const WhereWebStep = (props: FormikProps<WizardModel>) => {
  const { errors, values, setFieldValue, getFieldProps } = props;

  // Reset App step
  if (values.isIOS) setFieldValue('isIOS', false);
  if (values.isAndroid) setFieldValue('isAndroid', false);

  const { t } = useTranslation();

  useEffect(() => {
    const atLeastOneChecked =
      values.withChrome ||
      values.withFirefox ||
      values.withSafari ||
      values.withEdge;
    setFieldValue('customBrowserFilled', atLeastOneChecked);
  }, [
    setFieldValue,
    values.withChrome,
    values.withEdge,
    values.withFirefox,
    values.withSafari,
  ]);

  // Max two devices allowed
  let selectedDevices = [
    values.withSmartphone,
    values.withTablet,
    values.withDesktop,
  ].filter(Boolean).length;

  useEffect(() => {
    selectedDevices = [
      values.withSmartphone,
      values.withTablet,
      values.withDesktop,
    ].filter(Boolean).length;
  }, [values.withSmartphone, values.withTablet, values.withDesktop]);

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
        <WizardCol xs={12} sm={4}>
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
              {...(!values.withSmartphone &&
                selectedDevices > 1 && { card: { isDisabled: true } })}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12} sm={4}>
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
              {...(!values.withTablet &&
                selectedDevices > 1 && { card: { isDisabled: true } })}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12} sm={4}>
          <FormField style={{ height: '100%' }}>
            <CheckboxCard
              label={t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_DESKTOP')}
              icon={<LaptopIcon />}
              iconActive={<LaptopIconActive />}
              name="withDesktop"
              defaultChecked={values.withDesktop}
              onToggle={(isChecked) => {
                setFieldValue('withDesktop', isChecked);
              }}
              {...(!values.withDesktop &&
                selectedDevices > 1 && { card: { isDisabled: true } })}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12}>
          {(errors.withSmartphone ||
            errors.withTablet ||
            errors.withDesktop) && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.xs }}
            >
              {t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_ERROR')}
            </Message>
          )}
        </WizardCol>
      </StyledRow>

      {/** --- Website Url --- */}
      <StyledRow>
        <WizardCol>
          <FormField>
            <Label>
              {t('__EXPRESS_WIZARD_STEP_WHERE_LINK_LABEL')}
              <Span style={{ color: appTheme.components.text.dangerColor }}>
                *
              </Span>
            </Label>
            <Hint>{t('__EXPRESS_WIZARD_STEP_WHERE_LINK_DESCRIPTION')}</Hint>
            <MediaInput
              start={<LinkIcon />}
              type="url"
              placeholder="https://www.example.com"
              {...getFieldProps('link')}
              {...(errors.link && { validation: 'error' })}
            />

            <Message {...(errors.link && { validation: 'error' })}>
              {errors.link
                ? t('__EXPRESS_WIZARD_STEP_WHERE_LINK_ERROR')
                : t('__EXPRESS_WIZARD_STEP_WHERE_LINK_INFO')}
            </Message>
          </FormField>
        </WizardCol>
      </StyledRow>

      {/** --- Browsers --- */}
      <StyledRow style={{ marginTop: appTheme.space.lg }}>
        {/** LG: 32px */}
        <WizardCol>
          <MD
            style={{
              color: appTheme.palette.grey[800],
              fontWeight: appTheme.fontWeights.medium,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TITLE')}
          </MD>
        </WizardCol>
        <WizardCol size={2} textAlign="end">
          <FormField>
            <Toggle
              {...getFieldProps('customBrowser')}
              checked={values.customBrowser}
            >
              <Label hidden>
                {t('__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TITLE')}
              </Label>
            </Toggle>
          </FormField>
        </WizardCol>
        <WizardCol size={12}>
          <CardDivider style={{ marginTop: appTheme.space.xs }} />
        </WizardCol>
        <WizardCol size={12}>
          <Notes>
            {!values.customBrowser ? (
              <>
                <NotesTitle>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_DEFAULT_BROWSER_TITLE')}
                </NotesTitle>
                <Paragraph>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_DEFAULT_BROWSER_DESCRIPTION')}
                </Paragraph>
              </>
            ) : (
              <>
                <FormField>
                  <Label>
                    {t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_LABEL')}
                    <Span
                      style={{ color: appTheme.components.text.dangerColor }}
                    >
                      *
                    </Span>
                  </Label>
                  <Input
                    type="hidden"
                    {...getFieldProps('customBrowserFilled')}
                  />
                </FormField>
                <SpacedField>
                  <Checkbox
                    {...getFieldProps('withChrome')}
                    checked={values.withChrome}
                  >
                    <Label
                      style={{ color: appTheme.components.text.primaryColor }}
                    >
                      {t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_CHROME')}
                    </Label>
                  </Checkbox>
                </SpacedField>
                <SpacedField>
                  <Checkbox
                    {...getFieldProps('withEdge')}
                    checked={values.withEdge}
                  >
                    <Label
                      style={{ color: appTheme.components.text.primaryColor }}
                    >
                      {t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_EDGE')}
                    </Label>
                  </Checkbox>
                </SpacedField>
                <SpacedField>
                  <Checkbox
                    {...getFieldProps('withSafari')}
                    checked={values.withSafari}
                  >
                    <Label
                      style={{ color: appTheme.components.text.primaryColor }}
                    >
                      {t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_SAFARI')}
                    </Label>
                  </Checkbox>
                </SpacedField>
                <SpacedField>
                  <Checkbox
                    {...getFieldProps('withFirefox')}
                    checked={values.withFirefox}
                  >
                    <Label
                      style={{ color: appTheme.components.text.primaryColor }}
                    >
                      {t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_FIREFOX')}
                    </Label>
                  </Checkbox>
                </SpacedField>
              </>
            )}
          </Notes>
        </WizardCol>
        {values.customBrowser && errors.customBrowserFilled && (
          <WizardCol size={12}>
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.xs }}
            >
              {t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_ERROR')}
            </Message>
          </WizardCol>
        )}
      </StyledRow>
    </ContainerCard>
  );
};

export const WhereStepValidationSchema = Yup.object().shape(
  {
    // Where APP STEP
    isIOS: Yup.bool().when(['isAndroid', 'product_type'], {
      is: (isAndroid: boolean, product_type: string) =>
        !isAndroid && product_type === 'mobileapp',
      then: Yup.bool().oneOf([true], 'Operating system is required'),
    }),
    isAndroid: Yup.bool().when(['isIOS', 'product_type'], {
      is: (isIOS: boolean, product_type: string) =>
        !isIOS && product_type === 'mobileapp',
      then: Yup.bool().oneOf([true], 'Operating system is required'),
    }),
    iOSLink: Yup.string().url().when('isIOS', {
      is: true,
      then: Yup.string().url().required(),
    }),
    androidLink: Yup.string().url().when('isAndroid', {
      is: true,
      then: Yup.string().url().required(),
    }),

    // Where WEB STEP
    link: Yup.string().url().when('product_type', {
      is: 'webapp',
      then: Yup.string().url().required(),
    }),
    withSmartphone: Yup.bool().when(['withTablet', 'withDesktop'], {
      is: (withTablet: boolean, withDesktop: boolean) =>
        !withTablet && !withDesktop,
      then: Yup.bool().oneOf([true], 'Device type is required'),
    }),
    withTablet: Yup.bool().when(['withSmartphone', 'withDesktop'], {
      is: (withSmartphone: boolean, withDesktop: boolean) =>
        !withSmartphone && !withDesktop,
      then: Yup.bool().oneOf([true], 'Device type is required'),
    }),
    withDesktop: Yup.bool().when(['withSmartphone', 'withTablet'], {
      is: (withSmartphone: boolean, withTablet: boolean) =>
        !withSmartphone && !withTablet,
      then: Yup.bool().oneOf([true], 'Device type is required'),
    }),
    customBrowser: Yup.bool(),
    customBrowserFilled: Yup.bool().when('customBrowser', {
      is: true,
      then: Yup.bool().oneOf([true], 'Custom Browser is required'),
    }),
  },
  [
    ['withTablet', 'withDesktop'],
    ['withSmartphone', 'withDesktop'],
    ['withSmartphone', 'withTablet'],
    ['isIOS', 'product_type'],
    ['isAndroid', 'product_type'],
    ['isIOS', 'isAndroid'],
  ]
);
