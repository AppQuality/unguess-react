import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import {
  Button,
  Label,
  Message,
  MultiSelect,
  Skeleton,
  Textarea,
  useToast,
  Notification,
  Radio,
  Tag,
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  GetVideosByVidObservationsApiResponse,
  Paragraph,
  useGetCampaignsByCidVideoTagsQuery,
  usePatchVideosByVidObservationsAndOidMutation,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import { Field as FormField } from '@zendeskgarden/react-forms';
import { useEffect, useRef, useState } from 'react';
import { getColorWithAlpha } from 'src/common/utils';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ObservationFormValues, TitleDropdown } from './TitleDropdown';

const FormContainer = styled.div`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xxs};
`;

const PullRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledLabel = styled(Label)`
  display: block;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const RadioTag = styled(Tag)<{
  color: string;
}>`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xxs};

  * {
    user-select: none;
  }
`;
const ObservationForm = ({
  observation,
  paragraphs,
  onSubmit,
}: {
  observation: GetVideosByVidObservationsApiResponse[number];
  paragraphs?: Paragraph[];
  onSubmit: (
    values: ObservationFormValues,
    actions: FormikHelpers<ObservationFormValues>
  ) => void;
}) => {
  const { t } = useTranslation();
  const { campaignId, videoId } = useParams();
  const formRef = useRef<FormikProps<ObservationFormValues>>(null);
  const { addToast } = useToast();
  const [options, setOptions] = useState<
    { id: number; label: string; selected?: boolean }[]
  >([]);
  const [selectedSeverity, setSelectedSeverity] = useState<
    GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number] | undefined
  >(
    observation.tags?.find((tag) => tag.group.name.toLowerCase() === 'severity')
      ?.tag
  );
  const [selectedOptions, setSelectedOptions] = useState<
    { id: number; label: string }[]
  >(
    observation.tags
      ?.filter(
        (tag) =>
          tag.group.name.toLowerCase() !== 'severity' &&
          tag.group.name.toLowerCase() !== 'title'
      )
      .map((tag) => ({
        id: tag.tag.id,
        label: tag.tag.name,
      })) || []
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [addVideoTags] = usePostCampaignsByCidVideoTagsMutation();
  const [patchObservation] = usePatchVideosByVidObservationsAndOidMutation();

  const {
    data: tags,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidVideoTagsQuery({
    cid: campaignId || '',
  });

  const validationSchema = Yup.object().shape({
    title: Yup.number()
      .min(1, t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_ERROR'))
      .required(t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_ERROR')),
    severity: Yup.number()
      .min(1, t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_ERROR'))
      .required(
        t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_ERROR')
      ),
    quotes: Yup.string().required(
      t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_QUOTS_ERROR')
    ),
  });

  const severities = tags?.filter(
    (tag) => tag.group.name.toLowerCase() === 'severity'
  )?.[0];

  const titles = tags?.filter(
    (tag) => tag.group.name.toLowerCase() === 'title'
  )?.[0];

  useEffect(() => {
    if (tags) {
      setOptions(
        tags
          .filter(
            (group) =>
              group.group.name.toLowerCase() !== 'severity' &&
              group.group.name.toLowerCase() !== 'title'
          )
          .map((group) =>
            group.tags.map((tag) => ({
              id: tag.id,
              label: `${tag.name} (${tag.usageNumber})`,
              selected: selectedOptions.some((bt) => bt.id === tag.id),
            }))
          )
          .flat()
      );
    }
  }, [tags, selectedOptions]);

  function generateQuotes() {
    if (!paragraphs) return undefined;
    const wordsWithinRange = paragraphs
      .flatMap((paragraph) =>
        paragraph.words.filter(
          (word) =>
            word.start >= observation.start && word.end <= observation.end
        )
      )
      .map((word) => word.word)
      .join(' ');

    return wordsWithinRange;
  }

  const formInitialValues = {
    title:
      observation?.tags?.find((tag) => tag.group.name.toLowerCase() === 'title')
        ?.tag.id || 0,
    severity:
      observation?.tags?.find(
        (tag) => tag.group.name.toLowerCase() === 'severity'
      )?.tag.id || 0,
    notes: observation?.description || '',
    quotes: observation?.quotes || generateQuotes() || '',
  };

  const onSubmitPatch = async (
    values: ObservationFormValues,
    actions: FormikHelpers<ObservationFormValues>
  ) => {
    onSubmit(values, actions);
    patchObservation({
      vid: videoId ?? '',
      oid: observation.id.toString(),
      body: {
        description: values.notes,
        quotes: values.quotes,
        start: observation.start,
        end: observation.end,
        tags: [
          ...selectedOptions.map((tag) => tag.id),
          values.severity,
          values.title,
        ],
      },
    })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t(
                '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_SAVE_TOAST_SUCCESS'
              )}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      })
      .catch((err) => {
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
      });
  };

  return (
    <>
      <FormContainer>
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validateOnChange
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={onSubmitPatch}
        >
          {(formProps: FormikProps<ObservationFormValues>) => (
            <Form
              onSubmit={formProps.handleSubmit}
              style={{ marginBottom: appTheme.space.sm }}
            >
              <StyledLabel>
                {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_LABEL')}
              </StyledLabel>
              <TitleDropdown
                titles={titles?.tags}
                title={
                  observation.tags?.find(
                    (tag) => tag.group.name.toLowerCase() === 'title'
                  )?.tag
                }
                formProps={formProps}
              />
              {formProps.errors.title && (
                <Message
                  validation="error"
                  style={{ marginTop: appTheme.space.sm }}
                >
                  {formProps.errors.title}
                </Message>
              )}
              {severities && severities.tags.length > 0 && (
                <div
                  style={{
                    marginTop: appTheme.space.md,
                    opacity: isFetching ? 0.5 : 1,
                  }}
                >
                  <StyledLabel>
                    {t(
                      '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_LABEL'
                    )}
                  </StyledLabel>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <div>
                        {severities.tags.map((severity) => (
                          <RadioTag
                            color={severity.style}
                            style={{
                              backgroundColor: getColorWithAlpha(
                                severity.style,
                                0.1
                              ),
                              marginBottom: appTheme.space.sm,
                            }}
                          >
                            <FormField>
                              <Radio
                                checked={selectedSeverity?.id === severity.id}
                                onChange={() => {
                                  setSelectedSeverity(severity);
                                  formRef.current?.setFieldValue(
                                    'severity',
                                    severity.id
                                  );
                                }}
                              >
                                <Label
                                  style={{
                                    color: severity.style,
                                    paddingRight: appTheme.space.xxs,
                                  }}
                                >
                                  {severity.name}
                                </Label>
                              </Radio>
                            </FormField>
                          </RadioTag>
                        ))}
                      </div>
                      {formProps.errors.severity && (
                        <Message
                          validation="error"
                          style={{ marginTop: appTheme.space.sm }}
                        >
                          {formProps.errors.severity}
                        </Message>
                      )}
                    </>
                  )}
                </div>
              )}
              <div
                style={{
                  marginTop: appTheme.space.md,
                  opacity: isFetching ? 0.5 : 1,
                }}
              >
                <StyledLabel>
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TAGS_LABEL')}
                </StyledLabel>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <MultiSelect
                    options={options}
                    selectedItems={options.filter((o) => o.selected)}
                    creatable
                    maxItems={4}
                    size="medium"
                    i18n={{
                      placeholder: t(
                        '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TAGS_PLACEHOLDER'
                      ),
                      showMore: (count) =>
                        t(
                          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TAGS_SHOW_MORE',
                          { count }
                        ),
                      addNew: (value) =>
                        `${t(
                          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TAGS_ADD_NEW'
                        )} "${value}"`,
                    }}
                    onChange={async (availableTags, newTag) => {
                      setSelectedOptions(
                        availableTags.filter((o) => o.selected)
                      );
                      if (newTag)
                        addVideoTags({
                          cid: campaignId?.toString() || '0',
                          body: {
                            group: {
                              name: 'tags',
                            },
                            tag: {
                              name: newTag,
                            },
                          },
                        })
                          .unwrap()
                          .then((res) => {
                            setSelectedOptions([
                              ...selectedOptions,
                              {
                                id: res.tag.id,
                                label: res.tag.name,
                              },
                            ]);
                          })
                          .catch((err) => {
                            // eslint-disable-next-line no-console
                            console.error(err);
                          });
                    }}
                  />
                )}
              </div>

              <div style={{ marginTop: appTheme.space.md }}>
                <StyledLabel>
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_QUOTS_LABEL')}
                </StyledLabel>
                <Textarea
                  style={{ margin: 0 }}
                  {...formProps.getFieldProps('quotes')}
                  rows={4}
                />
                {formProps.errors.quotes && (
                  <Message
                    validation="error"
                    style={{ marginTop: appTheme.space.sm }}
                  >
                    {formProps.errors.quotes}
                  </Message>
                )}
              </div>
              <div style={{ marginTop: appTheme.space.md }}>
                <StyledLabel>
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_NOTES_LABEL')}
                </StyledLabel>
                <Textarea
                  style={{ margin: 0 }}
                  placeholder={t(
                    '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_NOTES_PLACEHOLDER'
                  )}
                  rows={4}
                  {...formProps.getFieldProps('notes')}
                />
              </div>
              <PullRight>
                <Button
                  isBasic
                  disabled={formProps.isSubmitting}
                  style={{
                    marginRight: appTheme.space.sm,
                    color: appTheme.palette.red[500],
                  }}
                  onClick={() => {
                    setIsConfirmationModalOpen(true);
                  }}
                >
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_BUTTON')}
                </Button>
                <Button
                  isPrimary
                  isAccent
                  type="submit"
                  disabled={formProps.isSubmitting || !formProps.isValid}
                >
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_SAVE_BUTTON')}
                </Button>
              </PullRight>
            </Form>
          )}
        </Formik>
      </FormContainer>
      {isConfirmationModalOpen && (
        <ConfirmDeleteModal
          observationId={observation.id}
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      )}
    </>
  );
};

export { ObservationForm };
