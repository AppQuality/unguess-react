/* eslint-disable security/detect-object-injection */
import { IconButton, Tag, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as SpeechBubble } from 'src/assets/icons/speech-bubble-fill.svg';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import {
  Bug,
  GetCampaignsByCidBugsAndBidCommentsApiResponse,
} from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

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
  z-index: ${({ theme }) => theme.levels.front};
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
`;

const CommentsBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -${appTheme.space.xxs};
  right: -${appTheme.space.xxs};
  background-color: ${appTheme.palette.azure[600]};
  color: ${appTheme.palette.white};
  width: 16px;
  height: ${appTheme.space.sm};
  border: 1px solid ${appTheme.palette.white};
  font-size: 8px;
  border-radius: ${appTheme.borderRadii.lg};
  z-index: 2;
`;

export default ({
  bug,
  comments,
  searchParams,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
  comments: GetCampaignsByCidBugsAndBidCommentsApiResponse | undefined;
  searchParams: URLSearchParams;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
          to={`${useLocalizeRoute(
            `campaigns/${bug.campaign_id}/bugs/${bug.id}`
          )}?${searchParams.toString()}`}
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
            <IconButton size="small" className="bug-detail-go-to-bug-link">
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
          to={`${useLocalizeRoute(
            `campaigns/${bug.campaign_id}/bugs/${bug.id}`
          )}?${searchParams.toString()}`}
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
