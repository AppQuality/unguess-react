import { ReactComponent as MediumIcon } from 'src/assets/icons/bug-priority-medium.svg';
import { ReactComponent as LowestIcon } from 'src/assets/icons/bug-priority-lowest.svg';
import { ReactComponent as LowIcon } from 'src/assets/icons/bug-priority-low.svg';
import { ReactComponent as HighIcon } from 'src/assets/icons/bug-priority-high.svg';
import { ReactComponent as HighestIcon } from 'src/assets/icons/bug-priority-highest.svg';

export const PriorityIcon = ({ priority }: { priority: string }) => {
  switch (priority) {
    case 'medium':
      return <MediumIcon />;
    case 'high':
      return <HighIcon />;
    case 'highest':
      return <HighestIcon />;
    case 'low':
      return <LowIcon />;
    case 'lowest':
      return <LowestIcon />;
    default:
      return <MediumIcon />;
  }
};
