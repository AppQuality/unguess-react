import {
  Button,
  Chat,
  Comment,
  LG,
  useChatContext,
} from '@appquality/unguess-design-system';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { get } from 'react-scroll/modules/mixins/scroller';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { BugStateDropdown } from 'src/common/components/BugDetail/BugStateDropdown';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import { Divider } from 'src/common/components/divider';
import { getInitials } from 'src/common/components/navigation/header/utils';
import {
  useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
  useGetCampaignsByCidBugsAndBidQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
} from 'src/features/api';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  height: 100%;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

function convertToLocalTime(utcString: string) {
  const date = new Date(utcString);
  const formattedDate = format(date, 'dd MMM yyyy | HH:mm');
  return formattedDate.toLowerCase();
}

export const Actions = () => {
  const { t } = useTranslation();
  const { campaignId, bugId } = useParams();
  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId ? campaignId.toString() : '',
    bid: bugId ? bugId.toString() : '',
  });
  const { triggerSave, editor } = useChatContext();
  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    isError: isErrorComments,
    refetch: commentsRefetch,
  } = useGetCampaignsByCidBugsAndBidCommentsQuery({
    cid: campaignId ? campaignId.toString() : '',
    bid: bugId ? bugId.toString() : '',
  });
  const [createComment] = usePostCampaignsByCidBugsAndBidCommentsMutation();
  const [deleteComment] =
    useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation();
  const { userData: user } = useAppSelector((state) => state.user);
  const createCommentHandler = async () => {
    if (editor) {
      await createComment({
        cid: campaignId ? campaignId.toString() : '',
        bid: bugId ? bugId.toString() : '',
        body: {
          text: editor.getHTML(),
        },
      });
      commentsRefetch();
    }
  };

  const deleteCommentHandler = async (commentId: string) => {
    await deleteComment({
      cid: campaignId ? campaignId.toString() : '',
      bid: bugId ? bugId.toString() : '',
      cmid: commentId,
      body: {},
    });
    commentsRefetch();
  };

  if (!bug || isLoading || isFetching || isError) return null;
  if (!comments || isLoadingComments || isFetchingComments || isErrorComments)
    return null;

  return (
    <Container>
      <LG isBold>{t('__BUG_PAGE_ACTIONS_TITLE')}</LG>
      <Divider style={{ margin: `${appTheme.space.md} auto` }} />
      <GridWrapper>
        <BugStateDropdown bug={bug} />
        <BugPriority bug={bug} />
      </GridWrapper>
      <BugTags bug={bug} refetchBugTags={refetch} />
      <Divider
        style={{ margin: `${appTheme.space.lg} auto ${appTheme.space.md}` }}
      />
      <Chat>
        <Chat.Header>Titolone</Chat.Header>
        <Chat.Comments>
          {comments.items.map((comment) => (
            <Comment
              author={{ name: getInitials(comment.creator.name), avatar: 'PB' }}
              message={comment.text}
              key={comment.id}
            >
              <>
                {convertToLocalTime(comment.creation_date)}
                <br />
                {(comment.creator.id === user.id ||
                  user.role === 'administrator') && (
                  <Button
                    isBasic
                    onClick={() => deleteCommentHandler(`${comment.id}`)}
                  >
                    Elimina
                  </Button>
                )}
              </>
            </Comment>
          ))}
        </Chat.Comments>
        <Chat.Input author={{ avatar: 'LC' }} onSave={createCommentHandler}>
          default text if needed
        </Chat.Input>
        <Chat.Footer>
          <Button isBasic>Cancel</Button>
          <Button onClick={createCommentHandler}>Save</Button>
        </Chat.Footer>
      </Chat>
    </Container>
  );
};
