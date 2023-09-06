import { useEffect, useState } from 'react';
import { Anchor } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CardText, CardTitle, COMPACT_CHARACTERS_MAX_SIZE } from '../common';
import { useCommentContext } from '../context/CommentContext';
import { CommentEditor } from './Editor';
import { EditButton } from './EditButton';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LongComment = ({
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
            {!isExpanded
              ? `${comment.substring(0, COMPACT_CHARACTERS_MAX_SIZE)}...`
              : comment}
          </CardText>
          <ButtonContainer>
            <Anchor
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ fontSize: '12px' }}
            >
              {isExpanded
                ? t('__CAMPAIGN_PAGE_INSIGHT_COMMENT_SHOW_LESS')
                : t('__CAMPAIGN_PAGE_INSIGHT_COMMENT_SHOW_MORE')}
            </Anchor>
            {isExpanded && <EditButton />}
          </ButtonContainer>
        </>
      )}

      {isEditing && <CommentEditor id={id} campaignId={campaignId} />}
    </>
  );
};
