import { IconButton } from '@appquality/unguess-design-system';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';

interface BugsDetailProps {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  currentBugId: string | null;
}

const BugsDetail = ({
  isDetailOpen,
  setIsDetailOpen,
  currentBugId,
}: BugsDetailProps) => (
  <>
    BugsDetail. Current bug id: {currentBugId}{' '}
    {isDetailOpen ? 'open' : 'closed'}
    <IconButton
      onClick={() => {
        setIsDetailOpen(false);
      }}
    >
      <CloseIcon />
    </IconButton>
  </>
);

export { BugsDetail };
