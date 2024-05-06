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
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  GetVideoByVidObservationsApiResponse,
  useGetCampaignsByCidVideoTagsQuery,
} from 'src/features/api';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useRef, useState } from 'react';
import { Circle } from 'src/common/components/CustomStatusDrawer/Circle';

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
}

const ObservationForm = ({
  observation,
  onSubmit,
  onCancel,
}: {
  observation: GetVideoByVidObservationsApiResponse[number];
  onSubmit: (
    values: ObservationFormValues,
    actions: FormikHelpers<ObservationFormValues>
  ) => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const formRef = useRef<FormikProps<ObservationFormValues>>(null);
  const [selectedSeverity, setSelectedSeverity] =
    useState<GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]>();
  const [options, setOptions] = useState<
    { id: number; label: string; selected?: boolean }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<
    { id: number; label: string }[]
  >([]);

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

  const formInitialValues = {
    title: observation?.title || '',
    severity:
      observation?.tags.find(
        (tag) => tag.group.name.toLowerCase() === 'severity'
      )?.tag.id || 0,
  };

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

  return (
    <FormContainer>
      <Formik
        innerRef={formRef}
        initialValues={formInitialValues}
        validateOnChange
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
                            <Span style={{ color: appTheme.palette.grey[400] }}>
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
                    console.log(
                      'selectedTags',
                      availableTags.filter((o) => o.selected)
                    );
                    console.log('newTag', newTag);

                    setSelectedOptions(availableTags.filter((o) => o.selected));
                    // TODO: handle new tag
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
                  formRef.current?.resetForm();
                  onCancel();
                }}
              >
                {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_BUTTON')}
              </Button>
              <Button
                isPrimary
                isAccent
                type="submit"
                disabled={formProps.isSubmitting}
              >
                {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_SAVE_BUTTON')}
              </Button>
            </PullRight>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export { ObservationForm };
