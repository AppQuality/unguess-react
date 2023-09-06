import { CompactComment } from './parts/Compact';
import { LongComment } from './parts/Long';
import { COMPACT_CHARACTERS_MAX_SIZE } from './common';
import { useCommentContext } from './context/CommentContext';

export const CommentWrapper = (props: {
  id: number;
  campaignId: number;
  value?: string;
}) => {
  const { comment } = useCommentContext();
  const isCompact = !comment || comment.length < COMPACT_CHARACTERS_MAX_SIZE;

  return isCompact ? <CompactComment {...props} /> : <LongComment {...props} />;
};
