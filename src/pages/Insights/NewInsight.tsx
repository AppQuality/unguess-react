import {
  Button,
  Checkbox,
  Input,
  Label,
  Message,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { Field as ZendeskField } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { InsightFormValues } from './FormProvider';

const NewInsightForm = () => {
  const { t } = useTranslation();
  const {
    values: { observations },
    isSubmitting,
  } = useFormikContext<InsightFormValues>();

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
          {observations.map(
            (observation: InsightFormValues['observations'][number]) => {
              const title =
                observation.tags.find((tag) => tag.group.name === 'title')?.tag
                  .name || observation.title;

              return (
                <Field
                  key={observation.id}
                  name={`observations.${observation.id}`}
                >
                  {({ form }: FieldProps) => (
                    <ZendeskField>
                      <Checkbox
                        checked={
                          !!observations.find((o) => o.id === observation.id)
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            form.setFieldValue('observations', [
                              ...observations,
                              observation,
                            ]);
                          } else {
                            form.setFieldValue(
                              'observations',
                              observations.filter(
                                (o) => o.id !== observation.id
                              )
                            );
                          }
                        }}
                      >
                        <Label isRegular>{title}</Label>
                      </Checkbox>
                    </ZendeskField>
                  )}
                </Field>
              );
            }
          )}
        </div>
      </div>
      <Button
        type="reset"
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
};
export { NewInsightForm };
