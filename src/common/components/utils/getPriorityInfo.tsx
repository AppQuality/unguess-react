import { TFunction } from 'react-i18next';
import { ReactComponent as PriorityHighest } from 'src/assets/icons/priority-highest.svg';
import { ReactComponent as PriorityHigh } from 'src/assets/icons/priority-high.svg';
import { ReactComponent as PriorityMedium } from 'src/assets/icons/priority-medium.svg';
import { ReactComponent as PriorityLow } from 'src/assets/icons/priority-low.svg';
import { ReactComponent as PriorityLowest } from 'src/assets/icons/priority-lowest.svg';

type PriorityInfo = {
  icon?: React.ReactNode;
  text?: string;
};

export const getPriorityInfo = (
  priority: Priority,
  t: TFunction
): PriorityInfo => {
  switch (priority) {
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
      return {};
  }
};
