import { Form, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  FormField as Field,
  Hint,
  Input,
  Label,
  Span,
  Textarea,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ProjectStatusValidationMessage } from './StatusValidationMessage';
import { ProjectFormProps } from './CreateProjectModal';

export const CreateProjectForm = ({
  formikProps,
}: {
  formikProps: FormikProps<ProjectFormProps>;
}) => {
  const { t } = useTranslation();

  return (
    <Form>
      <Label>
        {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_LABEL')}
        <Span style={{ color: appTheme.colors.dangerHue }}>*</Span>
      </Label>
      <Field
        style={{
          marginBottom: appTheme.space.md,
        }}
      >
        <Input
          style={{ marginTop: appTheme.space.xs }}
          placeholder={t(
            '__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_PLACEHOLDER'
          )}
          {...formikProps.getFieldProps('name')}
          {...(formikProps.errors.name && { validation: 'error' })}
        />
        <ProjectStatusValidationMessage
          formikProps={formikProps}
          field_name="name"
        />
      </Field>
      <Label>
        {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_DESCRIPTION_LABEL')}
      </Label>
      <Hint>
        {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_DESCRIPTION_INSTRUCTIONS')}
      </Hint>
      <Field>
        <Textarea
          isResizable
          rows={5}
          style={{ marginTop: appTheme.space.xs }}
          placeholder={t(
            '__DASHBOARD_CREATE_NEW_PROJECT_FORM_DESCRIPTION_PLACEHOLDER'
          )}
          {...formikProps.getFieldProps('description')}
          {...(formikProps.errors.description && { validation: 'error' })}
        />
        <ProjectStatusValidationMessage
          formikProps={formikProps}
          field_name="description"
        />
      </Field>
    </Form>
  );
};
