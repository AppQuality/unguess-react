import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';

function usePreviousValue(value?: components['schemas']['ModuleTouchpoints']) {
  const ref = useRef<components['schemas']['ModuleTouchpoints']>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useModuleTouchpoints = () => {
  const { t } = useTranslation();
  const { value, setOutput, setVariant } = useModule('touchpoints');
  const previousValue = usePreviousValue(value);

  const validation = (module: components['schemas']['ModuleTouchpoints']) => {
    const { output: o } = module;

    const errors = o.reduce((acc, item, idx) => {
      const osEmpty = item.kind === 'app' && !item.os;
      const linkEmpty = !item.link || item.link.length === 0;
      if (!linkEmpty || !osEmpty) return { ...acc };
      return {
        ...acc,
        [idx]: {
          ...(linkEmpty
            ? {
                link: t(
                  '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_LINK_ERROR_REQUIRED'
                ),
              }
            : {}),
          ...(osEmpty
            ? {
                os: t(
                  '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_ERROR_REQUIRED'
                ),
              }
            : {}),
        },
      };
    }, {});

    return Object.keys(errors).length ? errors : true;
  };

  const { error, validate } = useValidation({
    type: 'touchpoints',
    validate: validation,
  });

  const output = (value?.output || []).map((touchpoint, i) => ({
    ...touchpoint,
    key: i,
  }));

  const add = (
    kind: NonNullable<typeof value>['output'][number]['kind'],
    form_factor: NonNullable<typeof value>['output'][number]['form_factor']
  ) => {
    setOutput([
      ...(value?.output || []),
      {
        kind,
        form_factor,
        link: '',
        os: kind === 'app' ? '' : undefined,
      },
    ]);
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

  useEffect(() => {
    if (
      previousValue &&
      value &&
      previousValue.output.length > value.output.length
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

export { useModuleTouchpoints };
