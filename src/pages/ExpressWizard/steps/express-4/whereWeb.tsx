import {
  ContainerCard,
  FormField,
  Hint,
  Label,
  MD,
  MediaInput,
  Message,
  RadioCard,
  Row,
  Span,
  XXL,
  theme,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
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
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { PrimarySpan, StyledRow } from './where/styled';

export const WhereWebStep = (props: FormikProps<WizardModel>) => {
  const { errors, values, setFieldValue, getFieldProps } = props;

  // Reset App step
  if (values.isIOS) setFieldValue('isIOS', false);
  if (values.isAndroid) setFieldValue('isAndroid', false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!values.withSmartphone && !values.withTablet && !values.withDesktop) {
      setFieldValue('withSmartphone', true);
    }
  }, []);

  const handleRadioClick = (value: string) => {
    setFieldValue('withSmartphone', value === 'smartphone');
    setFieldValue('withTablet', value === 'tablet');
    setFieldValue('withDesktop', value === 'desktop');
  };

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
            <Trans i18nKey="__EXPRESS_4_WIZARD_STEP_WHERE_SUBTITLE">
              Choose a <Span isBold>device</Span> you want to test on
            </Trans>
            <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
          </MD>
        </WizardCol>
      </Row>

      <CardDivider />

      {/** --- Device Type Checkboxes --- */}
      <StyledRow>
        <WizardCol xs={12} sm={4}>
          <FormField style={{ height: '100%' }}>
            <RadioCard
              label={t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_SMARTPHONE')}
              icon={<SmartphoneIcon />}
              iconActive={<SmartphoneIconActive />}
              value="smartphone"
              checked={values.withSmartphone}
              onChecked={handleRadioClick}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12} sm={4}>
          <FormField style={{ height: '100%' }}>
            <RadioCard
              label={t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_TABLET')}
              icon={<TabletIcon />}
              iconActive={<TabletIconActive />}
              value="tablet"
              checked={values.withTablet}
              onChecked={handleRadioClick}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12} sm={4}>
          <FormField style={{ height: '100%' }}>
            <RadioCard
              label={t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_DESKTOP')}
              icon={<LaptopIcon />}
              iconActive={<LaptopIconActive />}
              value="desktop"
              checked={values.withDesktop}
              onChecked={handleRadioClick}
            />
          </FormField>
        </WizardCol>
        <WizardCol xs={12}>
          {(errors.withSmartphone ||
            errors.withTablet ||
            errors.withDesktop) && (
            <Message validation="error" style={{ marginTop: theme.space.xs }}>
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
