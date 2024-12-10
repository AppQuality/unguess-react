import { Form, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import {
  FormField as Field,
  Hint,
  Input,
  Label,
  Span,
  Textarea,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { ProjectFormProps } from './ProjectFormModel';
import { ProjectStatusValidationMessage } from './StatusValidationMessage';

export const CreateProjectForm = ({
  formikProps,
}: {
  formikProps: FormikProps<ProjectFormProps>;
}) => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { currentData: projects } = useGetWorkspacesByWidProjectsQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
    },
    { skip: !activeWorkspace?.id }
  );
  const validateProjectName = (value: string) => {
    if (
      projects &&
      projects.items &&
      projects.items.find((p) => p.name === value)
    ) {
      formikProps.setFieldError(
        'name',
        t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_UNIQUE_ERROR')
      );
    }
  };
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
          name="name"
          placeholder={t(
            '__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_PLACEHOLDER'
          )}
          onChange={(e) => {
            formikProps.setFieldValue('name', e.target.value);
          }}
          onBlur={(e) => {
            validateProjectName(e.target.value);
          }}
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
          onChange={(e) => {
            formikProps.setFieldValue('description', e.target.value);
          }}
          isResizable
          rows={5}
          style={{ marginTop: appTheme.space.xs }}
          name="description"
          placeholder={t(
            '__DASHBOARD_CREATE_NEW_PROJECT_FORM_DESCRIPTION_PLACEHOLDER'
          )}
        />
        <ProjectStatusValidationMessage
          formikProps={formikProps}
          field_name="description"
        />
      </Field>
    </Form>
  );
};
