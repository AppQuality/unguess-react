import {
  Col,
  IconButton,
  Row,
  Span,
  TextDescription,
  theme,
} from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GridIcon } from 'src/assets/icons/grid.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { Separator } from '../Separator';
import { EmptyResults } from '../emptyState';
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
          marginTop: `${theme.space.base * 8}px`,
          marginBottom: theme.space.xxs,
        }}
      >
        <Col xs={12} md={8}>
          <Span>
            <TextDescription>
              {`${t(
                '__DASHABOARD_TOTAL_CAMPAIGN_COUNTER MAX:5'
              ).toUpperCase()} (${campaignsCount})`}
            </TextDescription>
          </Span>
        </Col>
        {width >= breakpointMd && (
          <Col md={4}>
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
      <Separator style={{ marginTop: '0', marginBottom: theme.space.sm }} />
      <Filters />

      {campaignsCount > 0 && viewType === 'list' && <TableList />}
      {campaignsCount > 0 && viewType === 'grid' && <CardList />}
      {!campaignsCount && <EmptyResults />}
    </>
  );
};
