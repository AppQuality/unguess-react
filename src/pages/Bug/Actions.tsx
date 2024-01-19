import { ChatProvider, LG } from '@appquality/unguess-design-system';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { appTheme } from 'src/app/theme';
import { BugStateDropdown } from 'src/common/components/BugDetail/BugStateDropdown';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import { Divider } from 'src/common/components/divider';
import {
  useGetCampaignsByCidBugsAndBidCommentsQuery,
  useGetCampaignsByCidBugsAndBidQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
} from 'src/features/api';
import { styled } from 'styled-components';
import { ChatBox } from './Chat';
import { getMentionableUsers } from './hooks/getMentionableUsers';

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
  const { t } = useTranslation();
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
  const {
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    isError: isErrorComments,
  } = useGetCampaignsByCidBugsAndBidCommentsQuery({
    cid,
    bid,
  });

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
                mentions: mentions.map((mention: any) => ({
                  id: mention.id,
                })),
              }),
          },
        })
          .unwrap()
          .then(() => {
            setIsSubmitting(false);
          });
      }
    },
    [cid, bid, bug]
  );

  if (!bug || isLoading || isFetching || isError) return null;
  if (isLoadingComments || isFetchingComments || isErrorComments) return null;

  return (
    <Container>
      <LG isBold>{t('__BUG_PAGE_ACTIONS_TITLE')}</LG>
      <Divider style={{ margin: `${appTheme.space.md} auto` }} />
      <GridWrapper>
        <BugStateDropdown bug={bug} />
        <BugPriority bug={bug} />
      </GridWrapper>
      <BugTags bug={bug} refetchBugTags={refetch} />
      {canAccessComments && (
        <ChatProvider
          onSave={createCommentHandler}
          setMentionableUsers={getMentionableUsers}
        >
          <Divider style={{ margin: `${appTheme.space.md} auto` }} />
          <ChatBox
            campaignId={cid}
            bugId={bid}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </ChatProvider>
      )}
    </Container>
  );
};
