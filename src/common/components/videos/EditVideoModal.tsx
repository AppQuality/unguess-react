import {
  Button,
  Datepicker,
  FormField,
  Input,
  Label,
  Message,
  Modal,
  ModalClose,
  Select,
  Span,
  Textarea,
} from '@appquality/unguess-design-system';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { Video as ApiVideo } from 'src/features/api';
import { styled } from 'styled-components';
import * as Yup from 'yup';

export type EditVideoFormValues = {
  title: string;
  participantName: string;
  additionalInformation: string;
  device: 'smartphone' | 'tablet' | 'desktop' | 'other' | '';
  testDate?: Date;
};

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const RequiredAsterisk = styled(Span)`
  color: ${({ theme }) => theme.palette.red[600]};
`;

const InputWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
`;

const dateToInputValue = (value?: Date) => {
  if (!value) return '';
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

type EditVideoModalProps = {
  isOpen: boolean;
  video: ApiVideo | null;
  onClose: () => void;
};

export const EditVideoModal = ({
  isOpen,
  video,
  onClose,
}: EditVideoModalProps) => {
  const { t } = useTranslation();

  if (!isOpen || !video) return null;

  const initialValues: EditVideoFormValues = {
    title: '',
    participantName: `${video.tester.name} ${video.tester.surname}`.trim(),
    additionalInformation: '',
    device: video.tester.device.type,
    testDate: undefined,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(
      t('__VIDEOS_EDIT_MODAL_TITLE_REQUIRED', 'Title is required')
    ),
    participantName: Yup.string().required(
      t(
        '__VIDEOS_EDIT_MODAL_PARTICIPANT_NAME_REQUIRED',
        'Participant name is required'
      )
    ),
    device: Yup.string().required(
      t('__VIDEOS_EDIT_MODAL_DEVICE_REQUIRED', 'Device is required')
    ),
  });

  const handleSubmit = async (
    values: EditVideoFormValues,
    helpers: FormikHelpers<EditVideoFormValues>
  ) => {
    // TODO: wire this submit to the PATCH endpoint as soon as backend exposes it.
    // TODO: align payload keys with API contract (title, participantName,
    // additionalInformation, device, testDate).
    // TODO: once API is integrated, update local query cache to reflect edited values.
    void values;

    helpers.setSubmitting(false);
    onClose();
  };

  return (
    <Formik<EditVideoFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formProps: FormikProps<EditVideoFormValues>) => (
        <Modal onClose={onClose}>
          <Modal.Header>
            {t('__VIDEOS_EDIT_MODAL_TITLE', 'Edit video details')}
          </Modal.Header>
          <Modal.Body>
            <Form id="edit-video-form">
              <FormBody>
                <FormField>
                  <Label>
                    {t('__VIDEOS_EDIT_MODAL_FIELD_TITLE', 'Title')}{' '}
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <InputWrapper>
                    <Input
                      {...formProps.getFieldProps('title')}
                      validation={
                        formProps.touched.title && formProps.errors.title
                          ? 'error'
                          : undefined
                      }
                    />
                    {formProps.touched.title && formProps.errors.title && (
                      <Message validation="error">
                        {formProps.errors.title}
                      </Message>
                    )}
                  </InputWrapper>
                </FormField>

                <FormField>
                  <Label>
                    {t(
                      '__VIDEOS_EDIT_MODAL_FIELD_PARTICIPANT_NAME',
                      'Participant name'
                    )}{' '}
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <InputWrapper>
                    <Input
                      {...formProps.getFieldProps('participantName')}
                      validation={
                        formProps.touched.participantName &&
                        formProps.errors.participantName
                          ? 'error'
                          : undefined
                      }
                    />
                    {formProps.touched.participantName &&
                      formProps.errors.participantName && (
                        <Message validation="error">
                          {formProps.errors.participantName}
                        </Message>
                      )}
                  </InputWrapper>
                </FormField>

                <FormField>
                  <Label>
                    {t(
                      '__VIDEOS_EDIT_MODAL_FIELD_ADDITIONAL_INFORMATION',
                      'Additional information'
                    )}
                  </Label>
                  <InputWrapper>
                    <Textarea
                      rows={4}
                      isResizable
                      {...formProps.getFieldProps('additionalInformation')}
                    />
                  </InputWrapper>
                </FormField>

                <FormField>
                  <Label>
                    {t('__VIDEOS_EDIT_MODAL_FIELD_DEVICE', 'Device')}{' '}
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <InputWrapper>
                    <Select
                      fullWidthOption
                      listboxAppendToNode={document.body}
                      onSelect={(value) => {
                        formProps
                          .setFieldValue('device', value)
                          .catch(() => undefined);
                      }}
                      selectionValue={formProps.values.device}
                      inputValue={formProps.values.device}
                    >
                      <Select.Option value="smartphone" label="smartphone" />
                      <Select.Option value="tablet" label="tablet" />
                      <Select.Option value="desktop" label="desktop" />
                      <Select.Option value="other" label="other" />
                    </Select>
                    {formProps.touched.device && formProps.errors.device && (
                      <Message validation="error">
                        {formProps.errors.device}
                      </Message>
                    )}
                  </InputWrapper>
                </FormField>

                <FormField>
                  <Label>
                    {t('__VIDEOS_EDIT_MODAL_FIELD_TEST_DATE', 'Test date')}
                  </Label>
                  <InputWrapper>
                    <Datepicker
                      value={formProps.values.testDate}
                      onChange={(date) => {
                        formProps
                          .setFieldValue('testDate', date)
                          .catch(() => undefined);
                      }}
                      formatDate={(date) => dateToInputValue(date)}
                    >
                      <Input
                        value={dateToInputValue(formProps.values.testDate)}
                      />
                    </Datepicker>
                  </InputWrapper>
                </FormField>
              </FormBody>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button isBasic onClick={onClose}>
              {t('__VIDEOS_EDIT_MODAL_CANCEL', 'Cancel')}
            </Button>
            <Button
              isPrimary
              isAccent
              type="submit"
              form="edit-video-form"
              disabled={formProps.isSubmitting || !formProps.isValid}
            >
              {t('__VIDEOS_EDIT_MODAL_SAVE', 'Save')}
            </Button>
          </Modal.Footer>
          <ModalClose />
        </Modal>
      )}
    </Formik>
  );
};
