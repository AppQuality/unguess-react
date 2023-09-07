import { useTranslation } from 'react-i18next';
import { CardText, CardTitle } from '../common';
import { useCommentContext } from '../context/CommentContext';
import { CommentEditor } from './Editor';
import { EditButton } from './EditButton';

export const CompactComment = ({
  id,
  campaignId,
}: {
  id: number;
  campaignId: number;
}) => {
  const { t } = useTranslation();
  const { comment, isEditing } = useCommentContext();

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
