import {
  Button,
  MD,
  Modal,
  ModalClose,
  Notification,
  Paragraph,
  useToast,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { usePostProjectsMutation } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useNavigate } from 'react-router-dom';
import { ProjectFormProps, validationProjectSchema } from './ProjectFormModel';
import { CreateProjectForm } from './CreateProjectForm';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

export const CreateProjectModal = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const onClose = () => {
    setOpen(false);
  };
  const formInitialValues = {
    name: '',
    description: '',
  };
  const [createProject] = usePostProjectsMutation();
  const handleSubmit = async (
    values: ProjectFormProps,
    formikProps: FormikHelpers<ProjectFormProps>
  ) => {
    await createProject({
      body: {
        name: values.name,
        customer_id: activeWorkspace?.id ?? -1,
        description: values.description,
      },
    })
      .unwrap()
      .then((newProject) => {
        setOpen(false);
        navigate(`/projects/${newProject.id}`);
      })
      .catch((err) => {
        if (err.status === 500) {
          formikProps.setFieldError(
            'name',
            t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_UNIQUE_ERROR')
          );
        } else {
          setOpen(false);
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__TOAST_GENERIC_ERROR_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
          // eslint-disable-next-line no-console
          console.error(err);
        }
      });
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validateOnChange
      validateOnBlur
      validationSchema={validationProjectSchema}
      onSubmit={handleSubmit}
    >
      {(formProps: FormikProps<ProjectFormProps>) => (
        <Modal onClose={onClose}>
          <Modal.Header>
            <TitleWrapper>
              <Paragraph>{t('__DASHBOARD_CREATE_NEW_PROJECT_TITLE')}</Paragraph>
              <ModalClose onClick={onClose} />
            </TitleWrapper>
          </Modal.Header>
          <Modal.Body>
            <MD>
              {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_INSTRUCTIONS_FIRST_P')}
            </MD>
            <Paragraph style={{ marginBottom: appTheme.space.md }}>
              {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_INSTRUCTIONS_SECOND_P')}
            </Paragraph>
            <CreateProjectForm formikProps={formProps} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ paddingRight: 20 }}
              id="custom-status-close-drawer-quit"
              isDanger
              isLink
              onClick={onClose}
            >
              {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_CANCEL_BUTTON')}
            </Button>
            <Button
              id="custom-status-close-drawer-continue"
              isPrimary
              isAccent
              onClick={formProps.submitForm}
            >
              {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_CREATE_BUTTON')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};
