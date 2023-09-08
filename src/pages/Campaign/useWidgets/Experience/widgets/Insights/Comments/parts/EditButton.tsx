import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Editcon } from '../assets/notes-stroke.svg';
import { useCommentContext } from '../context/CommentContext';

export const EditButton = () => {
  const { t } = useTranslation();
  const { setIsEditing } = useCommentContext();

  return (
    <Button size="small" isBasic onClick={() => setIsEditing(true)}>
      <Button.StartIcon>
        <Editcon />
      </Button.StartIcon>
      {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_COMMENT_CARD_EDIT_BUTTON')}
    </Button>
  );
};
