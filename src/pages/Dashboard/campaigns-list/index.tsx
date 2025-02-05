import { Col, IconButton, Row, theme } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GridIcon } from 'src/assets/icons/grid.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { appTheme } from 'src/app/theme';
import { Separator } from '../Separator';
import { EmptyResults } from '../empty-state/EmptyResults';
import { Filters } from '../filters';
import { CardList } from './list';
import { TableList } from './table';
import { useCampaignsGroupedByProject } from './useCampaignsGroupedByProject';

const FloatRight = styled.div`
  float: right;
  margin-bottom: ${theme.space.xs};
`;

export const CampaignsList = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointMd = parseInt(theme.breakpoints.md, 10);
  const { count: campaignsCount } = useCampaignsGroupedByProject();

  const [viewType, setViewType] = useState('list');

  useEffect(() => {
    if (width < breakpointMd) {
      setViewType('grid');
    }
  }, [viewType, width]);

  return (
    <>
      <Row
        alignItems="center"
        style={{
          marginTop: theme.space.md,
          marginBottom: theme.space.xxs,
        }}
      >
        <Col xs={12} md={8} style={{ marginBottom: 0 }}>
          <SectionTitle
            title={t('__DASHABOARD_TOTAL_CAMPAIGN_TITLE')}
            subtitle={t('__DASHABOARD_TOTAL_CAMPAIGN_SUBTITLE')}
          />
        </Col>
        {width >= breakpointMd && (
          <Col md={4} style={{ marginBottom: 0 }}>
            <FloatRight>
              <IconButton
                isPill
                {...(viewType === 'list' && { isPrimary: true })}
                onClick={() => setViewType('list')}
                style={{ marginRight: theme.space.xs }}
              >
                <ListIcon />
              </IconButton>
              <IconButton
                isPill
                {...(viewType === 'grid' && { isPrimary: true })}
                onClick={() => setViewType('grid')}
              >
                <GridIcon />
              </IconButton>
            </FloatRight>
          </Col>
        )}
      </Row>
      <Separator style={{ margin: `${appTheme.space.md} 0` }} />
      <Filters />
      {campaignsCount > 0 && viewType === 'list' && <TableList />}
      {campaignsCount > 0 && viewType === 'grid' && <CardList />}
      {!campaignsCount && <EmptyResults />}
    </>
  );
};
