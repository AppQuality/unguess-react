import { useCallback, useState } from 'react';
import { Button, Textarea } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { usePutCampaignsByCidFindingsAndFidMutation } from 'src/features/api';
import { EditorFooter } from '../common';
import { useCommentContext } from '../context/CommentContext';

export const CommentEditor = ({
  id,
  campaignId,
}: {
  id: number;
  campaignId: number;
}) => {
  const { t } = useTranslation();

  const { comment, setComment, setIsEditing } = useCommentContext();
  const [editorContent, setEditorContent] = useState<string>(comment ?? '');
  const [putComment] = usePutCampaignsByCidFindingsAndFidMutation();

  const handleSave = useCallback(async () => {
    await putComment({
      cid: campaignId.toString(),
      fid: id.toString(),
      body: {
        comment: editorContent,
      },
    })
      .unwrap()
      .then(() => {
        setComment(editorContent);
        setIsEditing(false);
      });
  }, [comment, editorContent]);
  return (
    <>
      <Textarea
        key={`editor-insight-${id}`}
        placeholder={t(
          '__CAMPAIGN_PAGE_INSIGHTS_SECTION_COMMENT_CARD_PLACEHOLDER_EMPTY_TEXTAREA'
        )}
        value={editorContent}
        minRows={2}
        maxRows={8}
        onChange={(e) => setEditorContent(e.currentTarget.value)}
        onBlur={(e) => setEditorContent(e.currentTarget.value)}
      />
      <EditorFooter>
        <Button isBasic onClick={() => setIsEditing(false)}>
          {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_COMMENT_CARD_EDITOR_CANCEL')}
        </Button>
        <Button isPrimary isAccent onClick={handleSave}>
          {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_COMMENT_CARD_EDITOR_SAVE')}
        </Button>
      </EditorFooter>
    </>
  );
};
