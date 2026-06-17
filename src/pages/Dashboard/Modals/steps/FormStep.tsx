import {
  Autocomplete,
  Button,
  Dots,
  DropdownFieldNew as DropField,
  FooterItem,
  FormField,
  Input,
  Label,
  Message,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { usePostProjectsMutation } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import styled from 'styled-components';

export interface FormValues {
  projectId: number | undefined;
  name: string;
  language: string;
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const FormStepBody = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const canAccessWorkspace = useCanAccessToActiveWorkspace();
  const [createProject] = usePostProjectsMutation();
  const { data: projectsData, isLoading: isLoadingProjects } =
    useActiveWorkspaceProjects();
  const projects = projectsData?.items ?? [];
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();

  return (
    <FormWrapper>
      <Field name="projectId">
        {({ meta }: FieldProps) => {
          const hasError = Boolean(meta.touched && meta.error);
          return (
            <FormField>
              <Label>
                {t('__NEW_ACTIVITY_MODAL_SELECT_PROJECT_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              {isLoadingProjects ? (
                <Skeleton height="40px" width="100%" />
              ) : (
                <DropField>
                  <Autocomplete
                    listboxAppendToNode={document.body}
                    onBlur={() => setFieldTouched('projectId', true)}
                    onOptionClick={({ selectionValue }) => {
                      setFieldTouched('projectId', true);
                      const project = projects.find(
                        (p) => p.id.toString() === selectionValue
                      );
                      setFieldValue(
                        'projectId',
                        project ? project.id : undefined
                      );
                    }}
                    options={[
                      {
                        id: 'projects-group',
                        label: t(
                          '__NEW_ACTIVITY_MODAL_SELECT_PROJECT_PLACEHOLDER'
                        ),
                        options: projects.map((p) => ({
                          id: p.id.toString(),
                          value: p.id.toString(),
                          label: p.name,
                          isSelected: values.projectId === p.id,
                        })),
                      },
                    ]}
                    placeholder={t(
                      '__NEW_ACTIVITY_MODAL_SELECT_PROJECT_PLACEHOLDER'
                    )}
                    selectionValue={values.projectId?.toString() ?? ''}
                    isCreatable={canAccessWorkspace}
                    onCreateNewOption={async (value) => {
                      setFieldTouched('projectId', true);
                      const res = await createProject({
                        body: {
                          name: value,
                          customer_id: activeWorkspace?.id ?? -1,
                        },
                      }).unwrap();

                      if (res.id) {
                        setFieldValue('projectId', res.id);
                      }

                      return {
                        id: res.id.toString(),
                        value: res.id.toString(),
                        label: res.name,
                      };
                    }}
                    {...(hasError && { validation: 'error' })}
                  />
                  {hasError && (
                    <Message
                      validation="error"
                      style={{ marginTop: appTheme.space.xs }}
                    >
                      {meta.error}
                    </Message>
                  )}
                </DropField>
              )}
            </FormField>
          );
        }}
      </Field>

      <Field name="name">
        {({ field, meta }: FieldProps) => {
          const hasError = Boolean(meta.touched && meta.error);
          return (
            <FormField>
              <Label>
                {t('__NEW_ACTIVITY_MODAL_NAME_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Input
                {...field}
                validation={hasError ? 'error' : undefined}
                placeholder={t('__NEW_ACTIVITY_MODAL_NAME_PLACEHOLDER')}
              />
              {hasError && <Message validation="error">{meta.error}</Message>}
            </FormField>
          );
        }}
      </Field>
    </FormWrapper>
  );
};

const FormStepFooter = ({
  onBack,
  isLoading,
}: {
  onBack: () => void;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext<FormValues>();
  return (
    <>
      <FooterItem>
        <Button isBasic onClick={onBack} disabled={isLoading}>
          {t('__NEW_ACTIVITY_MODAL_BACK_BUTTON')}
        </Button>
      </FooterItem>
      <FooterItem>
        <Button
          isAccent
          isPrimary
          disabled={isLoading}
          onClick={() => handleSubmit()}
        >
          {isLoading ? (
            <Dots color={appTheme.palette.white} />
          ) : (
            t('__NEW_ACTIVITY_MODAL_CREATE_BUTTON')
          )}
        </Button>
      </FooterItem>
    </>
  );
};

FormStepBody.Footer = FormStepFooter;

export { FormStepBody as FormStep };
