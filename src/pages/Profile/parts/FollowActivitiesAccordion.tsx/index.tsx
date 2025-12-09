import { AccordionNew, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EyeIcon } from 'src/assets/icons/eye-icon-fill.svg';
import {
  useGetUsersMeWatchedCampaignsQuery,
  useGetUsersMeWatchedPlansQuery,
} from 'src/features/api';
import { FollowActivitiesPanel } from './FollowActivitiesPanel';
import { Loader } from '../cardLoader';
import { FollowCampaignActivitiesPanel } from './FollowCampaignActivitiesPanel';
import { NotificationSettingsEmptyState } from './NotificationSettingsEmptyState';

export const FollowActivitiesAccordion = () => {
  const { t } = useTranslation();
  const {
    data: followedActivities,
    isLoading,
    isError,
  } = useGetUsersMeWatchedPlansQuery();

  const { data: followedCampaigns } = useGetUsersMeWatchedCampaignsQuery();
  const totalFollowed =
    (followedActivities?.items.length || 0) +
    (followedCampaigns?.items.length || 0);
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
              {`${totalFollowed}/${
                followedActivities.allItems + (followedCampaigns?.allItems || 0)
              } `}
              {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_TAG')}
            </Tag>
          </AccordionNew.Meta>
        </AccordionNew.Header>
        {totalFollowed > 0 ? (
          <>
            <AccordionNew.Panel>
              {followedActivities.items.length > 0 && (
                <FollowActivitiesPanel
                  followedActivities={followedActivities.items}
                />
              )}
            </AccordionNew.Panel>
            {followedCampaigns && followedCampaigns.items.length > 0 && (
              <AccordionNew.Panel>
                <FollowCampaignActivitiesPanel
                  followedCampaigns={followedCampaigns.items}
                />
              </AccordionNew.Panel>
            )}
          </>
        ) : (
          <AccordionNew.Panel>
            <NotificationSettingsEmptyState />
          </AccordionNew.Panel>
        )}
      </AccordionNew.Section>
    </AccordionNew>
  );
};
