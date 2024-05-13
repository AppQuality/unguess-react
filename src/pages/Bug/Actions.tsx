import { ChatProvider, LG, Skeleton } from '@appquality/unguess-design-system';
import { FileItem } from '@appquality/unguess-design-system/build/stories/chat/_types';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { BugStateDropdown } from 'src/common/components/BugDetail/BugStateDropdown';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import { Divider } from 'src/common/components/divider';
import {
  PostCampaignsByCidBugsAndBidMediaApiResponse,
  useGetCampaignsByCidBugsAndBidQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
  usePostCampaignsByCidBugsAndBidMediaMutation,
} from 'src/features/api';
import { styled } from 'styled-components';
import { Data } from '@appquality/unguess-design-system/build/stories/chat/context/chatContext';
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

  const [mediaIds, setMediaIds] = useState<
    { id: number; internal_id: string }[]
  >([]);
  const { campaignId, bugId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cid = campaignId ? campaignId.toString() : '';
  const bid = bugId ? bugId.toString() : '';

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

  const [uploadMedia] = usePostCampaignsByCidBugsAndBidMediaMutation();

  const handleMediaUpload = async (files: FileItem[]) =>
    new Promise<Data>((resolve, reject) => {
      let data: PostCampaignsByCidBugsAndBidMediaApiResponse = {};
      files.forEach(async (f) => {
        const formData = new FormData();
        // normalize filename
        const filename = f.name.normalize('NFD').replace(/\s+/g, '-');
        formData.append('media', f, filename);
        try {
          data = await uploadMedia({
            cid,
            bid,
            // @ts-ignore
            body: formData,
          }).unwrap();
          // @ts-ignore
          if (data && data.uploaded_ids) {
            // @ts-ignore
            setMediaIds((prev) => [
              ...prev,
              // @ts-ignore
              { id: data.uploaded_ids[0].id, internal_id: f.internal_id },
            ]);
          }
          resolve(data);
        } catch (e) {
          console.warn('upload failed', e);
          reject(data);
        }
      });
    });
  //
  //

  // return data;

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
            ...(mediaIds.length > 0 && {
              media_id: mediaIds.map((media) => ({
                id: media.id,
              })),
            }),
          },
        })
          .unwrap()
          .then(() => {
            setIsSubmitting(false);
            setMediaIds([]);
          })
          .catch(() => {
            setIsSubmitting(false);
          });
      }
    },
    [cid, bid, bug, mediaIds]
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
      <ChatProvider
        onSave={createCommentHandler}
        setMentionableUsers={mentionableUsers}
        onFileUpload={async (files: FileItem[]) => handleMediaUpload(files)}
        onDeleteThumbnail={(id) => {
          setMediaIds((prev) =>
            prev.filter((media) => media.internal_id !== id)
          );
        }}
      >
        <Divider style={{ margin: `${appTheme.space.md} auto` }} />
        {isFetchingUsers || isLoadingUsers ? (
          <Skeleton style={{ borderRadius: 0 }} />
        ) : (
          <ChatBox
            campaignId={cid}
            bugId={bid}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        )}
      </ChatProvider>
    </Container>
  );
};
