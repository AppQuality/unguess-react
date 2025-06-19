import { Span, Tag, getColor } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getColorWithAlpha } from 'src/common/utils';

export const areaOptions = [
  {
    label: 'Tutte le aree',
    value: 'all',
    hint: 'hint text',
    tag: (
      <Tag
        hue={getColorWithAlpha(appTheme.colors.successHue, 0.1)}
        color={getColor(appTheme.colors.successHue, 600)}
      >
        <Trans
          i18nKey="__PLAN_PAGE_MODULE_LOCALITY_ALL_AREAS_TAG"
          components={{
            s: <Span isBold hue={getColor(appTheme.colors.successHue, 800)} />,
          }}
          defaults="<s>example text</s>: lorem ipsum"
        />
      </Tag>
    ),
  },
  {
    label: 'Aree Nielsen e Regioni',
    value: 'region',
    hint: 'hint text',
    tag: (
      <Tag
        hue={getColor(appTheme.palette.grey, 100)}
        color={getColor(appTheme.colors.neutralHue, 600)}
      >
        <Trans
          i18nKey="__PLAN_PAGE_MODULE_LOCALITY_REGIONS_TAG"
          components={{
            s: <Span isBold hue={getColor(appTheme.colors.neutralHue, 700)} />,
          }}
          defaults="<s>example text</s>: lorem ipsum"
        />
      </Tag>
    ),
  },
  {
    label: 'Province e grossi centri',
    value: 'city',
    hint: 'hint text',
    tag: (
      <Tag
        hue={getColor(appTheme.palette.grey, 100)}
        color={getColor(appTheme.colors.neutralHue, 600)}
      >
        <Trans
          i18nKey="__PLAN_PAGE_MODULE_LOCALITY_CITIES_TAG"
          components={{
            s: <Span isBold hue={getColor(appTheme.colors.neutralHue, 700)} />,
          }}
          defaults="<s>example text</s>: lorem ipsum"
        />
      </Tag>
    ),
  },
];
