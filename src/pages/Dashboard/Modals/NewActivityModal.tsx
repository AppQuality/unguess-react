import {
  Modal,
  ModalClose,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { Formik, useFormikContext } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePostProjectsByPidHubsMutation } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import * as Yup from 'yup';
import { ChooseStep } from './steps/ChooseStep';
import { FormStep, FormValues } from './steps/FormStep';
import { UploadStep } from './steps/UploadStep';

type Step = 1 | 2 | 3;

// Connects UploadStep (props-based) to Formik context
const UploadStepConnected = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  return (
    <UploadStep
      language={values.language}
      onLanguageChange={(lang) => {
        setFieldValue('language', lang).catch(() => undefined);
      }}
    />
  );
};

export const NewActivityModal = ({
  onClose,
  projectId,
}: {
  onClose: () => void;
  projectId?: number;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const hubsBaseRoute = useLocalizeRoute('hubs');
  const templatesRoute = useLocalizeRoute('templates');
  const [createHub, { isLoading }] = usePostProjectsByPidHubsMutation();

  const [step, setStep] = useState<Step>(1);
  const [createdHubId, setCreatedHubId] = useState<number | undefined>();

  const validationSchema = Yup.object({
    projectId: Yup.number()
      .required(t('__NEW_ACTIVITY_MODAL_SELECT_PROJECT_ERROR'))
      .typeError(t('__NEW_ACTIVITY_MODAL_SELECT_PROJECT_ERROR')),
    name: Yup.string()
      .required(t('__NEW_ACTIVITY_MODAL_NAME_REQUIRED'))
      .max(64, t('__NEW_ACTIVITY_MODAL_NAME_MAX')),
    description: Yup.string().max(
      234,
      t('__NEW_ACTIVITY_MODAL_DESCRIPTION_MAX')
    ),
  });

  const handleSubmit = async (values: FormValues) => {
    if (!values.projectId) return;
    try {
      const result = await createHub({
        pid: values.projectId.toString(),
        body: {
          name: values.name,
          ...(values.description && { description: values.description }),
        },
      }).unwrap();
      setCreatedHubId(result.hubId);
      setStep(3);
    } catch {
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
    }
  };

  const handleGoToHub = () => {
    onClose();
    if (createdHubId) navigate(`${hubsBaseRoute}${createdHubId}/videos`);
  };

  const handleLaunchTest = () => {
    onClose();
    navigate(templatesRoute, { state: { projectId } });
  };

  const modalTitle =
    step === 1
      ? t('__NEW_ACTIVITY_MODAL_TITLE')
      : t('__NEW_ACTIVITY_MODAL_FORM_TITLE');

  return (
    <Formik<FormValues>
      initialValues={{ projectId, name: '', description: '', language: '' }}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      onSubmit={handleSubmit}
    >
      <Modal onClose={onClose} isLarge role="dialog">
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <ChooseStep
              onImportMedia={() => setStep(2)}
              onLaunchTest={handleLaunchTest}
            />
          )}
          {step === 2 && <FormStep />}
          {step === 3 && <UploadStepConnected />}
        </Modal.Body>
        <Modal.Footer>
          {step === 2 && (
            <FormStep.Footer onBack={() => setStep(1)} isLoading={isLoading} />
          )}
          {step === 3 && (
            <UploadStep.Footer
              onBack={() => setStep(2)}
              onUpload={handleGoToHub}
            />
          )}
        </Modal.Footer>
        <ModalClose />
      </Modal>
    </Formik>
  );
};
