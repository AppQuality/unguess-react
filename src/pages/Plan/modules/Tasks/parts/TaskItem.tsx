import {
  Accordion,
  Button,
  Editor,
  FormField,
  Input,
  Label,
  MD,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModuleTasks } from '../hooks';

const TaskItem = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { t } = useTranslation();
  const { remove, update } = useModuleTasks();

  return (
    <Accordion
      key={`task-${task.key}`}
      level={3}
      isExpandable
      isBare
      defaultExpandedSections={[0, 1]}
      style={{
        border: `1px solid ${appTheme.palette.grey[500]}`,
        backgroundColor: 'white',
        borderRadius: appTheme.borderRadii.lg,
      }}
    >
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label>
            {task.key + 1}. {task.title}
          </Accordion.Label>
          <Button isBasic isDanger onClick={() => remove(task.key)}>
            <Button.StartIcon>
              <TrashIcon />
            </Button.StartIcon>
            {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TASK_BUTTON')}
          </Button>
        </Accordion.Header>
        <Accordion.Panel>
          <FormField style={{ marginBottom: appTheme.space.md }}>
            <Label>{t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_LABEL')}</Label>
            <MD>{t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_DESCRIPTION')}</MD>
            <Input
              type="text"
              value={task.title}
              onChange={(e) => update(task.key, { title: e.target.value })}
              placeholder={t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER')}
            />
          </FormField>
          <>
            <Label>
              {t('__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_LABEL')}
            </Label>
            <Editor
              key={`task-editor-${task.key}`}
              headerTitle={t(
                '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_EDITOR_HEADER_TITLE'
              )}
              onUpdate={(value) =>
                update(task.key, { description: value.editor.getHTML() })
              }
              hasInlineMenu
              placeholderOptions={{
                placeholder: t(
                  '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_EDITOR_PLACEHOLDER'
                ),
              }}
            >
              {task.description}
            </Editor>
          </>
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};

export { TaskItem };
