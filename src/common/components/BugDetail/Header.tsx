import { IconButton, SM, Span } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { Bug } from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ShareButton } from './ShareBug';

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
  isPreview,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
  isPreview?: boolean;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Tester>
        <Trans i18nKey="__BUGS_PAGE_DETAIL_HEADER">
          ID <Span isBold>{{ bug_id: bug.id }}</Span> by{' '}
          {{ reporter_name: bug.reporter.name }} (T
          {{ reporter_id: bug.reporter.tester_id }})
        </Trans>
      </Tester>
      {isPreview && (
        <div>
          <ShareButton bug={bug} />
          <IconButton
            onClick={() => {
              dispatch(
                selectBug({
                  bug_id: undefined,
                })
              );
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </Container>
  );
};
