import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import * as yup from 'yup';

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

  const hasEnoughOs = (
    os: components['schemas']['ModuleTouchpoints']['output'][number]['os']
  ) => Object.keys(os).length > 0;
  const checkOsLink = (
    item: components['schemas']['ModuleTouchpoints']['output'][number]
  ) => {
    const { form_factor, os } = item;
    const errors: Record<string, string> = {};

    const urlSchema = yup.string().url();

    if (form_factor === 'smartphone' || form_factor === 'tablet') {
      if ('android' in os && !os.android)
        errors.android = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
        );
      else if ('android' in os && !urlSchema.isValidSync(os.android))
        errors.android = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_INVALID_URL'
        );

      if ('ios' in os && !os.ios)
        errors.ios = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
        );
      else if ('ios' in os && !urlSchema.isValidSync(os.ios))
        errors.ios = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_INVALID_URL'
        );
    }

    if (form_factor === 'desktop') {
      if ('windows' in os && !os.windows)
        errors.windows = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
        );
      else if ('windows' in os && !urlSchema.isValidSync(os.windows))
        errors.windows = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_INVALID_URL'
        );

      if ('macos' in os && !os.macos)
        errors.macos = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
        );
      else if ('macos' in os && !urlSchema.isValidSync(os.macos))
        errors.macos = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_INVALID_URL'
        );

      if ('linux' in os && !os.linux)
        errors.linux = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
        );
      else if ('linux' in os && !urlSchema.isValidSync(os.linux))
        errors.linux = t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_INVALID_URL'
        );
    }

    return errors;
  };

  const validation = (module: components['schemas']['ModuleTouchpoints']) => {
    const { output: o } = module;

    const errors = o.reduce((acc, item, idx) => {
      const osEmpty = !hasEnoughOs(item.os);
      const osErrors = checkOsLink(item);
      const hasOsErrors = Object.keys(osErrors).length > 0;

      if (!osEmpty && !hasOsErrors) return { ...acc };

      return {
        ...acc,
        [idx]: {
          ...(osEmpty && item.kind === 'app'
            ? {
                length: t(
                  '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_ERROR_REQUIRED'
                ),
              }
            : {}),
          ...(hasOsErrors && item.kind === 'app'
            ? {
                os: {
                  ...osErrors,
                },
              }
            : {}),
          ...(osEmpty && item.kind === 'web'
            ? {
                link: t(
                  '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
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
        os: {},
      },
    ]);
  };

  const update = (
    k: number,
    v: Partial<components['schemas']['OutputModuleTouchpoints']>
  ) => {
    setOutput(
      output.map((o) => {
        const { key: keyO, ...rest } = o;
        if (keyO === k) {
          const u = { ...o, ...v };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...updated } = u;

          const baseItem = {
            kind: updated.kind,
            form_factor: updated.form_factor,
          };

          if (updated.form_factor === 'smartphone') {
            const smartphoneOs = updated.os as
              | components['schemas']['OutputModuleTouchpointsAppMobile']['os']
              | components['schemas']['OutputModuleTouchpointsWebMobile']['os'];
            return {
              ...baseItem,
              os: smartphoneOs,
            };
          }

          if (updated.form_factor === 'tablet') {
            const tabletOs = updated.os as
              | components['schemas']['OutputModuleTouchpointsAppTablet']['os']
              | components['schemas']['OutputModuleTouchpointsWebTablet']['os'];
            return {
              ...baseItem,
              os: tabletOs,
            };
          }

          if (updated.form_factor === 'desktop') {
            const desktopOs = updated.os as
              | components['schemas']['OutputModuleTouchpointsAppDesktop']['os']
              | components['schemas']['OutputModuleTouchpointsWebDesktop']['os'];
            return {
              ...baseItem,
              os: desktopOs,
            };
          }
        }

        return rest;
      }) as components['schemas']['OutputModuleTouchpoints'][]
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
