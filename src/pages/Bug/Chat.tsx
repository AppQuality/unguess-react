import {
  Button,
  Chat,
  Comment,
  useChatContext,
} from '@appquality/unguess-design-system';
import defaultBkg from 'src/assets/bg-chat.svg';
import { getInitials } from 'src/common/components/navigation/header/utils';
import { format } from 'date-fns';
import {
  useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
} from 'src/features/api';
import { useAppSelector } from 'src/app/hooks';

function convertToLocalTime(utcString: string) {
  const date = new Date(utcString);
  const formattedDate = format(date, 'dd MMM yyyy | HH:mm');
  return formattedDate.toLowerCase();
}

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
  const { triggerSave } = useChatContext();
  const { userData: user } = useAppSelector((state) => state.user);

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

  return (
    <Chat>
      <Chat.Header>Titolone</Chat.Header>
      <Chat.Comments chatBkg={`url(${defaultBkg}) repeat center center`}>
        {comments &&
          comments.items.length > 0 &&
          comments.items.map((comment) => (
            <Comment
              author={{
                avatar: getInitials(comment.creator.name),
                name: comment.creator.name,
              }}
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
      <Chat.Input
        author={{ avatar: getInitials(user.name), name: user.name }}
      />
      <Chat.Footer>
        <Button isBasic>Cancel</Button>
        <Button
          disabled={isSubmitting}
          onClick={() => {
            triggerSave();
            setIsSubmitting(true);
          }}
        >
          Save
        </Button>
      </Chat.Footer>
    </Chat>
  );
};
