import { useTranslation } from 'react-i18next';
import {
  StickyNavItem,
  StickyNavItemLabel,
} from 'src/common/components/navigation';
import { CampaignWithOutput } from 'src/features/api';
import { StickyContainer } from 'src/common/components/StickyContainer';
import { BugsNavigation, BugsNavigationLink } from './bugs';

const Navigation = ({
  campaignId,
  outputs,
}: {
  campaignId: number;
  outputs: CampaignWithOutput['outputs'];
}) => {
  const { t } = useTranslation();

  return (
    <StickyContainer>
      {outputs?.includes('bugs') && <BugsNavigation />}
      <StickyNavItemLabel>
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_GROUP_OTHER_LABEL')}
      </StickyNavItemLabel>
      <StickyNavItem
        to="reports"
        containerId="main"
        spy
        smooth
        duration={500}
        offset={-350}
      >
        {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OTHER_REPORTS_LABEL')}
      </StickyNavItem>
      {outputs?.includes('bugs') && (
        <BugsNavigationLink campaignId={campaignId} />
      )}
    </StickyContainer>
  );
};

export default Navigation;
