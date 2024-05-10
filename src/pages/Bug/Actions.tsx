import {
  ChatProvider,
  LG,
  Skeleton,
  useChatContext,
} from '@appquality/unguess-design-system';
import { FileItem } from '@appquality/unguess-design-system/build/stories/chat/_types';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const [mediaIds, setMediaIds] = useState<{ id: number }[]>([]);
  const { campaignId, bugId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaIdMap, setMediaIdMap] = useState<FileItem[]>([]);

  const fileMap: Map<number, File> = new Map();

  const cid = campaignId ? campaignId.toString() : '';
  const bid = bugId ? bugId.toString() : '';

  useMemo(() => {
    console.log('mediaidmap', mediaIdMap[0]);
    console.log('mediaids', mediaIds);
  }, [mediaIdMap, mediaIds]);

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

  /*

[
  {key: numeroMediaDB, nomefile: nomedelFile},
  {key: numeroMediaDB2, nomefile: nome2delFile},
]


  */

  const handleMediaUpload = async (files: FileItem[]) => {
    let data: PostCampaignsByCidBugsAndBidMediaApiResponse = {};
    files.forEach(async (f) => {
      const formData = new FormData();
      console.log('f', f);
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
        // console.log('data', data);
        // @ts-ignore
        if (data && data.uploaded_ids) {
          console.log('data', data);
          // @ts-ignore
          setMediaIds((prev) => [
            ...prev,
            // @ts-ignore
            { id: data.uploaded_ids[0].id },
          ]);

          fileMap.set(data.uploaded_ids[0].id, f);
          console.log('fileMap', fileMap);

          setMediaIdMap((prev) => [
            ...prev,
            {
              ...(f as File),
              // @ts-ignore
              id: data.uploaded_ids[0].id,
            } as FileItem,
          ]);
        }
      } catch (e) {
        console.warn('upload failed', e);
      }
    });

    return data;
  };

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
        onFileUpload={(files) => handleMediaUpload(files)}
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
