import { AccordionNew, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { CommunicationUpdatesPanel } from './CommunicationUpdatesPanel';

export const NotificationSettingsAccordion = () => {
  const { t } = useTranslation();

  return (
    <AccordionNew
      isCompact
      hasBorder={false}
      level={3}
      defaultExpandedSections={[]}
    >
      <AccordionNew.Section>
        <AccordionNew.Header>
          <AccordionNew.Label
            label={t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_UPDATES_LABEL'
            )}
            subtitle={t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_UPDATES_HINT'
            )}
          />
          <AccordionNew.Meta>
            <Tag color={appTheme.palette.green[600]}>
              {t(
                '__PROFILE_PAGE_NOTIFICATIONS_CARD_ACTIVITY_PROGRESS_UPDATES_TAG'
              )}
            </Tag>
          </AccordionNew.Meta>
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <CommunicationUpdatesPanel />
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};
