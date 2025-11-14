import { AccordionNew, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EyeIcon } from 'src/assets/icons/eye-icon-fill.svg';
import { useGetUsersMeWatchedPlansQuery } from 'src/features/api';
import { FollowActivitiesPanel } from './FollowActivitiesPanel';
import { Loader } from '../cardLoader';

export const FollowActivitiesAccordion = () => {
  const { t } = useTranslation();
  const {
    data: followedActivities,
    isLoading,
    isError,
  } = useGetUsersMeWatchedPlansQuery();

  if (isLoading) return <Loader />;
  if (isError || !followedActivities) return null;
  return (
    <AccordionNew
      hasBorder={false}
      level={3}
      defaultExpandedSections={[]}
      responsiveBreakpoint={650}
    >
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
              {`${followedActivities.items.length}/${followedActivities.allItems} `}
              {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_TAG')}
            </Tag>
          </AccordionNew.Meta>
        </AccordionNew.Header>
        <AccordionNew.Panel>
          {followedActivities.items.length > 0 && (
            <FollowActivitiesPanel
              followedActivities={followedActivities.items}
            />
          )}
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};
