import {
  AccordionNew,
  Button,
  Editor,
  FormField,
  Input,
  Label,
  MD,
  MediaInput,
  Message,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useModuleTasks } from '../hooks';
import { getIconFromTaskOutput } from '../utils';
import { DeleteTaskConfirmationModal } from './modal/DeleteTaskConfirmationModal';

const TaskItem = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTasks();
  const { getPlanStatus } = useModuleConfiguration();
  const confirmationState = useState<{
    isOpen: boolean;
    taskKey: number;
  }>({ isOpen: false, taskKey: 0 });
  const { key, kind, title, description } = task;
  const index = key + 1;

  const titleError =
    error && typeof error === 'object' && `tasks.${key}.title` in error
      ? error[`tasks.${key}.title`]
      : false;
  const descriptionError =
    error && typeof error === 'object' && `tasks.${key}.description` in error
      ? error[`tasks.${key}.description`]
      : false;
  const invalidUrlError =
    error && typeof error === 'object' && `tasks.${key}.url` in error
      ? error[`tasks.${key}.url`]
      : false;

  const hasError = titleError || descriptionError || invalidUrlError;
  const hasPlaceholder = !title;

  const formattedKind = kind.replaceAll('-', ' ').toUpperCase();

  const handleBlur = () => {
    validate();
  };

  const isSimpleInterface = ['explorative-bug', 'accessibility'].includes(kind);

  return (
    <>
      <AccordionNew
        level={3}
        id={`task-${index}`}
        key={`task-${index}`}
        hasBorder
        type={hasError ? 'danger' : 'default'}
        role="listitem"
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromTaskOutput(task)}>
            <AccordionNew.Label
              label={`${index}. ${
                hasPlaceholder
                  ? t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER_EMPTY')
                  : title
              }`}
              subtitle={formattedKind}
            />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Button
                  isBasic
                  isDanger
                  onClick={(e) => {
                    confirmationState[1]({
                      isOpen: true,
                      taskKey: key,
                    });
                    e.stopPropagation();
                  }}
                >
                  <Button.StartIcon>
                    <TrashIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TASK_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }} role="form">
              {!isSimpleInterface && (
                <FormField style={{ marginBottom: appTheme.space.md }}>
                  <Label>
                    {t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_LABEL')}
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </Label>
                  <MD>
                    {t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_DESCRIPTION')}
                  </MD>
                  <Input
                    type="text"
                    readOnly={getPlanStatus() !== 'draft'}
                    value={title}
                    onChange={(e) => update(key, { title: e.target.value })}
                    placeholder={t(
                      '__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER'
                    )}
                    onBlur={handleBlur}
                    {...(titleError && { validation: 'error' })}
                    style={{ marginTop: appTheme.space.xs }}
                  />
                  {titleError && (
                    <Paragraph style={{ marginTop: appTheme.space.xs }}>
                      <Message validation="error">{titleError}</Message>
                    </Paragraph>
                  )}
                </FormField>
              )}
              <Label>
                {t('__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_LABEL')}
                {!isSimpleInterface && (
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                )}
              </Label>
              {isSimpleInterface ? (
                <MD
                  style={{
                    color: appTheme.palette.grey[800],
                    marginTop: appTheme.space.xs,
                  }}
                >
                  {description}
                </MD>
              ) : (
                <>
                  <Editor
                    key={`task-editor-${index}`}
                    editable={getPlanStatus() === 'draft'}
                    headerTitle={t(
                      '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_EDITOR_HEADER_TITLE'
                    )}
                    onUpdate={(value) =>
                      update(key, { description: value.editor.getHTML() })
                    }
                    hasInlineMenu
                    placeholderOptions={{
                      placeholder: t(
                        '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_EDITOR_PLACEHOLDER'
                      ),
                    }}
                    disableSaveShortcut
                    onBlur={handleBlur}
                    {...(descriptionError && { validation: 'error' })}
                  >
                    {description}
                  </Editor>
                  {descriptionError && (
                    <Paragraph style={{ marginTop: appTheme.space.xs }}>
                      <Message validation="error">{descriptionError}</Message>
                    </Paragraph>
                  )}
                </>
              )}
              {!isSimpleInterface && (
                <FormField style={{ marginTop: appTheme.space.md }}>
                  <Label>
                    {t('__PLAN_PAGE_MODULE_TASKS_TASK_LINK_LABEL')}{' '}
                    <Span
                      style={{
                        fontWeight: 400,
                        color: appTheme.palette.grey[600],
                      }}
                    >
                      {t('__PLAN_PAGE_MODULE_TASKS_TASK_OPTIONAL_LABEL')}
                    </Span>
                  </Label>
                  <MediaInput
                    start={<LinkIcon />}
                    value={task.url}
                    onBlur={handleBlur}
                    onChange={(e) => update(key, { url: e.target.value })}
                    placeholder={t(
                      '__PLAN_PAGE_MODULE_TASKS_TASK_LINK_PLACEHOLDER'
                    )}
                    readOnly={getPlanStatus() !== 'draft'}
                    {...(invalidUrlError && { validation: 'error' })}
                  />
                  {invalidUrlError ? (
                    <Paragraph style={{ marginTop: appTheme.space.xs }}>
                      <Message validation="error">{invalidUrlError}</Message>
                    </Paragraph>
                  ) : (
                    <Message>
                      {t('__PLAN_PAGE_MODULE_TASKS_TASK_LINK_HINT')}
                    </Message>
                  )}
                </FormField>
              )}
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {confirmationState[0].isOpen && (
        <DeleteTaskConfirmationModal state={confirmationState} />
      )}
    </>
  );
};

export { TaskItem };
