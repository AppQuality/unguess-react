import {
  IconButton,
  SM,
  Span,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as FatherIcon } from 'src/assets/icons/father-icon.svg';
import { Bug } from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import { Link } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  padding: 0 ${globalTheme.space.lg};
  padding-top: ${globalTheme.space.lg};
  position: sticky;
  top: 0;
  background-color: white;
  width: 100%;
  z-index: ${globalTheme.levels.front};
`;

const ActionDetailPreview = styled.div`
  margin-left: auto;
`;

const Info = styled(SM)`
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
      {!bug.duplicated_of_id && (
        <FatherIcon
          style={{
            color: globalTheme.palette.grey[500],
            marginRight: globalTheme.space.xxs,
          }}
        />
      )}
      <Info>
        ID <Span isBold>{bug.id}</Span>
      </Info>
      <ActionDetailPreview>
        <Link
          to={useLocalizeRoute(`campaigns/${bug.campaign_id}/bugs/${bug.id}`)}
        >
          <IconButton size="small">
            <LinkIcon />
          </IconButton>
        </Link>
        <ShareButton bug={bug} />
        <IconButton
          size="small"
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
      </ActionDetailPreview>
    </Container>
  );
};
