import {
  Modal,
  ModalClose,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useModule } from 'src/features/modules/useModule';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import * as yup from 'yup';
import { usePlanContext } from '../../context/planContext';
import { FormStep } from './FormStep';
import { SuccessStep } from './SuccessStep';
import { useSaveTemplate } from './useSaveTemplate';

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
    templateName: `Copy of ${title}`,
    templateDescription: '',
  };
  const { addToast } = useToast();
  const { save: savePlanAsTemplate } = useSaveTemplate();
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
      onSubmit={async (values, { setSubmitting }) => {
        if (!activeWorkspace) return;
        setSubmitting(true);
        try {
          await savePlanAsTemplate({
            wid: activeWorkspace.id.toString(),
            body: {
              name: values.templateName,
              description: values.templateDescription,
              from_plan: Number(planId),
            },
          }).unwrap();
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
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {() => children}
    </Formik>
  );
};

const FormModal = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { isSubmitSuccessful } = useSaveTemplate();

  return (
    <Modal onClose={onQuit} role="dialog" data-qa="save-plan-modal">
      <Modal.Header>
        {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {!isSubmitSuccessful && <FormStep />}
        {isSubmitSuccessful && <SuccessStep />}
      </Modal.Body>
      <Modal.Footer>
        {!isSubmitSuccessful && <FormStep.Footer onQuit={onQuit} />}
        {isSubmitSuccessful && <SuccessStep.Footer onQuit={onQuit} />}
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

const SaveAsTemplateModal = ({ planId }: { planId: string }) => {
  const { reset } = useSaveTemplate();
  const { value: planTitle } = useModule('title');
  const { setIsSaveTemplateModalOpen } = usePlanContext();

  return (
    <FormProvider planId={planId} title={planTitle?.output ?? ''}>
      <FormModal
        onQuit={() => {
          setIsSaveTemplateModalOpen(false);
          reset();
        }}
      />
    </FormProvider>
  );
};

export { SaveAsTemplateModal };
