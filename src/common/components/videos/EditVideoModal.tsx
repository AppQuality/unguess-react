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
import { formatDateForApiInput, parseApiDate } from 'src/common/date/apiDate';
import {
  PatchHubsByHidAssetsAndMidApiArg,
  Video as ApiVideo,
  useGetVideosByVidQuery,
  usePatchHubsByHidAssetsAndMidMutation,
} from 'src/features/api';
import { styled } from 'styled-components';
import * as Yup from 'yup';

type ApiDeviceType = NonNullable<NonNullable<ApiVideo['device']>['formFactor']>;

const DEVICE_LABEL_BY_TYPE: Record<ApiDeviceType, string> = {
  smartphone: 'smartphone',
  tablet: 'tablet',
  desktop: 'desktop',
  other: 'other',
  unknown: 'unknown',
};

export type EditVideoFormValues = {
  title: string;
  participantName: string;
  additionalInformation: string;
  device: ApiDeviceType;
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
  return formatDateForApiInput(value);
};

type EditVideoModalProps = {
  isOpen: boolean;
  video: ApiVideo | null;
  hubId?: string;
  onClose: () => void;
};

export const EditVideoModal = ({
  isOpen,
  video,
  hubId,
  onClose,
}: EditVideoModalProps) => {
  const { t } = useTranslation();
  const [patchAsset] = usePatchHubsByHidAssetsAndMidMutation();
  const {
    data: detailedVideo,
    isLoading: isLoadingDetailedVideo,
    isFetching: isFetchingDetailedVideo,
  } = useGetVideosByVidQuery(
    {
      vid: String(video?.id ?? ''),
    },
    {
      skip: !isOpen || !video,
    }
  );

  if (!isOpen || !video) return null;

  const isDetailsLoading =
    isLoadingDetailedVideo || isFetchingDetailedVideo || !detailedVideo;

  const initialValues: EditVideoFormValues = {
    title: detailedVideo?.filename ?? '',
    participantName: `${detailedVideo?.tester?.name ?? ''}`.trim(),
    additionalInformation: detailedVideo?.additionalInfo ?? '',
    device: detailedVideo?.device?.formFactor ?? 'other',
    testDate: parseApiDate(detailedVideo?.uploadDate),
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
    testDate: Yup.date().required(
      t('__VIDEOS_EDIT_MODAL_TEST_DATE_REQUIRED', 'Test date is required')
    ),
  });

  const handleSubmit = async (
    values: EditVideoFormValues,
    helpers: FormikHelpers<EditVideoFormValues>
  ) => {
    if (!hubId) {
      helpers.setStatus(
        t('__VIDEOS_EDIT_MODAL_SAVE_ERROR', 'Unable to save video details')
      );
      helpers.setSubmitting(false);
      return;
    }

    try {
      const body: PatchHubsByHidAssetsAndMidApiArg['body'] = {
        participantName: values.participantName,
        device: values.device,
        additional: values.additionalInformation,
        fileName: values.title,
        uploadDate: formatDateForApiInput(values.testDate),
      };

      await patchAsset({ hid: hubId, mid: video.id, body }).unwrap();
      onClose();
    } catch {
      helpers.setStatus(
        t('__VIDEOS_EDIT_MODAL_SAVE_ERROR', 'Unable to save video details')
      );
    } finally {
      helpers.setSubmitting(false);
    }
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
                      disabled={isDetailsLoading}
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
                      disabled={isDetailsLoading}
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
                      disabled={isDetailsLoading}
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
                      isDisabled={isDetailsLoading}
                      fullWidthOption
                      listboxAppendToNode={document.body}
                      onSelect={(value) => {
                        formProps
                          .setFieldValue(
                            'device',
                            value as EditVideoFormValues['device']
                          )
                          .catch(() => undefined);
                      }}
                      selectionValue={formProps.values.device}
                      inputValue={formProps.values.device}
                    >
                      {(
                        Object.keys(DEVICE_LABEL_BY_TYPE) as ApiDeviceType[]
                      ).map((deviceType) => (
                        <Select.Option
                          key={deviceType}
                          value={deviceType}
                          label={DEVICE_LABEL_BY_TYPE[deviceType]}
                        />
                      ))}
                    </Select>
                    {formProps.touched.device && formProps.errors.device && (
                      <Message validation="error">
                        {formProps.errors.device}
                      </Message>
                    )}
                  </InputWrapper>
                </FormField>
                {typeof formProps.status === 'string' && (
                  <Message validation="error">{formProps.status}</Message>
                )}

                <FormField>
                  <Label>
                    {t('__VIDEOS_EDIT_MODAL_FIELD_TEST_DATE')}{' '}
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <InputWrapper>
                    <Datepicker
                      value={formProps.values.testDate}
                      onChange={(date) => {
                        if (isDetailsLoading) return;
                        formProps.setFieldValue('testDate', date);
                        formProps.setFieldTouched('testDate', true, true);
                      }}
                      formatDate={(date) => dateToInputValue(date)}
                    >
                      <Input
                        disabled={isDetailsLoading}
                        value={dateToInputValue(formProps.values.testDate)}
                        validation={
                          formProps.touched.testDate &&
                          formProps.errors.testDate
                            ? 'error'
                            : undefined
                        }
                      />
                    </Datepicker>
                    {formProps.touched.testDate &&
                      formProps.errors.testDate && (
                        <Message validation="error">
                          {formProps.errors.testDate}
                        </Message>
                      )}
                  </InputWrapper>
                </FormField>
              </FormBody>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button isBasic disabled={isDetailsLoading} onClick={onClose}>
              {t('__VIDEOS_EDIT_MODAL_CANCEL', 'Cancel')}
            </Button>
            <Button
              isPrimary
              isAccent
              type="submit"
              form="edit-video-form"
              disabled={
                isDetailsLoading || formProps.isSubmitting || !formProps.isValid
              }
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
