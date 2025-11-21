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
  GetUsersMeWatchedPlansApiResponse,
  useDeletePlansByPidWatchersAndProfileIdMutation,
  useGetUsersMeQuery,
} from 'src/features/api';
import { UnfollowButton } from './UnfollowButton';
import { StyledActivityItem, StyledPanelSectionContainer } from './components';

export const FollowActivitiesPanel = ({
  followedActivities,
}: {
  followedActivities: GetUsersMeWatchedPlansApiResponse['items'];
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data: userData } = useGetUsersMeQuery();
  const [unfollowPlan] = useDeletePlansByPidWatchersAndProfileIdMutation();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedActivities = isExpanded
    ? followedActivities
    : followedActivities.slice(0, 3);
  const hasMore = followedActivities.length > 3;
  const remainingCount = followedActivities.length - 3;

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
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_SETUP_DESCRIPTION'
          )}
          {`(${followedActivities.length})`}
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
