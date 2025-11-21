import { Hint, Label, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyState } from 'src/assets/empty-monitoring.svg';

export const NotificationSettingsEmptyState = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EmptyState style={{ marginBottom: appTheme.space.sm }} />
      <Label style={{ textAlign: 'center' }}>
        <LG>
          {t(
            '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_EMPTY_STATE_LABEL'
          )}
        </LG>
      </Label>
      <Hint style={{ textAlign: 'center' }}>
        {t(
          '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_EMPTY_STATE_HINT'
        )}
      </Hint>
    </div>
  );
};
