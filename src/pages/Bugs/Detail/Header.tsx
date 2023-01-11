import { IconButton, SM } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { Bug } from 'src/features/api';
import {
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Tester = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[700]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Tester>
        ID {bug.id} by {bug.reporter}
      </Tester>
      <IconButton
        onClick={() => {
          dispatch(
            selectBug({
              bug_id: null,
            })
          );
        }}
      >
        <CloseIcon />
      </IconButton>
    </Container>
  );
};
