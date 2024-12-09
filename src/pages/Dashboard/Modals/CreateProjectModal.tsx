import {
  Button,
  MD,
  Modal,
  ModalClose,
  Paragraph,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
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
  const onClose = () => {
    setOpen(false);
  };
  const formInitialValues = {
    name: '',
    description: '',
  };
  return (
    <Formik
      initialValues={formInitialValues}
      validateOnChange
      validateOnBlur
      validationSchema={validationProjectSchema}
      onSubmit={() => console.log('suchino')}
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
              onClick={() => console.log('suchino')}
            >
              {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_CREATE_BUTTON')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};
