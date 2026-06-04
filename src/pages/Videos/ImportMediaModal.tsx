import {
  getAllLanguageTags,
  getLanguageNameByFullTag,
} from '@appquality/languages';
import {
  Button,
  FileUpload,
  FormField,
  IconButton,
  Input,
  Label,
  MD,
  Message,
  Modal,
  ModalClose,
  Notification,
  Select,
  Spinner,
  Tooltip,
  File as UploadFileItem,
  FileList as UploadFileList,
  useToast,
} from '@appquality/unguess-design-system';
import { ReactComponent as TrahsIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { Formik, FormikProps } from 'formik';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import {
  useDeleteHubsByHidAssetsAndMidMutation,
  usePostHubsByHidAssetsMutation,
} from 'src/features/api';
import { getFileType } from 'src/pages/Videos/utils/getFileType';
import styled from 'styled-components';
import * as Yup from 'yup';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  text-align: center;
`;

const FileRow = styled.li`
  display: flex;
  align-items: center;

  & > div {
    flex: 1;
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

const FileItemInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.space.xs};
`;

const FileItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const FileName = styled.span`
  flex: 1;
  min-width: 0;
`;

const HiddenInput = styled(Input)`
  display: none;
`;

interface ImportMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  hubId: string;
}

interface UploadedItem {
  id: string;
  file: File;
  mediaId?: number;
  errorMessage?: string;
  status: 'pending' | 'success' | 'error';
}

interface UploadFormData extends FormData {
  media: string | string[];
  language: string;
}

interface ImportMediaFormValues {
  spokenLanguage: string;
  files: UploadedItem[];
}

const getUploadValidation = (status: UploadedItem['status']) => {
  if (status === 'success') return 'success';
  if (status === 'error') return 'error';
  return undefined;
};

export const ImportMediaModal = ({
  isOpen,
  onClose,
  hubId,
}: ImportMediaModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadAsset] = usePostHubsByHidAssetsMutation();
  const [deleteAsset] = useDeleteHubsByHidAssetsAndMidMutation();

  const allowedLanguages = useMemo(
    () =>
      [...getAllLanguageTags()].sort((a, b) => {
        const nameA = getLanguageNameByFullTag(a)?.toLowerCase() ?? '';
        const nameB = getLanguageNameByFullTag(b)?.toLowerCase() ?? '';
        return nameA.localeCompare(nameB);
      }),
    []
  );

  const showErrorToast = (message: string) => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={message}
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
  };

  const addFiles = async (
    formik: FormikProps<ImportMediaFormValues>,
    incoming: FileList | null
  ) => {
    if (!incoming) return;

    if (!formik.values.spokenLanguage) {
      formik.setFieldTouched('spokenLanguage', true, true);
      return;
    }

    const nextFiles = Array.from(incoming);
    const selectedLanguage = formik.values.spokenLanguage;
    let currentFiles = [...formik.values.files];

    const pendingUploads = nextFiles.map((file) => ({
      file,
      fileId: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
    }));

    currentFiles = [
      ...currentFiles,
      ...pendingUploads.map(({ file, fileId }) => ({
        id: fileId,
        file,
        status: 'pending' as const,
        errorMessage: undefined,
      })),
    ];
    formik.setFieldValue('files', currentFiles, true);

    const updateFile = (
      fileId: string,
      updater: (item: UploadedItem) => UploadedItem
    ) => {
      currentFiles = currentFiles.map((item) =>
        item.id === fileId ? updater(item) : item
      );
      formik.setFieldValue('files', currentFiles, true);
    };

    setIsUploading(true);
    try {
      await Promise.allSettled(
        pendingUploads.map(async ({ file, fileId }) => {
          const formData: UploadFormData = new FormData() as UploadFormData;
          const normalizedFilename = file.name
            .normalize('NFD')
            .replace(/\s+/g, '-');
          formData.append('media', file, normalizedFilename);
          formData.append('language', selectedLanguage);

          try {
            const response = await uploadAsset({
              hid: hubId,
              body: formData as unknown as {
                media: string | string[];
                language: string;
              },
            }).unwrap();

            const failedItems = response.failed;
            if (failedItems?.length) {
              const failedFilename = failedItems[0]?.name ?? file.name;
              updateFile(fileId, (item) => ({
                ...item,
                status: 'error',
                errorMessage: t(
                  '__VIDEOS_IMPORT_MEDIA_MODAL_UPLOAD_ERROR_FILE',
                  {
                    filename: failedFilename,
                  }
                ),
              }));
              return;
            }

            const uploadedId = response.uploaded_ids?.[0]?.id;
            updateFile(fileId, (item) => ({
              ...item,
              mediaId: uploadedId,
              status: 'success',
              errorMessage: undefined,
            }));
          } catch {
            updateFile(fileId, (item) => ({
              ...item,
              status: 'error',
              errorMessage: t(
                '__VIDEOS_IMPORT_MEDIA_MODAL_UPLOAD_ERROR_GENERIC'
              ),
            }));
          }
        })
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = async (
    formik: FormikProps<ImportMediaFormValues>,
    index: number
  ) => {
    const item = formik.values.files[index];
    if (!item) return;

    const { mediaId, status } = item;

    if (status === 'success' && typeof mediaId === 'number') {
      try {
        await deleteAsset({ hid: hubId, mid: mediaId }).unwrap();
      } catch {
        showErrorToast(t('__VIDEOS_IMPORT_MEDIA_MODAL_DELETE_ERROR_GENERIC'));
        return;
      }
    }

    const nextFiles = formik.values.files.filter((_, i) => i !== index);
    formik.setFieldValue('files', nextFiles, true);
  };

  const cleanupUploadedMedia = async (items: UploadedItem[]) => {
    const uploadedMediaIds = items
      .filter(
        (item) => item.status === 'success' && typeof item.mediaId === 'number'
      )
      .map((item) => item.mediaId as number);

    if (uploadedMediaIds.length === 0) return true;

    const results = await Promise.allSettled(
      uploadedMediaIds.map((mid) => deleteAsset({ hid: hubId, mid }).unwrap())
    );

    return results.every((result) => result.status === 'fulfilled');
  };

  const handleClose = async (formik: FormikProps<ImportMediaFormValues>) => {
    setIsClosing(true);

    try {
      const didCleanupSucceed = await cleanupUploadedMedia(formik.values.files);
      if (!didCleanupSucceed) {
        showErrorToast(t('__VIDEOS_IMPORT_MEDIA_MODAL_DELETE_ERROR_GENERIC'));
        return;
      }

      formik.resetForm();
      onClose();
    } finally {
      setIsClosing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Formik<ImportMediaFormValues>
      initialValues={{ spokenLanguage: '', files: [] }}
      validationSchema={Yup.object().shape({
        spokenLanguage: Yup.string().required(
          t('__VIDEOS_IMPORT_MEDIA_MODAL_SPOKEN_LANGUAGE_REQUIRED')
        ),
        files: Yup.array()
          .of(Yup.mixed<UploadedItem>())
          .min(1, t('__VIDEOS_IMPORT_MEDIA_MODAL_FILES_REQUIRED')),
      })}
      onSubmit={(_, actions) => {
        const targetPath = `/hubs/${hubId}/videos/`;

        actions.resetForm();
        onClose();

        if (
          location.pathname === targetPath ||
          location.pathname === targetPath.slice(0, -1)
        ) {
          window.location.reload();
          return;
        }

        navigate(targetPath);
      }}
    >
      {(formik) => (
        <Modal
          onClose={() => {
            handleClose(formik).catch(() => undefined);
          }}
        >
          <Modal.Header>{t('__VIDEOS_IMPORT_MEDIA_MODAL_TITLE')}</Modal.Header>
          <Modal.Body>
            <BodyContainer>
              <MD>{t('__VIDEOS_IMPORT_MEDIA_MODAL_DESCRIPTION')}</MD>

              <FormField>
                <LabelRow>
                  <Label style={{ marginBottom: 0 }}>
                    {t('__VIDEOS_IMPORT_MEDIA_MODAL_SPOKEN_LANGUAGE_LABEL')}
                  </Label>
                  <Tooltip
                    content={t(
                      '__VIDEOS_IMPORT_MEDIA_MODAL_SPOKEN_LANGUAGE_TOOLTIP'
                    )}
                    placement="top"
                    type="light"
                    size="medium"
                  >
                    <IconButton isBasic size="small">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </LabelRow>

                <Select
                  fullWidthOption
                  listboxAppendToNode={document.body}
                  placeholder={t(
                    '__VIDEOS_IMPORT_MEDIA_MODAL_SPOKEN_LANGUAGE_PLACEHOLDER'
                  )}
                  onSelect={(value) => {
                    formik.setFieldValue('spokenLanguage', value);
                    formik.setFieldTouched('spokenLanguage', true, false);
                  }}
                  selectionValue={formik.values.spokenLanguage}
                  inputValue={
                    getLanguageNameByFullTag(formik.values.spokenLanguage) ?? ''
                  }
                >
                  {allowedLanguages.map((lang) => (
                    <Select.Option
                      key={`spoken-language-${lang}`}
                      value={lang}
                      label={getLanguageNameByFullTag(lang) ?? lang}
                    />
                  ))}
                </Select>
                {formik.touched.spokenLanguage &&
                  formik.errors.spokenLanguage && (
                    <Message
                      style={{ marginTop: appTheme.space.xs }}
                      validation="error"
                    >
                      {formik.errors.spokenLanguage}
                    </Message>
                  )}
              </FormField>

              <FormField>
                <Label>{t('__VIDEOS_IMPORT_MEDIA_MODAL_UPLOAD_LABEL')}</Label>

                <FileUpload
                  isDragging={isDragging}
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    addFiles(formik, event.dataTransfer.files).catch(
                      () => undefined
                    );
                  }}
                >
                  <HiddenInput
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="video/*,audio/*"
                    disabled={isUploading}
                    onChange={(event) => {
                      addFiles(formik, event.target.files).catch(
                        () => undefined
                      );
                      event.currentTarget.value = '';
                    }}
                  />
                  <UploadContent>
                    <MD>
                      {t('__VIDEOS_IMPORT_MEDIA_MODAL_UPLOAD_DROPZONE_TEXT')}
                    </MD>
                    <MD>{t('__VIDEOS_IMPORT_MEDIA_MODAL_UPLOAD_MAX_SIZE')}</MD>
                  </UploadContent>
                </FileUpload>
                {formik.touched.files &&
                  typeof formik.errors.files === 'string' && (
                    <Message validation="error">{formik.errors.files}</Message>
                  )}
              </FormField>

              {formik.values.files.length > 0 && (
                <UploadFileList>
                  {formik.values.files.map((item, index) => (
                    <FileRow key={item.id}>
                      <UploadFileItem
                        type={getFileType(item.file)}
                        validation={getUploadValidation(item.status)}
                        style={{ height: 'auto', minHeight: '40px' }}
                      >
                        <FileItemInner>
                          <FileItemHeader>
                            <FileName>{item.file.name}</FileName>
                            {item.status === 'pending' ? (
                              <Spinner
                                size={appTheme.space.md}
                                color={appTheme.palette.blue[700]}
                              />
                            ) : (
                              <Button
                                isBasic
                                size="small"
                                aria-label={t(
                                  '__VIDEOS_IMPORT_MEDIA_MODAL_REMOVE_FILE'
                                )}
                                onClick={() => {
                                  removeFile(formik, index).catch(
                                    () => undefined
                                  );
                                }}
                              >
                                <TrahsIcon />
                              </Button>
                            )}
                          </FileItemHeader>
                          {item.errorMessage && (
                            <Message
                              style={{ paddingBottom: appTheme.space.sm }}
                              validation="error"
                            >
                              {item.errorMessage}
                            </Message>
                          )}
                        </FileItemInner>
                      </UploadFileItem>
                    </FileRow>
                  ))}
                </UploadFileList>
              )}
            </BodyContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button
              isBasic
              style={{ marginRight: appTheme.space.sm }}
              disabled={isUploading || isClosing}
              onClick={() => {
                handleClose(formik).catch(() => undefined);
              }}
            >
              {t('__VIDEOS_IMPORT_MEDIA_MODAL_CANCEL')}
            </Button>
            <Button
              isPrimary
              isAccent
              onClick={() => {
                formik.submitForm().catch(() => undefined);
              }}
              disabled={
                isClosing ||
                isUploading ||
                formik.values.files.some((item) => item.status === 'pending')
              }
            >
              {t('__VIDEOS_IMPORT_MEDIA_MODAL_SAVE')}
            </Button>
          </Modal.Footer>
          <ModalClose />
        </Modal>
      )}
    </Formik>
  );
};
