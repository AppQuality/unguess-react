import {
  Anchor,
  Label,
  SM,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';

import styled from 'styled-components';
import {
  GetUsersMeWatchedPlansApiResponse,
  useDeletePlansByPidWatchersAndProfileIdMutation,
  useGetUsersMeQuery,
} from 'src/features/api';
import { UnfollowButton } from './UnfollowButton';

const StyledPanelSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

const StyledHintContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const StyledActivityItem = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FollowActivitiesPanel = ({
  followedActivities,
}: {
  followedActivities: GetUsersMeWatchedPlansApiResponse['items'];
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data: userData } = useGetUsersMeQuery();
  const [unfollowPlan] = useDeletePlansByPidWatchersAndProfileIdMutation();
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
        {followedActivities.map((activity) => (
          <StyledActivityItem>
            <div>
              <Anchor href={`/plans/${activity.id}`}>{activity.name}</Anchor>
              <SM>{activity?.project?.name}</SM>
            </div>
            <UnfollowButton
              isDisabled={!!activity.isLast}
              activityId={activity.id ?? 0}
              handleUnfollow={handleUnfollow}
            />
          </StyledActivityItem>
        ))}
      </StyledPanelSectionContainer>
      <StyledHintContainer>
        <InfoIcon />
        <SM>
          {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_HINT_TEXT')}
        </SM>
      </StyledHintContainer>
    </div>
  );
};
