import {
  Button,
  ContainerCard,
  LG,
  MD,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmailIcon } from 'src/assets/icons/email-icon.svg';

import { Divider } from 'src/common/components/divider';
import { useFormikContext } from 'formik';
import {
  StyledCardHeader,
  StyledNotificationsCardHeaderWrapper,
} from './common';
import { NotificationSettingsAccordion } from './NotificationsAccordion';
import { FollowActivitiesAccordion } from './FollowActivitiesAccordion.tsx';
import { NotificationSettingsFormValues } from '../valuesType';

export const NotificationSettingsCard = () => {
  const { t } = useTranslation();
  const { dirty, isSubmitting, submitForm } =
    useFormikContext<NotificationSettingsFormValues>();
  const canSave = dirty && !isSubmitting;
  return (
    <ContainerCard
      id="anchor-notification-settings-id"
      data-qa="notification-settings-card"
      title={t('__PROFILE_PAGE_NOTIFICATIONS_CARD_LABEL')}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledNotificationsCardHeaderWrapper>
          <StyledCardHeader>
            <EmailIcon
              style={{
                color: appTheme.palette.blue[600],
                width: appTheme.iconSizes.md,
                height: appTheme.iconSizes.md,
              }}
            />
            <LG isBold style={{ color: appTheme.palette.grey[800] }}>
              {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_LABEL')}
            </LG>
          </StyledCardHeader>
          <MD color={appTheme.palette.grey[600]}>
            {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_DESCRIPTION')}
          </MD>
        </StyledNotificationsCardHeaderWrapper>
        <Divider
          style={{
            marginTop: appTheme.space.sm,
            marginBottom: appTheme.space.sm,
          }}
        />
        <NotificationSettingsAccordion />
        <Button
          disabled={!canSave}
          isAccent
          isPrimary
          style={{ alignSelf: 'flex-end' }}
          onClick={submitForm}
        >
          {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_SAVE_BUTTON_LABEL')}
        </Button>
      </div>
      <Divider
        style={{
          marginTop: appTheme.space.lg,
          marginBottom: appTheme.space.lg,
        }}
      />
      <FollowActivitiesAccordion />
    </ContainerCard>
  );
};
