import {
  Button,
  Col,
  Ellipsis,
  Grid,
  Input,
  Label,
  Message,
  Radio,
  Row,
  SM,
  Skeleton,
  Tag,
  Textarea,
  XL,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { Field as FormField } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidVideoTagsQuery } from 'src/features/api';
import { appTheme } from 'src/app/theme';
import { useParams } from 'react-router-dom';
import { getColorWithAlpha } from 'src/common/utils';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { InsightFormValues } from '../FormProvider';
import { RadioTag } from '../../Video/components/ObservationForm';
import { ObservationCard } from '../Collection/ObservationCard';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const InsightForm = () => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const [selectedSeverity, setSelectedSeverity] = useState<
    number | undefined
  >();

  const { values, isSubmitting, setFieldValue, errors, resetForm } =
    useFormikContext<InsightFormValues>();

  const {
    data: tags,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidVideoTagsQuery({
    cid: campaignId || '',
  });

  const severities = tags?.find((tag) => tag.group.name === 'severity');

  useEffect(() => {
    setSelectedSeverity(values.severity);
  }, [values]);

  return (
    <FormContainer>
      <XL isBold>{t('__INSIGHTS_PAGE_INSIGHT_FORM_TITLE')}</XL>
      <Divider />
      <div>
        <Label>
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_TITLE_LABEL')}
          <Label style={{ color: appTheme.palette.red[600] }}>*</Label>
        </Label>
        <Field name="title">
          {({ field, form, meta }: FieldProps) => (
            <div style={{ marginTop: appTheme.space.sm }}>
              <Input
                {...field}
                placeholder={t(
                  '__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_TITLE_PLACEHOLDER'
                )}
                onChange={(e) => {
                  form.setFieldValue('title', e.target.value);
                }}
                validation={errors.title ? 'error' : undefined}
              />
              {meta.touched && meta.error && (
                <Message
                  validation="error"
                  style={{ marginTop: appTheme.space.sm }}
                >
                  {meta.error}
                </Message>
              )}
            </div>
          )}
        </Field>
      </div>
      <div>
        <Label>
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_DESCRIPTION_LABEL')}
          <Label style={{ color: appTheme.palette.red[600] }}>*</Label>
        </Label>
        <Field name="description">
          {({ field, form, meta }: FieldProps) => (
            <>
              <Textarea
                {...field}
                placeholder={t(
                  '__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_DESCRIPTION_PLACEHOLDER'
                )}
                onChange={(e) => {
                  form.setFieldValue('description', e.target.value);
                }}
                isResizable
                rows={2}
                validation={errors.description ? 'error' : undefined}
              />
              {meta.touched && meta.error && (
                <Message
                  validation="error"
                  style={{ marginTop: appTheme.space.sm }}
                >
                  {meta.error}
                </Message>
              )}
            </>
          )}
        </Field>
      </div>
      {severities && severities.tags && severities.tags.length > 0 && (
        <div
          style={{
            opacity: isFetching ? 0.5 : 1,
          }}
        >
          <Label>
            {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_SEVERITY_LABEL')}
            <Label style={{ color: appTheme.palette.red[600] }}>*</Label>
          </Label>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div style={{ marginTop: appTheme.space.sm }}>
                {severities.tags.map((severity) => (
                  <RadioTag
                    color={severity.style}
                    style={{
                      backgroundColor: getColorWithAlpha(severity.style, 0.1),
                      marginBottom: appTheme.space.sm,
                    }}
                  >
                    <FormField>
                      <Radio
                        checked={selectedSeverity === severity.id}
                        onChange={() => {
                          setSelectedSeverity(severity.id);
                          setFieldValue('severity', severity.id);
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
      <div>
        <Label>{t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_USECASE_LABEL')}</Label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: appTheme.space.xs,
            marginTop: appTheme.space.xs,
            flexWrap: 'wrap',
          }}
        >
          {values.usecases.map((usecase) => (
            <Tag key={usecase.id}>
              <Ellipsis>{usecase.name}</Ellipsis>
            </Tag>
          ))}
        </div>
      </div>
      <Divider />
      <div>
        <Label>
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_OBSERVATIONS_LABEL')}
          <Label style={{ color: appTheme.palette.red[600] }}>*</Label>
        </Label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: appTheme.space.xs,
            marginTop: appTheme.space.xs,
          }}
        >
          <SM color={appTheme.palette.grey[600]}>
            {t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_OBSERVATIONS_SELECTED')}
          </SM>
          <SM isBold color={appTheme.palette.grey[600]}>
            {values.observations.length}{' '}
            {t(
              '__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_OBSERVATIONS_SELECTED_COUNT',
              {
                count: values.observations.length,
              }
            )}
          </SM>
        </div>
        {values.observations.length > 0 && (
          <Grid style={{ marginTop: appTheme.space.sm }}>
            <Row>
              {values.observations.map(
                (observation: InsightFormValues['observations'][number]) => (
                  <Col sm={6}>
                    <ObservationCard
                      key={observation.id}
                      observation={observation}
                      hideCheckbox
                    />
                  </Col>
                )
              )}
            </Row>
          </Grid>
        )}
        {errors.observations && (
          <Message validation="error" style={{ marginTop: appTheme.space.sm }}>
            {errors.observations}
          </Message>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="reset"
          isBasic
          disabled={isSubmitting}
          style={{
            marginRight: appTheme.space.sm,
          }}
          onClick={() => {
            resetForm();
          }}
        >
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_UNDO')}
        </Button>
        <Button isAccent isPrimary type="submit" disabled={isSubmitting}>
          {values.id === -1
            ? t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_CREATE')
            : t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_UPDATE')}
        </Button>
      </div>
    </FormContainer>
  );
};
export { InsightForm };
