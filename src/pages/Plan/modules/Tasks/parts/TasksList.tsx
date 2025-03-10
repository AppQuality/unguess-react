import { useTranslation } from 'react-i18next';
import { LG, Button } from '@appquality/unguess-design-system';
import { useTasks } from '../hooks';

const TasksList = () => {
  const { t } = useTranslation();
  const { value, remove, update } = useTasks();

  return (
    <div data-qa="tasks-module">
      {value.map((task) => (
        <div key={task.key}>
          <LG>{t('__PLAN_PAGE_TASKS_SECTION_TITLE')}</LG>
          <input
            id={`task-${task.key}`}
            type="text"
            value={task.title}
            onChange={(e) => update(task.key, { title: e.target.value })}
            placeholder="Enter task title"
          />
          <Button isBasic isPill onClick={() => remove(task.key)}>
            {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TASK_BUTTON')}
          </Button>
        </div>
      ))}
    </div>
  );
};

export { TasksList };
