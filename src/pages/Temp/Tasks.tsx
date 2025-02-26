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
    <>
      <h1>Tasks</h1>
      {value.map((task) => (
        <div>
          <input
            type="text"
            value={task.title}
            onChange={(e) => update(task.key, { title: e.target.value })}
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
    </>
  );
};

export { Tasks };
