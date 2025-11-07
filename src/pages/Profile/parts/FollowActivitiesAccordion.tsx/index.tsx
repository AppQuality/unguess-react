import { AccordionNew, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EyeIcon } from 'src/assets/icons/eye-icon-fill.svg';
import { FollowActivitiesPanel } from './FollowActivitiesPanel';

export const FollowActivitiesAccordion = () => {
  const { t } = useTranslation();

  return (
    <AccordionNew hasBorder={false} level={3} onChange={() => {}}>
      <AccordionNew.Section>
        <AccordionNew.Header
          icon={
            <EyeIcon
              style={{
                color: appTheme.palette.blue[600],
              }}
            />
          }
        >
          <AccordionNew.Label
            label={t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_LABEL'
            )}
            subtitle={t(
              '__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_HINT'
            )}
          />
          <AccordionNew.Meta>
            <Tag>
              4/5
              {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_TAG')}
            </Tag>
          </AccordionNew.Meta>
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <FollowActivitiesPanel />
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};
