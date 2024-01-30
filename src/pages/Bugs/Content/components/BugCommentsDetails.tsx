import { Button, LG, Paragraph } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ExistingComments } from 'src/assets/existing-comments.svg';
import { ReactComponent as EmptyComments } from 'src/assets/empty-comments.svg';
import { ReactComponent as CommentsIcon } from 'src/assets/icons/speech-bubble-plain-stroke.svg';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > svg {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const CommentsCountBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  background-color: ${({ theme }) => theme.palette.azure[600]};
  color: ${({ theme }) => theme.palette.white};
  margin-right: ${({ theme }) => theme.space.md};
  min-width: 22px;
  height: 14px;
  font-size: ${appTheme.fontSizes.xs};
  border-radius: ${appTheme.borderRadii.lg};
`;

const CommentsDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

export const BugCommentsDetail = ({
  commentsCount,
  bugId,
  campaignId,
}: {
  commentsCount: number;
  bugId: number;
  campaignId: number;
}) => {
  const { t } = useTranslation();
  return (
    <Container id="bug-preview-comments">
      <Title>
        <CommentsIcon
          style={{
            marginRight: appTheme.space.base * 3,
            marginTop: appTheme.space.base,
          }}
        />
        <LG
          isBold
          style={{
            margin: `${appTheme.space.md} 0`,
            width: '100%',
          }}
        >
          {t('__BUGS_PAGE_BUG_COMMENTS_TITLE')}
        </LG>
        {commentsCount > 0 && (
          <CommentsCountBadge>
            {commentsCount > 9 ? '9+' : commentsCount}
          </CommentsCountBadge>
        )}
      </Title>
      <CommentsDetailContent>
        <Paragraph
          style={{
            color: appTheme.palette.grey[700],
          }}
        >
          {commentsCount > 0
            ? t('__BUGS_PAGE_BUG_COMMENTS_EXISITING_TEXT')
            : t('__BUGS_PAGE_BUG_COMMENTS_EMPTY_TEXT')}
        </Paragraph>
        {commentsCount > 0 ? <ExistingComments /> : <EmptyComments />}

        <Link to={useLocalizeRoute(`campaigns/${campaignId}/bugs/${bugId}`)}>
          <Button isPrimary isAccent>
            {commentsCount > 0
              ? t('__BUG_PAGE_BUG_COMMENTS_BUTTON_TEXT_EXISTING')
              : t('__BUG_PAGE_BUG_COMMENTS_BUTTON_TEXT_EMPTY')}
          </Button>
        </Link>
      </CommentsDetailContent>
    </Container>
  );
};
