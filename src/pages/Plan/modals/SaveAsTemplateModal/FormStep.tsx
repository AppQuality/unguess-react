import {
  Button,
  FooterItem,
  FormField,
  Input,
  Label,
  MD,
  Message,
  Span,
  Textarea,
  XXL,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const FormStep = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <div>
        <Trans
          i18nKey="__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_HEADER"
          components={{
            xxl: <XXL isBold style={{ marginBottom: appTheme.space.sm }} />,
            md: <MD />,
          }}
          defaults=""
        />
      </div>
      <Field name="templateName">
        {({ field, meta }: FieldProps) => {
          const hasError = Boolean(meta.touched && meta.error);
          return (
            <FormField>
              <Label>
                {t('SAVE_AS_TEMPLATE_FORM_TITLE')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Input
                {...field}
                placeholder={t('SAVE_AS_TEMPLATE_FORM_TITLE_PLACEHOLDER')}
              />
              {hasError && <Message validation="error">{meta.error}</Message>}
            </FormField>
          );
        }}
      </Field>
      <Field name="templateDescription">
        {({ field, meta }: FieldProps) => {
          const hasError = Boolean(meta.touched && meta.error);
          return (
            <FormField>
              <Label>
                <Trans
                  i18nKey="SAVE_AS_TEMPLATE_FORM_DESCRIPTION"
                  components={{
                    sub: (
                      <MD
                        as="span"
                        style={{ color: appTheme.palette.grey[600] }}
                      />
                    ),
                  }}
                  defaults=""
                />
              </Label>
              <Textarea
                {...field}
                placeholder={t('SAVE_AS_TEMPLATE_FORM_DESCRIPTION_PLACEHOLDER')}
              />
              {hasError && <Message validation="error">{meta.error}</Message>}
            </FormField>
          );
        }}
      </Field>
    </Wrapper>
  );
};

const FormStepFooter = ({ onQuit }: { onQuit: () => void }) => {
  const { isSubmitting, handleSubmit } = useFormikContext();
  const { t } = useTranslation();
  return (
    <>
      <FooterItem>
        <Button isBasic onClick={onQuit}>
          {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CANCEL')}
        </Button>
      </FooterItem>
      <FooterItem>
        <Button
          isAccent
          isPrimary
          disabled={isSubmitting}
          onClick={() => handleSubmit()}
        >
          {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CONFIRM')}
        </Button>
      </FooterItem>
    </>
  );
};

FormStep.Footer = FormStepFooter;

export { FormStep };
