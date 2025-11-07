import {
  Alert,
  Checkbox,
  FormField,
  Hint,
  Label,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { NotificationSettingsFormValues } from '../../valuesType';

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
  const { setFieldValue } = useFormikContext<NotificationSettingsFormValues>();
  return (
    <StyledPanelContainer>
      <StyledCheckBoxContainer>
        <Label>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_UPDATES_FORM_LABEL'
          )}
        </Label>
        <Field name="activitySetupUpdates">
          {({ field }: FieldProps) => (
            <FormField>
              <Checkbox
                role="checkbox"
                key="all"
                checked={field.value}
                onChange={() =>
                  setFieldValue('activitySetupUpdates', !field.value)
                }
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
          )}
        </Field>
        <Field name="activityProgress">
          {({ field }: FieldProps) => (
            <FormField>
              <Checkbox
                role="checkbox"
                key="all"
                checked={field.value}
                onChange={() => setFieldValue('activityProgress', !field.value)}
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
          )}
        </Field>
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
