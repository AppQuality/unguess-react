import { IconButton } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';

const BugsDetail = () => {
  const dispatch = useAppDispatch();
  const currentBugId = getSelectedBugId();
  return (
    <>
      BugsDetail. Current bug id: {currentBugId}{' '}
      {currentBugId ? 'open' : 'closed'}
      <IconButton onClick={() => dispatch(selectBug({ bug_id: null }))}>
        <CloseIcon />
      </IconButton>
    </>
  );
};

export { BugsDetail };
