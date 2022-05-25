import { useTranslation } from 'react-i18next';
import { Field } from '@zendeskgarden/react-forms';
import {
  Col,
  XL,
  MD,
  Toggle,
  Textarea,
  Span,
  Message,
  Label,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { StyledRow } from './styled';
import { CardDivider } from '../../cardDivider';
import { Notes } from '../../notesCard';
import { WizardModel } from '../../wizardModel';

export const OutOfScopeSection = ({
  errors,
  values,
  getFieldProps
}: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledRow style={{ marginTop: globalTheme.space.lg }}>
        <Col>
          <XL isBold style={{ color: globalTheme.palette.grey[800] }}>
            {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE')}
          </XL>
          <MD>{t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_DESCRIPTION')}</MD>
        </Col>
      </StyledRow>
      <StyledRow style={{ marginTop: globalTheme.space.sm }}>
        <Col>
          <MD
            style={{
              color: globalTheme.palette.grey[800],
              fontWeight: globalTheme.fontWeights.semibold,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TOGGLE_LABEL')}
          </MD>
        </Col>
        <Col size={2} textAlign="end">
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
        </Col>
        <Col size={12}>
          <CardDivider style={{ marginTop: globalTheme.space.xs }} />
        </Col>
        {values.hasOutOfScope && (
          <Col size={12}>
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
            </Col>
        )}
        {values.hasOutOfScope && errors.outOfScope && (
          <Col size={12}>
            <Message validation="error" style={{ marginTop: globalTheme.space.xs }}>
              {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_ERROR')}
            </Message>
          </Col>
        )}
      </StyledRow>
    </>
  );
};
