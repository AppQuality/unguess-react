import { ChatProvider, LG, Skeleton } from '@appquality/unguess-design-system';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { BugStateDropdown } from 'src/common/components/BugDetail/BugStateDropdown';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import { Divider } from 'src/common/components/divider';
import {
  useGetCampaignsByCidBugsAndBidQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
} from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { styled } from 'styled-components';
import { ChatBox } from './Chat';
import { useGetMentionableUsers } from './hooks/getMentionableUsers';

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
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.md};
  overflow-y: auto;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const Actions = () => {
  const {
    items: users,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useGetMentionableUsers();
  const { t } = useTranslation();

  const mentionableUsers = useCallback(
    ({ query }: { query: string }) => {
      const mentions = users.filter((user) => {
        if (!query) return user;
        return (
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );
      });
      return mentions.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
    },
    [users]
  );

  const { campaignId, bugId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cid = campaignId ? campaignId.toString() : '';
  const bid = bugId ? bugId.toString() : '';
  const { hasFeatureFlag } = useFeatureFlag();

  const canAccessComments = hasFeatureFlag('bug-comments');

  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid,
    bid,
  });
  const [createComment] = usePostCampaignsByCidBugsAndBidCommentsMutation();

  const createCommentHandler = useCallback(
    (editor, mentions) => {
      if (editor) {
        createComment({
          cid,
          bid,
          body: {
            text: editor.getHTML(),
            ...(mentions &&
              mentions.length > 0 && {
                mentioned: mentions.map((mention: any) => ({
                  id: mention.id,
                })),
              }),
          },
        })
          .unwrap()
          .then(() => {
            setIsSubmitting(false);
          })
          .catch(() => {
            setIsSubmitting(false);
          });
      }
    },
    [cid, bid, bug]
  );

  if (!bug || isError) return null;

  return (
    <Container>
      <LG isBold>{t('__BUG_PAGE_ACTIONS_TITLE')}</LG>
      <Divider style={{ margin: `${appTheme.space.md} auto` }} />
      {isLoading || isFetching ? (
        <Skeleton />
      ) : (
        <>
          <GridWrapper>
            <BugStateDropdown bug={bug} />
            <BugPriority bug={bug} />
          </GridWrapper>
          <BugTags bug={bug} refetchBugTags={refetch} />
        </>
      )}
      {canAccessComments && (
        <ChatProvider
          onSave={createCommentHandler}
          setMentionableUsers={mentionableUsers}
        >
          <Divider style={{ margin: `${appTheme.space.md} auto` }} />
          {isFetchingUsers || isLoadingUsers ? (
            <Skeleton />
          ) : (
            <ChatBox
              campaignId={cid}
              bugId={bid}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          )}
        </ChatProvider>
      )}
    </Container>
  );
};
