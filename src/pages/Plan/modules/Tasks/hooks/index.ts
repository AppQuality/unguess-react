import { useTranslation } from 'react-i18next';
import { useModule } from 'src/features/modules/useModule';

const useModuleTasks = () => {
  const { t } = useTranslation();
  const { value, setOutput, setVariant } = useModule('tasks');

  const output = (value?.output || []).map((task, i) => ({
    ...task,
    key: i,
  }));

  const add = (kind: NonNullable<typeof value>['output'][number]['kind']) => {
    function getDefaultTitle() {
      if (kind === 'bug')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_FUNCTIONAL_TITLE_DEFAULT'
        );
      if (kind === 'explorative-bug')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_EXPLORATORY_TITLE_DEFAULT'
        );
      if (kind === 'moderate-video')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_MODERATE_TITLE_DEFAULT'
        );
      if (kind === 'video')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_THINKING_ALOUD_TITLE_DEFAULT'
        );
      if (kind === 'survey')
        return t('__PLAN_PAGE_MODULE_TASKS_SURVEY_TASK_SURVEY_TITLE_DEFAULT');
      return '';
    }

    function getDefaultDescription() {
      if (kind === 'bug')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_FUNCTIONAL_DESCRIPTION_DEFAULT'
        );
      if (kind === 'explorative-bug')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_EXPLORATORY_DESCRIPTION_DEFAULT'
        );
      if (kind === 'moderate-video')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_MODERATE_DESCRIPTION_DEFAULT'
        );
      if (kind === 'video')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_THINKING_ALOUD_DESCRIPTION_DEFAULT'
        );
      if (kind === 'survey')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_SURVEY_TASK_SURVEY_DESCRIPTION_DEFAULT'
        );
      return '';
    }

    setOutput([
      ...(value?.output || []),
      {
        kind,
        title: getDefaultTitle(),
        description: getDefaultDescription(),
      },
    ]);

    return output.length;
  };

  const update = (k: number, v: Partial<(typeof output)[number]>) => {
    setOutput(
      output
        .map((o) => (o.key === k ? { ...o, ...v } : o))
        .map((o) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...rest } = o;
          return rest;
        })
    );
  };

  const remove = (k: number) => {
    setOutput(
      output
        .filter((o) => o.key !== k)
        .map((o) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...rest } = o;
          return rest;
        })
    );
  };

  return {
    value: output,
    variant: value?.variant,
    setOutput,
    setVariant,
    add,
    update,
    remove,
  };
};

export { useModuleTasks };
