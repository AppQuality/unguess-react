import {
  IconButton,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as FatherIcon } from 'src/assets/icons/father-icon.svg';
import { Bug } from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import { getLocalizedBugUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import TesterDetail from 'src/common/components/BugDetail/TesterDetail';

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

  const goToBug = () => {
    window.location.href = getLocalizedBugUrl(
      bug.campaign_id,
      bug.id,
      i18n.language
    );
  };

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
      <TesterDetail
        bugId={bug.id}
        testerName={bug.reporter.name}
        testerId={bug.reporter.tester_id}
      />

      <ActionDetailPreview>
        <IconButton onClick={goToBug}>
          <LinkIcon />
        </IconButton>
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
