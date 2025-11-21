import { AccordionNew } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { CommentsUpdatesPanel } from './CommentsUpdatesPanel';

export const CommentsUpdatesAccordion = () => {
  const { t } = useTranslation();

  return (
    <AccordionNew
      hasBorder={false}
      level={3}
      defaultExpandedSections={[]}
      responsiveBreakpoint={650}
    >
      <AccordionNew.Section>
        <AccordionNew.Header>
          <AccordionNew.Label
            label={t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_COMMENTS_PROGRESS_UPDATES_LABEL'
            )}
            subtitle={t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_COMMENTS_PROGRESS_UPDATES_HINT'
            )}
          />
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <CommentsUpdatesPanel />
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};
