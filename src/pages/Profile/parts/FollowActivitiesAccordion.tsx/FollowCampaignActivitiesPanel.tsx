import {
  Anchor,
  Button,
  Label,
  Notification,
  SM,
  useToast,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ChevronDown } from 'src/assets/icons/chevron-down-stroke.svg';
import { ReactComponent as ChevronUp } from 'src/assets/icons/chevron-up-stroke.svg';

import {
  GetUsersMeWatchedCampaignsApiResponse,
  useDeleteCampaignsByCidWatchersAndProfileIdMutation,
  useGetUsersMeQuery,
} from 'src/features/api';
import { StyledActivityItem, StyledPanelSectionContainer } from './components';
import { UnfollowButton } from './UnfollowButton';

export const FollowCampaignActivitiesPanel = ({
  followedCampaigns,
}: {
  followedCampaigns: GetUsersMeWatchedCampaignsApiResponse['items'];
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data: userData } = useGetUsersMeQuery();
  const [unfollowCampaign] =
    useDeleteCampaignsByCidWatchersAndProfileIdMutation();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedActivities = isExpanded
    ? followedCampaigns
    : followedCampaigns.slice(0, 3);
  const hasMore = followedCampaigns.length > 3;
  const remainingCount = followedCampaigns.length - 3;

  const truncateName = (
    name: string | undefined,
    maxLength: number = 40
  ): string => {
    if (!name) return '';
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  const handleUnfollow = async (campaignId: number) => {
    try {
      await unfollowCampaign({
        cid: campaignId.toString(),
        profileId: userData?.profile_id.toString() ?? '',
      }).unwrap();

      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__PROFILE_PAGE_UNFOLLOW_SUCCESS')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    } catch (error) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={t('__PROFILE_PAGE_UNFOLLOW_ERROR')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    }
  };

  return (
    <div>
      <StyledPanelSectionContainer>
        <Label>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_PROGRESS_DESCRIPTION'
          )}
          {`(${followedCampaigns.length})`}
        </Label>
        {displayedActivities.map((activity) => (
          <StyledActivityItem key={activity.id}>
            <div>
              <Anchor href={`/campaigns/${activity.id}`}>
                {truncateName(activity?.name)}
              </Anchor>
              <SM>{activity?.project?.name}</SM>
            </div>
            <UnfollowButton
              isDisabled={!!activity.isLast}
              activityId={activity.id ?? 0}
              handleUnfollow={handleUnfollow}
            />
          </StyledActivityItem>
        ))}
        {hasMore && (
          <Button
            isLink
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              marginTop: '8px',
              alignSelf: 'flex-end',
              alignItems: 'center',
              display: 'flex',
              gap: appTheme.space.xxs,
            }}
          >
            {isExpanded ? (
              <>
                <ChevronUp /> <SM>{t('_PROFILE_PAGE_VIEW_LESS')}</SM>
              </>
            ) : (
              <>
                <ChevronDown />{' '}
                <SM>
                  {t('_PROFILE_PAGE_VIEW_MORE')} ({remainingCount})
                </SM>
              </>
            )}
          </Button>
        )}
      </StyledPanelSectionContainer>
    </div>
  );
};
