import {
  Button,
  Checkbox,
  Input,
  Label,
  MD,
  Message,
  SM,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { Field as ZendeskField } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { memo } from 'react';
import { InsightFormValues } from './FormProvider';

const InsightForm = memo(({ insight }: { insight: any }) => {
  const { t } = useTranslation();
  const { values, setValues, isSubmitting } =
    useFormikContext<InsightFormValues>();
  const isEditing = values.id === insight.id;
  console.log('suca', insight);
  // Readonly mode
  if (!isEditing)
    return (
      <>
        <MD>{insight.title}</MD>
        <div style={{ marginTop: appTheme.space.sm }}>
          <SM>
            {insight.observations
              .map((observation: any) => observation.title)
              .join(', ')}
          </SM>
        </div>
        <Button
          isBasic
          disabled={isSubmitting}
          style={{
            marginRight: appTheme.space.sm,
            color: appTheme.palette.red[500],
          }}
          onClick={() => {}}
        >
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_DELETE')}
        </Button>
        <Button
          style={{ marginTop: appTheme.space.md }}
          isPrimary
          onClick={() => setValues(insight)}
        >
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_EDIT')}
        </Button>
      </>
    );
  // Editing mode
  return (
    <>
      <Label>{t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_TITLE_LABEL')}</Label>
      <Field name="title">
        {({ field, form, meta }: FieldProps) => (
          <>
            <Input
              {...field}
              placeholder={t(
                '__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_TITLE_PLACEHOLDER'
              )}
              onChange={(e) => {
                form.setFieldValue('title', e.target.value);
              }}
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
      <div style={{ margin: `${appTheme.space.md} 0` }}>
        <Label>
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_OBSERVATIONS_LABEL')}
        </Label>
        <div style={{ marginTop: appTheme.space.sm }}>
          {values.observations.map(
            (observation: InsightFormValues['observations'][number]) => (
              <Field
                key={observation.id}
                name={`observations.${observation.id}`}
              >
                {({ form }: FieldProps) => (
                  <ZendeskField>
                    <Checkbox
                      checked={
                        !!values.observations.find(
                          (o) => o.id === observation.id
                        )
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          form.setFieldValue('observations', [
                            ...values.observations,
                            observation,
                          ]);
                        } else {
                          form.setFieldValue(
                            'observations',
                            values.observations.filter(
                              (o) => o.id !== observation.id
                            )
                          );
                        }
                      }}
                    >
                      <Label isRegular>{observation.title}</Label>
                    </Checkbox>
                  </ZendeskField>
                )}
              </Field>
            )
          )}
        </div>
      </div>
      <Button
        isBasic
        disabled={isSubmitting}
        style={{
          marginRight: appTheme.space.sm,
        }}
        onClick={() => {}}
      >
        {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_UNDO')}
      </Button>
      <Button isPrimary type="submit">
        {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_SAVE')}
      </Button>
    </>
  );
});
export { InsightForm };
