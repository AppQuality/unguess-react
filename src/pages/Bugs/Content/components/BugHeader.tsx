import { IconButton, Tooltip, Tag } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { ReactComponent as SpeechBubble } from 'src/assets/icons/speech-bubble-fill.svg';
import {
  Bug,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
} from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import { Link, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  padding: 0 ${appTheme.space.lg};
  padding-top: ${appTheme.space.lg};
  position: sticky;
  top: 0;
  background-color: white;
  width: 100%;
  z-index: ${appTheme.levels.front};
`;

const ActionDetailPreview = styled.div`
  margin-left: auto;
  display: flex;
`;

const CommentsIconContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: ${appTheme.space.xxs};
`;

const CommentsBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -${appTheme.space.xxs};
  right: -${appTheme.space.xs};
  background-color: ${appTheme.palette.azure[600]};
  color: ${appTheme.palette.white};
  width: ${appTheme.space.md};
  height: ${appTheme.space.sm};
  border: 1px solid ${appTheme.palette.white};
  font-size: ${appTheme.fontSizes.xs};
  border-radius: ${appTheme.borderRadii.lg};
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => {
  const dispatch = useAppDispatch();
  const { campaignId } = useParams();
  const { t } = useTranslation();

  const { data: comments } = useGetCampaignsByCidBugsAndBidCommentsQuery({
    cid: campaignId ?? '',
    bid: `${bug.id}`,
  });
  return (
    <Container>
      <Tag
        isPill={false}
        isRegular
        hue="rgba(0,0,0,0)"
        style={{ paddingTop: `${appTheme.space.base}px` }}
      >
        {!bug.duplicated_of_id && (
          <Tag.Avatar>
            <FatherIcon
              style={{
                color: appTheme.palette.grey[500],
                marginRight: appTheme.space.xxs,
              }}
            />
          </Tag.Avatar>
        )}
        ID
        <Tag.SecondaryText isBold>{bug.id}</Tag.SecondaryText>
      </Tag>
      <ActionDetailPreview>
        <Link
          to={useLocalizeRoute(`campaigns/${bug.campaign_id}/bugs/${bug.id}`)}
        >
          <Tooltip
            content={
              comments && comments.items.length > 0
                ? t('__BUGS_PAGE_VIEW_BUG_COMMENTS_TOOLTIP', {
                    count: comments?.items.length,
                  })
                : t('__BUGS_PAGE_VIEW_BUG_COMMENTS_TOOLTIP_EMPTY')
            }
            size="large"
            type="light"
            placement="auto"
          >
            <IconButton size="medium" className="bug-detail-go-to-bug-link">
              <CommentsIconContainer>
                <SpeechBubble />
                {comments?.items && comments.items.length > 0 && (
                  <CommentsBadge>
                    {comments?.items.length < 10
                      ? comments?.items.length
                      : '9+'}
                  </CommentsBadge>
                )}
              </CommentsIconContainer>
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={useLocalizeRoute(`campaigns/${bug.campaign_id}/bugs/${bug.id}`)}
        >
          <Tooltip
            content={t('__BUGS_PAGE_VIEW_BUG_TOOLTIP')}
            size="large"
            type="light"
            placement="auto"
          >
            <IconButton size="small" className="bug-detail-go-to-bug-link">
              <LinkIcon />
            </IconButton>
          </Tooltip>
        </Link>

        <ShareButton bug={bug} />

        <Tooltip
          content={t('__BUGS_PAGE_CLOSE_DETAILS_TOOLTIP')}
          size="large"
          type="light"
          placement="auto"
        >
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                selectBug({
                  bug_id: undefined,
                })
              );
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </ActionDetailPreview>
    </Container>
  );
};
