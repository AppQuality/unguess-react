import { useTranslation } from 'react-i18next';
import { Field } from '@zendeskgarden/react-forms';
import {
  XL,
  MD,
  Toggle,
  Textarea,
  Span,
  Message,
  Label,
} from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import { FormikProps } from 'formik';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { Notes } from 'src/pages/ExpressWizard/notesCard';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { StyledRow } from './styled';

export const OutOfScopeSection = ({
  errors,
  values,
  getFieldProps,
}: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledRow style={{ marginTop: globalTheme.space.lg }}>
        <WizardCol>
          <XL isBold style={{ color: globalTheme.palette.grey[800] }}>
            {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE')}
          </XL>
          <MD>{t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_DESCRIPTION')}</MD>
        </WizardCol>
      </StyledRow>
      <StyledRow style={{ marginTop: globalTheme.space.sm }}>
        <WizardCol>
          <MD
            style={{
              color: globalTheme.palette.grey[800],
              fontWeight: globalTheme.fontWeights.medium,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TOGGLE_LABEL')}
          </MD>
        </WizardCol>
        <WizardCol size={2} textAlign="end">
          <Field>
            <Toggle
              {...getFieldProps('hasOutOfScope')}
              checked={values.hasOutOfScope}
            >
              <Label hidden>
                {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE')}
              </Label>
            </Toggle>
          </Field>
        </WizardCol>
        <WizardCol size={12}>
          <CardDivider style={{ marginTop: globalTheme.space.xs }} />
        </WizardCol>
        {values.hasOutOfScope && (
          <WizardCol size={12}>
            <Notes>
              <Field>
                <Label>
                  {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_LABEL')}
                  <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
                </Label>
                <Textarea
                  rows={5}
                  placeholder={t(
                    '__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_PLACEHOLDER'
                  )}
                  isResizable
                  {...getFieldProps('outOfScope')}
                />
              </Field>
            </Notes>
          </WizardCol>
        )}
        {values.hasOutOfScope && errors.outOfScope && (
          <WizardCol size={12}>
            <Message
              validation="error"
              style={{ marginTop: globalTheme.space.xs }}
            >
              {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_ERROR')}
            </Message>
          </WizardCol>
        )}
      </StyledRow>
    </>
  );
};
