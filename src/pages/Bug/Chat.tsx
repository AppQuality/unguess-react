import {
  Button,
  Chat,
  Comment,
  useChatContext,
} from '@appquality/unguess-design-system';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAppSelector } from 'src/app/hooks';
import defaultBkg from 'src/assets/bg-chat.svg';
import { getInitials } from 'src/common/components/navigation/header/utils';
import {
  useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
} from 'src/features/api';
import { DeleteCommentModal } from './DeleteCommentModal';

function convertToLocalTime(utcString: string) {
  const date = new Date(utcString);
  const formattedDate = format(date, ' | dd MMM yyyy | HH:mm');
  return formattedDate.toLowerCase();
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
        <Chat.Header>Titolone</Chat.Header>
        <StyledComments
          id="bug-comments-container"
          chatBkg={`url(${defaultBkg}) repeat center center`}
        >
          {comments &&
            comments.items.length > 0 &&
            comments.items.map((comment) => (
              <Comment
                author={{
                  avatar: getInitials(comment.creator.name),
                  name: comment.creator.name,
                }}
                date={convertToLocalTime(comment.creation_date)}
                message={comment.text}
                key={comment.id}
              >
                <>
                  <br />
                  {(comment.creator.id === user.id ||
                    user.role === 'administrator') && (
                    <Button isBasic onClick={() => openModal(`${comment.id}`)}>
                      Elimina
                    </Button>
                  )}
                </>
              </Comment>
            ))}
        </StyledComments>
        <Chat.Input
          author={{ avatar: getInitials(user.name), name: user.name }}
        />
        <Chat.Footer>
          <Button
            isBasic
            onClick={() => {
              editor?.commands.clearContent(true);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            isAccent
            isPrimary
            onClick={() => {
              triggerSave();
              setIsSubmitting(true);
            }}
          >
            Save
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