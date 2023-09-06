import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CardText, CardTitle } from '../common';
import { useCommentContext } from '../context/CommentContext';
import { CommentEditor } from './Editor';
import { EditButton } from './EditButton';

export const CompactComment = ({
  id,
  campaignId,
  value,
}: {
  id: number;
  campaignId: number;
  value?: string;
}) => {
  const { t } = useTranslation();
  const { comment, setComment, isEditing } = useCommentContext();

  useEffect(() => {
    if (value) setComment(value);
  }, [value]);

  return (
    <>
      <CardTitle isBold>
        {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_COMMENT_CARD_TITLE')}
      </CardTitle>
      {!isEditing && (
        <>
          <CardText>
            {!comment
              ? t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_COMMENT_CARD_PLACEHOLDER')
              : comment}
          </CardText>
          <EditButton />
        </>
      )}

      {isEditing && <CommentEditor id={id} campaignId={campaignId} />}
    </>
  );
};
