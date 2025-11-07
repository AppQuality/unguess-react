import {
  Anchor,
  Button,
  Hint,
  Label,
  SM,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';

import styled from 'styled-components';

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

export const FollowActivitiesPanel = () => {
  const { t } = useTranslation();
  return (
    <div>
      <StyledPanelSectionContainer>
        <Label>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_SETUP_DESCRIPTION'
          )}
          (3)
        </Label>
        <StyledActivityItem>
          <div>
            <Anchor>Titolo Attivita</Anchor>
            <SM>titolo progetto</SM>
          </div>
          <Button size="small" isBasic>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_BUTTON_TEXT'
            )}
          </Button>
        </StyledActivityItem>
      </StyledPanelSectionContainer>
      <StyledPanelSectionContainer>
        <Label>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_PROGRESS_DESCRIPTION'
          )}
          (3)
        </Label>
        <StyledActivityItem>
          <div>
            <Anchor>Titolo Attivita</Anchor>
            <SM>titolo progetto</SM>
          </div>
          <Button size="small" isBasic>
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
