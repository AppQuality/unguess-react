import { useModule } from 'src/features/modules/useModule';

const useTasks = () => {
  const { value, setOutput } = useModule('tasks');

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

    setOutput([
      ...(value?.output || []),
      {
        kind,
        title: getDefaultTitle(),
      },
    ]);
  };

  const update = (k: number, v: Partial<(typeof output)[number]>) => {
    setOutput(
      output
        .map((t) => (t.key === k ? { ...t, ...v } : t))
        .map((t) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...rest } = t;
          return rest;
        })
    );
  };

  const remove = (k: number) => {
    setOutput(
      output
        .filter((t) => t.key !== k)
        .map((t) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...rest } = t;
          return rest;
        })
    );
  };

  return {
    value: output,
    setOutput,
    add,
    update,
    remove,
  };
};

export { useTasks };
