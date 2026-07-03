import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { CampaignMetaRow } from 'src/pages/Campaign/CampaignMetaRow';
import { CampaignWidgets } from 'src/pages/Campaign/CampaignWidgets';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';
import { TabSection, TabTitle } from './TabLayout';

const StyledMetaRow = styled(CampaignMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

/**
 * Campaign overview tab body. Reuses the content-only `CampaignWidgets` and
 * renders, at the top of the content column (aligned with the widgets, not
 * full-width), the "Overview" title and the `CampaignMetaRow`
 * (status/duration/devices). No legacy page header is rendered here — the
 * shared `EntityPageHeader` owns it.
 */
export const OverviewTab = () => {
  const { t } = useTranslation();
  const { entityId } = useOutletContext<EntityTabContext>();

  return (
    <LayoutWrapper>
      <TabSection>
        <CampaignWidgets
          contentHeader={
            <TabTitle meta={<StyledMetaRow campaignId={entityId} />}>
              {t('__ENTITY_PAGE_TAB_OVERVIEW')}
            </TabTitle>
          }
        />
      </TabSection>
    </LayoutWrapper>
  );
};
