import { LG } from '@appquality/unguess-design-system';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';

const useTasks = () => {
  const { value, set } = useModuleContext('tasks');

  const output = (value?.output || []).map((task, i) => ({
    ...task,
    key: i,
  }));

  const add = (kind: NonNullable<typeof value>['output'][number]['kind']) => {
    function getDefaultTitle() {
      if (kind === 'bug') return 'Search for bugs';
      if (kind === 'video') return 'Think aloud';
      return '';
    }

    set({
      output: [
        ...(value?.output || []),
        {
          kind,
          title: getDefaultTitle(),
        },
      ],
    });
  };

  const update = (k: number, v: Partial<(typeof output)[number]>) => {
    set({
      output: output
        .map((t) => (t.key === k ? { ...t, ...v } : t))
        .map((t) => {
          const { key, ...rest } = t;
          return rest;
        }),
    });
  };

  const remove = (k: number) => {
    set({
      output: output
        .filter((t) => t.key !== k)
        .map((t) => {
          const { key, ...rest } = t;
          return rest;
        }),
    });
  };

  return {
    value: output,
    set,
    add,
    update,
    remove,
  };
};

const Tasks = () => {
  const { value, add, remove, update } = useTasks();

  return (
    <div data-qa="tasks-module">
      <LG>Tasks</LG>
      {value.map((task) => (
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={`task-${task.key}`}>Title</label>
          <input
            id={`task-${task.key}`}
            type="text"
            value={task.title}
            onChange={(e) => update(task.key, { title: e.target.value })}
            placeholder="Enter task title"
          />
          <button type="button" onClick={() => remove(task.key)}>
            Remove
          </button>
        </div>
      ))}
      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={() => add('bug')}>
          Add bug output
        </button>
        <button type="button" onClick={() => add('video')}>
          Add video output
        </button>
      </div>
    </div>
  );
};

export { Tasks };
