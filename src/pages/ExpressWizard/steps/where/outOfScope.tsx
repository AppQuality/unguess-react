import { StyledRow } from './styled';
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
  theme,
} from '@appquality/unguess-design-system';
import { CardDivider } from '../../cardDivider';
import { Notes } from '../../notesCard';
import { WizardModel } from '../../wizardModel';
import { FormikProps } from 'formik';

export const OutOfScopeSection = ({
  errors,
  touched,
  validateField,
  validateForm,
  handleChange,
  values,
  setFieldValue,
  ...props
}: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledRow style={{ marginTop: theme.space.lg }}>
        <Col>
          <XL isBold style={{ color: theme.palette.grey[800] }}>
            {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE')}
          </XL>
          <MD>{t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_DESCRIPTION')}</MD>
        </Col>
      </StyledRow>
      <StyledRow style={{ marginTop: theme.space.sm }}>
        <Col>
          <MD
            style={{
              color: theme.palette.grey[800],
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TOGGLE_LABEL')}
          </MD>
        </Col>
        <Col size={2} textAlign={'end'}>
          <Field>
            <Toggle
              {...props.getFieldProps('hasOutOfScope')}
              checked={values.hasOutOfScope}
            >
              <Label hidden>
                {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE')}
              </Label>
            </Toggle>
          </Field>
        </Col>
        <Col size={12}>
          <CardDivider style={{ marginTop: theme.space.xs }} />
        </Col>
        {values.hasOutOfScope && (
          <>
            <Col size={12}>
              <Notes>
                <Field>
                  <Label>
                    {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_LABEL')}
                    <Span style={{ color: theme.colors.dangerHue }}>*</Span>
                  </Label>
                  <Textarea
                    rows={5}
                    placeholder={t(
                      '__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_PLACEHOLDER'
                    )}
                    isResizable
                    {...props.getFieldProps('outOfScope')}
                  />
                </Field>
              </Notes>
            </Col>
          </>
        )}
        {values.hasOutOfScope && errors.outOfScope && (
          <Col size={12}>
            <Message validation="error" style={{ marginTop: theme.space.xs }}>
              {t('__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_ERROR')}
            </Message>
          </Col>
        )}
      </StyledRow>
    </>
  );
};
