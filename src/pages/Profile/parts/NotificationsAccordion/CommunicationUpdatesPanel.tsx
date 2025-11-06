import {
  Alert,
  Checkbox,
  FormField,
  Hint,
  Label,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const StyledPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const StyledCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const CommunicationUpdatesPanel = () => {
  const { t } = useTranslation();
  return (
    <StyledPanelContainer>
      <StyledCheckBoxContainer>
        <Label>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_UPDATES_FORM_LABEL'
          )}
        </Label>

        <FormField>
          <Checkbox
            role="checkbox"
            key="all"
            name="activitySetupUpdates"
            onChange={() => {}}
          >
            <Label>
              {t(
                '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_SETUP_CHECKBOX_LABEL'
              )}
            </Label>
            <Hint>
              {t(
                '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_SETUP_CHECKBOX_HINT'
              )}
            </Hint>
          </Checkbox>
        </FormField>
        <FormField>
          <Checkbox
            role="checkbox"
            key="all"
            name="activityProgress"
            onChange={() => {}}
          >
            <Label>
              {t(
                '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_CHECKBOX_LABEL'
              )}
            </Label>
            <Hint>
              {t(
                '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_CHECKBOX_HINT'
              )}
            </Hint>
          </Checkbox>
        </FormField>
      </StyledCheckBoxContainer>
      <Alert type="info">
        <Alert.Title style={{ marginBottom: appTheme.space.xxs }}>
          {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_ALERT_TITLE')}
        </Alert.Title>
        <UnorderedList>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_ALERT_ITEM_1'
            )}
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_ALERT_ITEM_2'
            )}
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_ALERT_ITEM_3'
            )}
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_ALERT_ITEM_4'
            )}
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_ALERT_ITEM_5'
            )}
          </UnorderedList.Item>
        </UnorderedList>
      </Alert>
    </StyledPanelContainer>
  );
};
