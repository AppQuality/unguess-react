import { getColor, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { CampaignMetaRow } from 'src/pages/Campaign/CampaignMetaRow';
import { CampaignWidgets } from 'src/pages/Campaign/CampaignWidgets';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';

// Top padding of the overview section (matches the 32px spacer in the design).
const Section = styled.div`
  padding-top: ${({ theme }) => theme.space.lg};
`;

// Active-tab title shown at the top of the content column, above the meta row.
const TabTitle = styled(LG)`
  color: ${({ theme }) => getColor(theme.palette.blue, 600)};
  margin-bottom: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xs};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const StyledMetaRow = styled(CampaignMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.lg};
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
      <Section>
        <CampaignWidgets
          contentHeader={
            <>
              <TabTitle isBold>{t('__ENTITY_PAGE_TAB_OVERVIEW')}</TabTitle>
              <StyledMetaRow campaignId={entityId} />
            </>
          }
        />
      </Section>
    </LayoutWrapper>
  );
};
