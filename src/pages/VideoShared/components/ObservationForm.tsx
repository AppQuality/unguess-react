import {
  FormField,
  Label,
  Message,
  MultiSelect,
  Radio,
  SM,
  Skeleton,
  Tag,
  Textarea,
} from '@appquality/unguess-design-system';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { getColorWithAlpha } from 'src/common/utils';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  GetVideosByVidObservationsApiResponse,
  Paragraph,
  useGetCampaignsByCidVideoTagsQuery,
} from 'src/features/api';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { TooltipModalContextProvider } from './context';
import { ObservationFormValues, TitleDropdown } from './TitleDropdownNew';

const FormContainer = styled.div`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xxs};
`;

const StyledLabel = styled(Label)`
  display: block;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

export const RadioTag = styled(Tag)<{
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
}: {
  observation: GetVideosByVidObservationsApiResponse[number];
  paragraphs?: Paragraph[];
  onSubmit: (
    values: ObservationFormValues,
    actions: FormikHelpers<ObservationFormValues>
  ) => void;
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const formRef = useRef<FormikProps<ObservationFormValues>>(null);
  const [options, setOptions] = useState<
    ComponentProps<typeof MultiSelect>['options']
  >([]);
  const [selectedSeverity] = useState<
    GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number] | undefined
  >(
    observation.tags?.find((tag) => tag.group.name.toLowerCase() === 'severity')
      ?.tag
  );
  const [selectedOptions] = useState<{ id: number; label: string }[]>(
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
          .flatMap((group) => group.tags)
          .sort((a, b) => b.usageNumber - a.usageNumber)
          .map((tag) => ({
            id: tag.id,
            itemID: tag.id.toString(),
            label: `${tag.name} (${tag.usageNumber})`,
            selected: selectedOptions.some((bt) => bt.id === tag.id),
          }))
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

  return (
    <TooltipModalContextProvider>
      <FormContainer>
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validateOnChange
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {(formProps: FormikProps<ObservationFormValues>) => (
            <Form
              onSubmit={formProps.handleSubmit}
              style={{ marginBottom: appTheme.space.sm }}
            >
              <StyledLabel>
                {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_LABEL')}
                <Label
                  style={{
                    color: appTheme.palette.red[600],
                  }}
                >
                  *
                </Label>
                <SM style={{ color: appTheme.palette.grey[600] }}>
                  {t(
                    '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_DESCRIPTION'
                  )}
                </SM>
              </StyledLabel>
              <div style={{ pointerEvents: 'none' }}>
                <TitleDropdown titles={titles?.tags} formProps={formProps} />
              </div>
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
                    <Label
                      style={{
                        color: appTheme.palette.red[600],
                      }}
                    >
                      *
                    </Label>
                  </StyledLabel>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <div>
                        {/* Radio buttons for severity selection */}
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
                                disabled
                                checked={selectedSeverity?.id === severity.id}
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
              {/* ExtraTags Field */}
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
                    data-qa="video-tags-dropdown"
                    isEditable={false}
                    isAutocomplete={false}
                    isDisabled
                    isMultiselectable={false}
                    options={options}
                    // options={[]}
                    selectedItems={options.filter((o) => o.selected)}
                    // listboxAppendToNode={document.body}
                    // creatable
                    maxItems={4}
                    size="medium"
                    i18n={{
                      placeholder: t(
                        '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TAGS_PLACEHOLDER'
                      ),
                    }}
                  />
                )}
              </div>
              {/* Quotes Field */}
              <div style={{ marginTop: appTheme.space.md }}>
                <StyledLabel>
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_QUOTS_LABEL')}
                  <Label
                    style={{
                      color: appTheme.palette.red[600],
                    }}
                  >
                    *
                  </Label>
                </StyledLabel>
                <Textarea
                  readOnly
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
              {/* Notes Field */}
              <div style={{ marginTop: appTheme.space.md }}>
                <StyledLabel>
                  {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_NOTES_LABEL')}
                </StyledLabel>
                <Textarea
                  readOnly
                  style={{ margin: 0 }}
                  rows={4}
                  {...formProps.getFieldProps('notes')}
                />
              </div>
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
    </TooltipModalContextProvider>
  );
};

export { ObservationForm };
