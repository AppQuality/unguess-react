import {
  ChatProvider,
  LG,
  Notification,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import ChangeStatusDropdown from 'src/common/components/BugDetail/BugStateSelect/ChangeStatusDropdown';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import { Divider } from 'src/common/components/divider';
import {
  PostCampaignsByCidBugsAndBidMediaApiResponse,
  useDeleteMediaCommentByMcidMutation,
  useGetCampaignsByCidBugsAndBidQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
  usePostCampaignsByCidBugsAndBidMediaMutation,
} from 'src/features/api';
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

  const [deleteMediaComment] = useDeleteMediaCommentByMcidMutation();

  const { addToast } = useToast();

  interface MyFormData extends FormData {
    media: string | string[];
  }

  const handleMediaUpload = (files: (File & { id: string })[]) =>
    new Promise<PostCampaignsByCidBugsAndBidMediaApiResponse>(
      (resolve, reject) => {
        let data: PostCampaignsByCidBugsAndBidMediaApiResponse = {};
        files.forEach(async (f) => {
          const formData: MyFormData = new FormData() as MyFormData;
          // normalize filename
          const filename = f.name.normalize('NFD').replace(/\s+/g, '-');
          formData.append('media', f, filename);
          try {
            data = await uploadMedia({
              cid,
              bid,
              body: formData,
            }).unwrap();
            if (
              data &&
              'uploaded_ids' in data &&
              typeof data.uploaded_ids !== 'undefined' &&
              typeof data.uploaded_ids !== 'string'
            ) {
              const newIds = data.uploaded_ids.map((uploaded) => ({
                id: uploaded.id,
                internal_id: f.id,
              }));
              setMediaIds((prev) => [...prev, ...newIds]);
            }
            resolve(data);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error upload failed: ', e);
            reject(data);
          }
        });
      }
    );

  // return data;

  const handleDeleteMediaComment = (mcid: string) => {
    deleteMediaComment({ mcid })
      .unwrap()
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={e.message ? e.message : 'Error while deleting media'}
              closeText="X"
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  const createCommentHandler = useCallback(
    (editor: any, mentions: any) => {
      if (editor) {
        createComment({
          cid,
          bid,
          body: {
            text: editor.getHTML(),
            ...(mentions &&
              mentions.length > 0 && {
                mentioned: mentions.map((mention: { id: any }) => ({
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
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error('Error creating comment: ', e);
          })
          .finally(() => {
            setIsSubmitting(false);
            setMediaIds([]);
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
            <ChangeStatusDropdown
              currentStatusId={bug.custom_status.id}
              campaignId={cid}
              bugId={bid}
            />
            <BugPriority bug={bug} />
          </GridWrapper>
          <BugTags bug={bug} refetchBugTags={refetch} />
        </>
      )}
      <ChatProvider
        onSave={createCommentHandler}
        setMentionableUsers={mentionableUsers}
        onFileUpload={handleMediaUpload}
        onDeleteThumbnail={(internalId) => {
          setMediaIds((prev) =>
            prev.filter((media) => media.internal_id !== internalId)
          );
          const mediaToDelete = mediaIds.find(
            (media) => media.internal_id === internalId
          );
          if (mediaToDelete)
            handleDeleteMediaComment(mediaToDelete.id.toString());
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
