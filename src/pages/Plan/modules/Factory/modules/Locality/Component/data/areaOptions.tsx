import { Span, Tag, getColor } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getColorWithAlpha } from 'src/common/utils';

export const areaOptions = [
  {
    label: <Trans i18nKey="__PLAN_PAGE_MODULE_LOCALITY_ALL_AREAS_LABEL" />,
    value: 'all',
    hint: <Trans i18nKey="__PLAN_PAGE_MODULE_LOCALITY_ALL_AREAS_HINT" />,
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
    label: <Trans i18nKey="__PLAN_PAGE_MODULE_LOCALITY_NIELSEN_AREAS_LABEL" />,
    value: 'region',
    hint: <Trans i18nKey="__PLAN_PAGE_MODULE_LOCALITY_REGIONS_HINT" />,
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
    label: <Trans i18nKey="__PLAN_PAGE_MODULE_LOCALITY_REGIONS_LABEL" />,
    value: 'city',
    hint: <Trans i18nKey="__PLAN_PAGE_MODULE_LOCALITY_CITIES_HINT" />,
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
