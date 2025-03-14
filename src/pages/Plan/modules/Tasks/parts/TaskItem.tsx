import {
  AccordionNew,
  Button,
  Editor,
  Ellipsis,
  FormField,
  Input,
  Label,
  MD,
  Message,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useModuleTasksContext } from '../context';
import { useModuleTasks } from '../hooks';
import { getIconFromTask } from '../utils';
import { DeleteTaskConfirmationModal } from './modal/DeleteTaskConfirmationModal';

const TaskItem = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTasks();
  const { isConfirmationModalOpen, setIsConfirmationModalOpen } =
    useModuleTasksContext();
  const { getPlanStatus } = useModuleConfiguration();
  const { key } = task;
  const index = key + 1;

  const titleError =
    error && typeof error === 'object' && `tasks.${key}.title` in error
      ? error[`tasks.${key}.title`]
      : false;
  const descriptionError =
    error && typeof error === 'object' && `tasks.${key}.description` in error
      ? error[`tasks.${key}.description`]
      : false;

  const hasError = titleError || descriptionError;
  const hasPlaceholder = !task.title;

  const handleBlur = () => {
    validate();
  };

  return (
    <>
      <AccordionNew
        level={3}
        id={`task-${index}`}
        key={`task-${index}`}
        hasBorder
        type={hasError ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromTask(task)}>
            <AccordionNew.Label
              label={`${index}. ${
                hasPlaceholder
                  ? t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER_EMPTY')
                  : task.title
              }`}
            />
            <AccordionNew.Meta>
              <Button
                isBasic
                isDanger
                onClick={() => setIsConfirmationModalOpen(true)}
              >
                <Button.StartIcon>
                  <TrashIcon />
                </Button.StartIcon>
                {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TASK_BUTTON')}
              </Button>
            </AccordionNew.Meta>
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              <FormField style={{ marginBottom: appTheme.space.md }}>
                <Label>{t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_LABEL')}</Label>
                <MD>{t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_DESCRIPTION')}</MD>
                <Input
                  type="text"
                  disabled={getPlanStatus() !== 'draft'}
                  value={task.title}
                  onChange={(e) => update(key, { title: e.target.value })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER'
                  )}
                  onBlur={handleBlur}
                  {...(titleError && { validation: 'error' })}
                />
                {titleError && (
                  <Message validation="error">{titleError}</Message>
                )}
              </FormField>
              <Label>
                {t('__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_LABEL')}
              </Label>
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
                {task.description}
              </Editor>
              {descriptionError && (
                <Message validation="error">{descriptionError}</Message>
              )}
              {/* TODO: Add missing task.link value */}
              {/* <FormField style={{ marginTop: appTheme.space.md }}>
                <Label>
                  {t('__PLAN_PAGE_MODULE_TASKS_TASK_LINK_LABEL')}{" "}<Span style={{ fontWeight: 400, color: appTheme.palette.grey[600] }}>{t('__PLAN_PAGE_MODULE_TASKS_TASK_OPTIONAL_LABEL')}</Span>
                </Label>
                <MediaInput
                  start={<LinkIcon />}
                  value={task.link}
                  onChange={(value) => update(key, { link: value })}
                  placeholder={t('__PLAN_PAGE_MODULE_TASKS_TASK_LINK_PLACEHOLDER')}
                />
              </FormField> */}
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {isConfirmationModalOpen && <DeleteTaskConfirmationModal taskKey={key} />}
    </>
  );
};

export { TaskItem };
