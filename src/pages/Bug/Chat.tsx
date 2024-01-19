import {
  Button,
  Chat,
  Comment,
  useChatContext,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/app/hooks';
import defaultBkg from 'src/assets/bg-chat.svg';
import { getInitials } from 'src/common/components/navigation/header/utils';
import {
  useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
} from 'src/features/api';
import i18n from 'src/i18n';
import { styled } from 'styled-components';
import { DeleteCommentModal } from './DeleteCommentModal';

function convertToLocalTime(utcString: string, locale: string) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;

  const dateTime = new Date(utcString);

  const date = dateTime.toLocaleDateString(locale, options);
  const time = dateTime.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `| ${date} | ${time}`;
}

const StyledComments = styled(Chat.Comments)`
  height: 30vh;
`;

export const ChatBox = ({
  campaignId,
  bugId,
  isSubmitting,
  setIsSubmitting,
}: {
  campaignId: string;
  bugId: string;
  isSubmitting: boolean;
  setIsSubmitting: (state: boolean) => void;
}) => {
  const { triggerSave, editor } = useChatContext();
  const { userData: user } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string>('');
  const currentLanguage = i18n.language === 'it' ? 'it-IT' : 'en-EN';

  const openModal = (commentId: string) => {
    setIsModalOpen(true);
    setCommentToDelete(commentId);
  };
  const { data: comments, refetch: commentsRefetch } =
    useGetCampaignsByCidBugsAndBidCommentsQuery({
      cid: campaignId,
      bid: bugId,
    });

  const [deleteComment] =
    useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation();

  const deleteCommentHandler = async (commentId: string) => {
    await deleteComment({
      cid: campaignId ? campaignId.toString() : '',
      bid: bugId ? bugId.toString() : '',
      cmid: commentId,
      body: {},
    });
    commentsRefetch();
  };

  useEffect(() => {
    if (comments) {
      // Scroll to bottom of chat
      const chat = document.getElementById('bug-comments-container');
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    }
  }, [comments]);
  return (
    <>
      <Chat>
        <Chat.Header>{t('__BUG_COMMENTS_CHAT_HEADER__')}</Chat.Header>
        {comments && comments.items.length > 0 && (
          <StyledComments
            id="bug-comments-container"
            chatBkg={`url(${defaultBkg}) repeat center center`}
          >
            {comments.items.map((comment) => (
              <Comment
                author={{
                  avatar: getInitials(comment.creator.name),
                  name: comment.creator.name,
                }}
                date={convertToLocalTime(
                  comment.creation_date,
                  currentLanguage
                )}
                message={comment.text}
                key={comment.id}
              >
                <>
                  <br />
                  {(comment.creator.id === user.profile_id ||
                    user.role === 'administrator') && (
                    <Button isBasic onClick={() => openModal(`${comment.id}`)}>
                      {t('__BUG_COMMENTS_CHAT_DELETE__')}
                    </Button>
                  )}
                </>
              </Comment>
            ))}
          </StyledComments>
        )}
        <Chat.Input
          hasInlineMenu
          hasButtonsMenu
          author={{ avatar: getInitials(user.name), name: user.name }}
          placeholderOptions={{
            placeholder: () => t('__BUG_COMMENTS_CHAT_PLACEHOLDER'),
          }}
        />
        <Chat.Footer showShortcut>
          <Button
            isBasic
            onClick={() => {
              editor?.commands.clearContent(true);
            }}
          >
            {t('__BUG_COMMENTS_CHAT_CANCEL__')}
          </Button>
          <Button
            isPrimary
            isAccent
            disabled={isSubmitting}
            onClick={() => {
              triggerSave();
              setIsSubmitting(true);
            }}
          >
            {t('__BUG_COMMENTS_CHAT_CONFIRM__')}
          </Button>
        </Chat.Footer>
      </Chat>
      {isModalOpen && (
        <DeleteCommentModal
          setIsModalOpen={setIsModalOpen}
          deleteCommentHandler={deleteCommentHandler}
          deleteCommentId={commentToDelete}
        />
      )}
    </>
  );
};
