import {
  IconButton,
  Skeleton,
  SM,
  Span,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as FatherIcon } from 'src/assets/icons/father-icon.svg';
import { Bug } from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import { getLocalizedBugUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { useSiblings } from './BugDuplicates/useSiblings';
import { ShareButton } from './ShareBug';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Tester = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;
const ActionDetailPreview = styled.div`
  margin-left: auto;
`;
export default ({
  campaignId,
  bug,
  isPreview,
}: {
  campaignId: number;
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
  isPreview?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const {
    data: siblings,
    isLoading,
    isFetching,
    isError,
  } = useSiblings({ cid: campaignId });

  const goToBug = () => {
    window.location.href = getLocalizedBugUrl(
      bug.campaign_id,
      bug.id,
      i18n.language
    );
  };
  // console.log(siblings, isLoading, isFetching, isError)

  if (isLoading || isFetching) return <Skeleton height="20px" />;
  return (
    <Container>
      {!siblings?.father && (
        <FatherIcon
          style={{
            color: globalTheme.palette.grey[500],
            marginRight: globalTheme.space.xxs,
          }}
        />
      )}
      <Tester>
        <Trans i18nKey="__BUGS_PAGE_DETAIL_HEADER">
          ID <Span isBold>{{ bug_id: bug.id }}</Span> by{' '}
          {{ reporter_name: bug.reporter.name }} (T
          {{ reporter_id: bug.reporter.tester_id }})
        </Trans>
      </Tester>
      {isPreview && (
        <ActionDetailPreview>
          <IconButton onClick={goToBug}>
            <LinkIcon />
          </IconButton>
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
        </ActionDetailPreview>
      )}
    </Container>
  );
};
