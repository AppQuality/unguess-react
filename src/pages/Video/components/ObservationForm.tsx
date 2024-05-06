import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import {
  Button,
  Dropdown,
  Input,
  Item,
  Label,
  Menu,
  Message,
  MultiSelect,
  Select,
  Skeleton,
  Span,
  Textarea,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  GetVideoByVidObservationsApiResponse,
  useGetCampaignsByCidVideoTagsQuery,
  usePatchVideoByVidObservationsAndOidMutation,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useRef, useState } from 'react';
import { Circle } from 'src/common/components/CustomStatusDrawer/Circle';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

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

interface ObservationFormValues {
  title: string;
  severity: number;
  notes: string;
}

const ObservationForm = ({
  observation,
  onSubmit,
  onDelete,
}: {
  observation: GetVideoByVidObservationsApiResponse[number];
  onSubmit: (
    values: ObservationFormValues,
    actions: FormikHelpers<ObservationFormValues>
  ) => void;
  onDelete: () => void;
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
      ?.filter((tag) => tag.group.name.toLowerCase() !== 'severity')
      .map((tag) => ({
        id: tag.tag.id,
        label: tag.tag.name,
      })) || []
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [addVideoTags] = usePostCampaignsByCidVideoTagsMutation();
  const [patchObservation] = usePatchVideoByVidObservationsAndOidMutation();

  const {
    data: tags,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidVideoTagsQuery({
    cid: campaignId || '',
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(
      t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_ERROR')
    ),
    severity: Yup.number()
      .min(1, t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_ERROR'))
      .required(
        t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_ERROR')
      ),
  });

  const severities = tags?.filter(
    (tag) => tag.group.name.toLowerCase() === 'severity'
  )?.[0];

  useEffect(() => {
    if (tags) {
      setOptions(
        tags
          .filter((group) => group.group.name.toLowerCase() !== 'severity')
          .map((group) =>
            group.tags.map((tag) => ({
              id: tag.id,
              label: tag.name,
              selected: selectedOptions.some((bt) => bt.id === tag.id),
            }))
          )
          .flat()
      );
    }
  }, [tags, selectedOptions]);

  const formInitialValues = {
    title: observation?.title || '',
    severity:
      observation?.tags?.find(
        (tag) => tag.group.name.toLowerCase() === 'severity'
      )?.tag.id || 0,
    notes: observation?.description || '',
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
        title: values.title,
        description: values.notes,
        start: observation.start,
        end: observation.end,
        tags: [...selectedOptions.map((tag) => tag.id), values.severity],
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
          {({
            errors,
            values,
            getFieldProps,
            handleSubmit,
            ...formProps
          }: FormikProps<ObservationFormValues>) => (
            <Form
              onSubmit={handleSubmit}
              style={{ marginBottom: appTheme.space.sm }}
            >
              <StyledLabel>
                {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_LABEL')}
              </StyledLabel>
              <Input
                style={{ margin: 0 }}
                placeholder={t(
                  '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
                )}
                {...getFieldProps('title')}
                {...(errors.title && { validation: 'error' })}
              />
              {errors.title && (
                <Message
                  validation="error"
                  style={{ marginTop: appTheme.space.sm }}
                >
                  {errors.title}
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
                      <Dropdown
                        selectedItem={selectedSeverity}
                        onSelect={(item) => {
                          setSelectedSeverity(item);
                          formProps.setFieldValue('severity', item.id);
                        }}
                        downshiftProps={{
                          itemToString: (
                            item: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]
                          ) => item && item.id,
                        }}
                        {...getFieldProps('severity')}
                      >
                        <Field>
                          <Select>
                            {selectedSeverity ? (
                              <>
                                <Circle color={`${selectedSeverity.style}`} />
                                {selectedSeverity.name} (
                                {selectedSeverity.usageNumber})
                              </>
                            ) : (
                              <Span
                                style={{ color: appTheme.palette.grey[400] }}
                              >
                                {t(
                                  '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_PLACEHOLDER'
                                )}
                              </Span>
                            )}
                          </Select>
                        </Field>
                        <Menu>
                          {severities.tags.map(
                            (
                              item: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]
                            ) => (
                              <Item key={item.id} value={item}>
                                <>
                                  <Circle color={`${item.style}`} />
                                  {item.name} ({item.usageNumber})
                                </>
                              </Item>
                            )
                          )}
                        </Menu>
                      </Dropdown>
                      {errors.severity && (
                        <Message
                          validation="error"
                          style={{ marginTop: appTheme.space.sm }}
                        >
                          {errors.severity}
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
                <Input readOnly disabled style={{ margin: 0 }} />
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
                  {...getFieldProps('notes')}
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
                    onDelete();
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
