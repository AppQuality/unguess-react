import {
  Alert,
  Checkbox,
  FormField,
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

export const CommentsUpdatesPanel = () => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext<NotificationSettingsFormValues>();
  return (
    <StyledPanelContainer>
      <Field name="commentsActivity">
        {({ field }: FieldProps) => (
          <FormField>
            <Checkbox
              role="checkbox"
              key="all"
              checked={field.value}
              onChange={() => setFieldValue('commentsActivity', !field.value)}
            >
              <Label>
                {t(
                  '__PROFILE_PAGE_NOTIFICATIONS_CARD_COMMENTS_PROGRESS_UPDATESCHECKBOX_LABEL'
                )}
              </Label>
            </Checkbox>
          </FormField>
        )}
      </Field>
      <Alert type="info">
        <Alert.Title style={{ marginBottom: appTheme.space.xxs }}>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_COMMENTS_PROGRESS_UPDATES_ALERT_TITLE'
          )}
        </Alert.Title>
        <UnorderedList>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_COMMENTS_PROGRESS_UPDATES_ITEM_1'
            )}
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_COMMENTS_PROGRESS_UPDATES_ITEM_2'
            )}
          </UnorderedList.Item>
        </UnorderedList>
      </Alert>
    </StyledPanelContainer>
  );
};
