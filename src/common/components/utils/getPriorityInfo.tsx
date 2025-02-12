import { Select } from '@appquality/unguess-design-system';
import { TFunction } from 'i18next';
import { ComponentProps } from 'react';
import { ReactComponent as PriorityHigh } from 'src/assets/icons/priority-high.svg';
import { ReactComponent as PriorityHighest } from 'src/assets/icons/priority-highest.svg';
import { ReactComponent as PriorityLow } from 'src/assets/icons/priority-low.svg';
import { ReactComponent as PriorityLowest } from 'src/assets/icons/priority-lowest.svg';
import { ReactComponent as PriorityMedium } from 'src/assets/icons/priority-medium.svg';

type IconType = ComponentProps<typeof Select.Option>['icon'];

type PriorityInfo = {
  icon: IconType;
  text: string;
};

export const getPriorityInfo = (
  priority: Priority,
  t: TFunction
): PriorityInfo => {
  switch (priority.toLowerCase()) {
    case 'highest':
      return {
        icon: <PriorityHighest />,
        text: t('__BUG_PRIORITY_HIGHEST'),
      };
    case 'high':
      return {
        icon: <PriorityHigh />,
        text: t('__BUG_PRIORITY_HIGH'),
      };
    case 'medium':
      return {
        icon: <PriorityMedium />,
        text: t('__BUG_PRIORITY_MEDIUM'),
      };
    case 'low':
      return {
        icon: <PriorityLow />,
        text: t('__BUG_PRIORITY_LOW'),
      };
    case 'lowest':
      return {
        icon: <PriorityLowest />,
        text: t('__BUG_PRIORITY_LOWEST'),
      };
    default:
      return {
        icon: <PriorityMedium />,
        text: t('__BUG_PRIORITY_MEDIUM'),
      };
  }
};
