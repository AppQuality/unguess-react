import {
  Anchor,
  Label,
  SM,
  useToast,
  Notification,
  Button,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronDown } from 'src/assets/icons/chevron-down-stroke.svg';
import { ReactComponent as ChevronUp } from 'src/assets/icons/chevron-up-stroke.svg';
import { appTheme } from 'src/app/theme';

import {
  GetUsersMeWatchedCampaignsApiResponse,
  useDeletePlansByPidWatchersAndProfileIdMutation,
  useGetUsersMeQuery,
} from 'src/features/api';
import { UnfollowButton } from './UnfollowButton';
import { StyledActivityItem, StyledPanelSectionContainer } from './components';

export const FollowCampaignActivitiesPanel = ({
  followedCampaigns,
}: {
  followedCampaigns: GetUsersMeWatchedCampaignsApiResponse['items'];
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data: userData } = useGetUsersMeQuery();
  const [unfollowPlan] = useDeletePlansByPidWatchersAndProfileIdMutation();
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

  const handleUnfollow = async (planId: number) => {
    try {
      await unfollowPlan({
        pid: planId.toString(),
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
              <Anchor href={`/plans/${activity.id}`}>
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
                <ChevronUp /> <SM>{t('View Less')}</SM>
              </>
            ) : (
              <>
                <ChevronDown />{' '}
                <SM>
                  {t('View More')} ({remainingCount})
                </SM>
              </>
            )}
          </Button>
        )}
      </StyledPanelSectionContainer>
    </div>
  );
};
