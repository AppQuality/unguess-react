import {
  Anchor,
  Button,
  Hint,
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
} from 'src/features/api';

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

  const [unfollowPlan] = useDeletePlansByPidWatchersAndProfileIdMutation();

  const handleUnfollow = async (planId: number) => {
    try {
      await unfollowPlan({ pid: planId.toString(), profileId: '25' }).unwrap();

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
        <StyledActivityItem>
          <div>
            <Anchor>Titolo Attivita</Anchor>
            <SM>titolo progetto</SM>
          </div>
          <Button size="small" isBasic onClick={() => handleUnfollow(123)}>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_BUTTON_TEXT'
            )}
          </Button>
        </StyledActivityItem>
      </StyledPanelSectionContainer>
      <StyledHintContainer>
        <InfoIcon />
        <Hint>
          {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_HINT_TEXT')}
        </Hint>
      </StyledHintContainer>
    </div>
  );
};
