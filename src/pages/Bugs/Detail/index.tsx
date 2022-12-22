import { IconButton } from '@appquality/unguess-design-system';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';

interface BugsDetailProps {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
}

const BugsDetail = ({ isDetailOpen, setIsDetailOpen }: BugsDetailProps) => (
  <>
    BugsDetail {isDetailOpen ? 'open' : 'closed'}
    <IconButton
      onClick={() => {
        setIsDetailOpen(false);
      }}
    >
      <CloseIcon />
    </IconButton>
  </>
);

export default BugsDetail;
