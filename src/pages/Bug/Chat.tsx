import {
  Button,
  Chat,
  Comment,
  Skeleton,
  useChatContext,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
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

const ButtonsContainer = styled.div`
  padding: 0px 16px;
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;
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
  max-height: 30vh;
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
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const openModal = (commentId: string) => {
    setIsModalOpen(true);
    setCommentToDelete(commentId);
  };
  const {
    data: comments,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidBugsAndBidCommentsQuery({
    cid: campaignId,
    bid: bugId,
  });
  const [deleteComment] =
    useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation();

  const handleSendComment = () => {
    if (!editor?.isEmpty) {
      triggerSave();
      setIsSubmitting(true);
    }
    setIsSubmitting(false);
  };

  const deleteCommentHandler = async (commentId: string) => {
    await deleteComment({
      cid: campaignId ? campaignId.toString() : '',
      bid: bugId ? bugId.toString() : '',
      cmid: commentId,
      body: {},
    });
  };

  useEffect(() => {
    const scrollToLastComment = setTimeout(() => {
      const c = commentsContainerRef.current;
      if (c) {
        c.scroll({
          top: c.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);

    return () => {
      clearTimeout(scrollToLastComment);
    };
  }, [comments]);

  return (
    <>
      <Chat>
        <Chat.Header>{t('__BUG_COMMENTS_CHAT_HEADER__')}</Chat.Header>
        <StyledComments
          id="bug-comments-container"
          chatBkg={`url(${defaultBkg}) repeat center center`}
          key="bug-comments-container"
          ref={commentsContainerRef}
        >
          {isLoading || isFetching ? (
            <Skeleton style={{ borderRadius: 0 }} />
          ) : (
            comments &&
            comments.items.length > 0 && (
              <>
                {comments.items.map((comment) => (
                  <Comment
                    author={{
                      avatar: getInitials(comment.creator.name),
                      name: comment.creator.name,
                      ...(comment.creator.isInternal && {
                        avatarType: 'system',
                      }),
                    }}
                    date={convertToLocalTime(
                      comment.creation_date,
                      currentLanguage
                    )}
                    message={comment.text}
                    key={comment.id}
                    header={{ title: 'Not implemented Title' }}
                  >
                    <>
                      <br />
                      {(comment.creator.id === user.profile_id ||
                        user.role === 'administrator') && (
                        <Button
                          isBasic
                          onClick={() => openModal(`${comment.id}`)}
                        >
                          {t('__BUG_COMMENTS_CHAT_DELETE__')}
                        </Button>
                      )}
                    </>
                  </Comment>
                ))}
              </>
            )
          )}
        </StyledComments>
        <Chat.Input
          hasFloatingMenu
          hasButtonsMenu
          author={{ avatar: getInitials(user.name), name: user.name }}
          placeholderOptions={{
            placeholder: () => t('__BUG_COMMENTS_CHAT_PLACEHOLDER'),
          }}
          i18n={{
            menu: {
              bold: t('__BUG_COMMENTS_CHAT_BOLD'),
              italic: t('__BUG_COMMENTS_CHAT_ITALIC'),
              mention: t('__BUG_COMMENTS_CHAT_MENTION'),
            },
            mention: {
              noResults: t('__BUG_COMMENTS_CHAT_NO_RESULTS'),
            },
          }}
        />
        <Chat.Footer showShortcut saveText={t('__BUG_COMMENTS_CHAT_SAVE_TEXT')}>
          <ButtonsContainer>
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
              onClick={handleSendComment}
            >
              {t('__BUG_COMMENTS_CHAT_CONFIRM__')}
            </Button>
          </ButtonsContainer>
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
