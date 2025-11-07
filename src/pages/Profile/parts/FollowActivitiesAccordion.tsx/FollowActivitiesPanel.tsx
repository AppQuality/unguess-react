import { Anchor, Button, Label, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const StyledPanelCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xxl};
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
    <StyledPanelCardContainer>
      <Label>
        {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_DESCRIPTION')}
      </Label>
      <StyledActivityItem>
        <div>
          <Anchor>Titolo Attivita</Anchor>
          <SM>titolo progetto</SM>
        </div>
        <Button size="small" isBasic>
          {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_BUTTON_TEXT')}
        </Button>
      </StyledActivityItem>
    </StyledPanelCardContainer>
  );
};
