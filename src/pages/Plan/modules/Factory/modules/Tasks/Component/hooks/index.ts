import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import * as yup from 'yup';
import * as uuid from 'uuid';

const taskDataKey = Symbol('task');

export type TTask = components['schemas']['OutputModuleTask'] & {
  id: string;
};

export type TTaskData = { [taskDataKey]: true; taskId: TTask['id'] };

export function getTaskData(task: TTask): TTaskData {
  return { [taskDataKey]: true, taskId: task.id };
}

export function isTaskData(
  data: Record<string | symbol, unknown>
): data is TTaskData {
  // eslint-disable-next-line security/detect-object-injection
  return data[taskDataKey] === true;
}

function usePreviousValue(
  value?: Omit<components['schemas']['ModuleTask'], 'type'>
) {
  const ref = useRef<Omit<components['schemas']['ModuleTask'], 'type'>>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useModuleTasks = () => {
  const { t } = useTranslation();
  const { value, setOutput, setVariant } = useModule('tasks');
  const previousValue = usePreviousValue(value);

  const output: TTask[] = useMemo(
    () =>
      (value?.output || []).map((task) => ({
        ...task,
        id: task.id as string, // each task should have a unique ID from db or api transformResponse
      })),
    [value?.output]
  );

  const checkUrl = (
    url: components['schemas']['ModuleTask']['output'][number]['url']
  ) => {
    const errors: Record<string, string> = {};

    const urlSchema = yup.string().url();

    if (!urlSchema.isValidSync(url)) {
      errors.url = t(
        '__PLAN_PAGE_MODULE_TASKS_TASK_URL_LINK_ERROR_INVALID_URL'
      );
    }

    return errors;
  };

  const validation = (module: components['schemas']['ModuleTask']) => {
    const { output: o } = module;
    if (!o || o.length === 0)
      return {
        empty: t('__PLAN_PAGE_MODULE_TASKS_TASK_ERROR_REQUIRED'),
      };
    const errors = o.reduce((acc, item) => {
      const titleEmpty = !item.title || item.title.length === 0;
      const titleMaxLength = item.title.length > 64;
      const descriptionEmpty =
        !item.description ||
        item.description.length === 0 ||
        item.description === '<p></p>';
      const urlCheck = checkUrl(item.url);
      const invalidUrl = urlCheck.url;
      if (!titleEmpty && !descriptionEmpty && !titleMaxLength && !invalidUrl)
        return { ...acc };
      return {
        ...acc,
        [item.id as string]: {
          // here we rely on the id being provided from db or api transformResponse
          ...(titleEmpty
            ? {
                title: t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_ERROR_REQUIRED'),
              }
            : {}),
          ...(titleMaxLength
            ? {
                title: t(
                  '__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_ERROR_MAX_LENGTH'
                ),
              }
            : {}),
          ...(descriptionEmpty
            ? {
                description: t(
                  '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_ERROR_REQUIRED'
                ),
              }
            : {}),
          ...(invalidUrl
            ? {
                url: invalidUrl,
              }
            : {}),
        },
      };
    }, {});

    return Object.keys(errors).length ? errors : true;
  };

  const { error, validate } = useValidation({
    type: 'tasks',
    validate: validation,
  });

  const add = (kind: NonNullable<typeof value>['output'][number]['kind']) => {
    function getDefaultTitle(fill: boolean = false) {
      if (kind === 'bug' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_FUNCTIONAL_TITLE_DEFAULT'
        );
      if (kind === 'explorative-bug')
        // Always prefilled
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_EXPLORATORY_TITLE_DEFAULT'
        );

      if (kind === 'accessibility')
        return t(
          '__PLAN_PAGE_MODULE_TASKS_ACCESSIBILITY_TASK_ACCESSIBILITY_TITLE_DEFAULT'
        );
      if (kind === 'moderate-video' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_MODERATE_TITLE_DEFAULT'
        );
      if (kind === 'video' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_THINKING_ALOUD_TITLE_DEFAULT'
        );
      if (kind === 'survey' && fill)
        return t('__PLAN_PAGE_MODULE_TASKS_SURVEY_TASK_SURVEY_TITLE_DEFAULT');

      return '';
    }

    function getDefaultDescription(fill: boolean = true) {
      if (kind === 'bug' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_FUNCTIONAL_DESCRIPTION_DEFAULT'
        );
      if (kind === 'explorative-bug')
        // Always prefilled
        return t(
          '__PLAN_PAGE_MODULE_TASKS_FUNCTIONAL_TASK_EXPLORATORY_DESCRIPTION_DEFAULT'
        );
      if (kind === 'moderate-video' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_MODERATE_DESCRIPTION_DEFAULT'
        );
      if (kind === 'video' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_EXPERIENTIAL_TASK_THINKING_ALOUD_DESCRIPTION_DEFAULT'
        );
      if (kind === 'survey' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_SURVEY_TASK_SURVEY_DESCRIPTION_DEFAULT'
        );
      if (kind === 'accessibility' && fill)
        return t(
          '__PLAN_PAGE_MODULE_TASKS_ACCESSIBILITY_TASK_ACCESSIBILITY_DESCRIPTION_DEFAULT'
        );
      return '';
    }

    setOutput([
      ...(output || []),
      {
        kind,
        title: getDefaultTitle(),
        description: getDefaultDescription(),
        id: uuid.v4(),
      },
    ]);
  };

  const update = (id: string, v: Partial<(typeof output)[number]>) => {
    setOutput(
      output.map((o) => {
        if (o.id !== id) return o;

        if (v.url !== '') return { ...o, ...v };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { url: __, ...rest } = o;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { url: _, ...restWithoutUrl } = v;
        return { ...rest, ...restWithoutUrl };
      })
    );
  };

  const remove = (id: string) => {
    setOutput(output.filter((o) => o.id !== id));
  };

  useEffect(() => {
    if (
      previousValue &&
      value &&
      (previousValue.output.length > value.output.length ||
        previousValue.output.length === 0)
    ) {
      validate();
    }
  }, [value?.output]);

  return {
    value: output,
    variant: value?.variant,
    setOutput,
    setVariant,
    add,
    update,
    remove,
    validate,
    error,
  };
};

export { useModuleTasks };
