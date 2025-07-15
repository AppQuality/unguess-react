import {
  Button,
  FooterItem,
  FormField,
  Input,
  Label,
  MD,
  Message,
  Modal,
  ModalClose,
  Notification,
  Span,
  Textarea,
  useToast,
  XXL,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, Formik, useFormikContext } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { usePostWorkspacesByWidTemplatesMutation } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { styled } from 'styled-components';
import * as yup from 'yup';

const MUTATION_CACHE_KEY = 'shared-save-plan-as-template';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const FormProvider = ({
  title,
  planId,
  children,
}: {
  title: string;
  planId: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const initialValues = {
    templateName: `${title} - Copy`,
    templateDescription: '',
  };
  const { addToast } = useToast();
  const [savePlanAsTemplate, { isLoading }] =
    usePostWorkspacesByWidTemplatesMutation({
      fixedCacheKey: MUTATION_CACHE_KEY,
    });
  const validationSchema = yup.object().shape({
    templateName: yup
      .string()
      .max(64, t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_NAME_MAX'))
      .required(t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_NAME_REQUIRED')),
    templateDescription: yup
      .string()
      .max(200, t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_DESCRIPTION_MAX')),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (!activeWorkspace) return;
        try {
          await savePlanAsTemplate({
            wid: activeWorkspace.id.toString(),
            body: {
              name: values.templateName,
              description: values.templateDescription,
              from_plan: Number(planId),
            },
          });
        } catch (error) {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={
                  error instanceof Error && error.message
                    ? error.message
                    : t('__PLAN_PAGE_SAVE_PLAN_MODAL_ERROR')
                }
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        }
      }}
    >
      {() => children}
    </Formik>
  );
};

const FormModal = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext();
  const [, result] = usePostWorkspacesByWidTemplatesMutation({
    fixedCacheKey: MUTATION_CACHE_KEY,
  });

  return (
    <Modal onClose={onQuit} role="dialog" data-qa="save-plan-modal">
      <Modal.Header>
        {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {JSON.stringify(result)}
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
                  {hasError && (
                    <Message validation="error">{meta.error}</Message>
                  )}
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
                    placeholder={t(
                      'SAVE_AS_TEMPLATE_FORM_DESCRIPTION_PLACEHOLDER'
                    )}
                  />
                  {hasError && (
                    <Message validation="error">{meta.error}</Message>
                  )}
                </FormField>
              );
            }}
          </Field>
        </Wrapper>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic onClick={onQuit}>
            {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CANCEL')}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isAccent isPrimary onClick={() => handleSubmit()}>
            {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CONFIRM')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

const SaveAsTemplateModal = ({
  planId,
  planTitle,
  onQuit,
}: {
  planId: string;
  planTitle: string;
  onQuit: () => void;
}) => (
  <FormProvider planId={planId} title={planTitle}>
    <FormModal onQuit={onQuit} />
  </FormProvider>
);

export { SaveAsTemplateModal };
