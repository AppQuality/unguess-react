import { IconButton, SM, Span } from '@appquality/unguess-design-system';
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
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Tester = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
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
      ID <Span isBold>{bug.id}</Span> by {bug.reporter.name} (T
      {bug.reporter.tester_id})
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
)};
