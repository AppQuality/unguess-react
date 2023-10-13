import { Col, Grid, Row } from '@appquality/unguess-design-system';
import {
  AsideNav,
  IAsideNav,
  INavItem,
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation/asideNav';
import { useParams } from 'react-router-dom';
import { EmptyState } from './EmptyState';
import { useWidgets } from './useWidgets';

export const CampaignWidgets = () => {
  const { campaignId } = useParams();
  const { widgets, isLoading } = useWidgets({
    campaignId: campaignId ? Number(campaignId) : 0,
  });
  const { all, footers, items, itemsWithTitles } = widgets;

  const navItems: IAsideNav['navItems'] = [
    {
      items: [
        {
          id: '1',
          label: 'Overview',
          callback: () => console.log('clicked'),
        },
      ],
    },
    {
      title: 'Insights',
      items: [
        {
          id: '2',
          label: 'Unique bugs distribution',
          callback: () => console.log('clicked'),
        },
        {
          id: '3',
          label: 'Device and types',
          callback: () => console.log('clicked'),
        },
      ],
    },
    {
      items: [
        {
          label: 'Go to bug list',
          url: 'https://www.unguess.io',
        },
      ],
    },
  ];

  return all.length === 0 ? (
    <EmptyState />
  ) : (
    <Grid gutters="xl">
      <Row>
        <Col xs={12} lg={2} style={{ margin: 0 }}>
          <AsideNav
            isLoading={isLoading}
            navItems={navItems}
            containerId="main"
            spy
            smooth
            duration={500}
            offset={-30}
          />
        </Col>
        <Col xs={12} lg={10}>
          {items.map((widget) => widget.content)}
        </Col>
      </Row>
    </Grid>
  );
};
