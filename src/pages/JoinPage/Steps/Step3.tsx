import {
  Button,
  FormField,
  Input,
  Label,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { JoinFormValues } from '../valuesType';
import { ButtonContainer } from './ButtonContainer';

export const Step3 = () => {
  const { setFieldValue, values, status } = useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  const sendGTMevent = useSendGTMevent();
  useEffect(() => {
    sendGTMevent({
      event: 'sign-up-flow',
      category: `is invited: ${status?.isInvited}`,
      content: 'step 3 rendered',
    });
  }, []);
  const goToPreviousStep = () => {
    setFieldValue('step', 2);
  };
  return (
    <>
      <Field name="workspace">
        {({ field, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <FormField>
              <Label>
                {t('SIGNUP_FORM_WORKSPACE_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Input
                type="text"
                disabled={status?.isInvited && values.workspace !== ''}
                {...field}
                placeholder={t('SIGNUP_FORM_WORKSPACE_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />
              {hasError && (
                <Message data-qa="signup-workspace-error" validation="error">
                  {meta.error}
                </Message>
              )}
            </FormField>
          );
        }}
      </Field>
      <ButtonContainer>
        <Button onClick={goToPreviousStep} isBasic>
          {t('SIGNUP_FORM_RETURN_TO_STEP_2')}
        </Button>
        <Button type="submit" isPrimary isAccent>
          {t('SIGNUP_FORM_SUBMIT')}
        </Button>
      </ButtonContainer>
    </>
  );
};
