import {
  Button,
  Dots,
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
import { Field, FieldProps, Formik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useDeletePlansByPidMutation } from 'src/features/api';
import { styled } from 'styled-components';
import * as yup from 'yup';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const FormProvider = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const initialValues = {
    templateName: `${title} - Copy`,
    templateDescription: '',
  };
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
      onSubmit={() => {}}
    >
      {() => children}
    </Formik>
  );
};

const Form = () => {
  const { t } = useTranslation();
  return (
    <>
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
    </>
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
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [deletePlan, { isLoading }] = useDeletePlansByPidMutation();

  const showDeleteErrorToast = (error: Error) => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={
            error instanceof Error && error.message
              ? error.message
              : t('__PLAN_PAGE_DELETE_PLAN_MODAL_ERROR')
          }
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
  };

  const handleConfirm = async () => {
    try {
      await deletePlan({ pid: planId });
      navigate(`/`);
    } catch (e) {
      showDeleteErrorToast(e as unknown as Error);
    }
    onQuit();
  };

  return (
    <Modal onClose={onQuit} role="dialog" data-qa="delete-plan-modal">
      <Modal.Header>
        {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
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
          <FormProvider title={planTitle}>
            <Form />
          </FormProvider>
        </Wrapper>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic disabled={isLoading} onClick={onQuit}>
            {isLoading ? (
              <Dots />
            ) : (
              t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CANCEL')
            )}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button
            isAccent
            isPrimary
            disabled={isLoading}
            onClick={handleConfirm}
          >
            {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CONFIRM')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { SaveAsTemplateModal };
