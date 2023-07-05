import {
  Col,
  IconButton,
  Row,
  Span,
  TextDescription,
  theme,
} from '@appquality/unguess-design-system';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as GridIcon } from 'src/assets/icons/grid.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import { useGetWorkspacesByWidCampaignsQuery } from 'src/features/api';
import {
  selectFilteredCampaigns,
  selectGroupedCampaigns,
} from 'src/features/campaigns';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { Separator } from '../Separator';
import { EmptyResults } from '../emptyState';
import { Filters } from '../filters';
import { CardList } from './list';
import { TableList } from './table';

const FloatRight = styled.div`
  float: right;
  margin-bottom: ${theme.space.xs};
`;

export const CampaignsList = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { width } = useWindowSize();
  const breakpointMd = parseInt(theme.breakpoints.md, 10);

  // Get workspaces campaigns from rtk query and filter them
  const filters = useAppSelector((state) => state.filters);

  const getFilteredCampaigns = useMemo(
    () => createSelector(selectFilteredCampaigns, (campaigns) => campaigns),
    []
  );

  const { filteredCampaigns, isLoading, isFetching, isError } =
    useGetWorkspacesByWidCampaignsQuery(
      { wid: activeWorkspace?.id.toString() || '' },
      {
        selectFromResult: (result) => ({
          ...result,
          filteredCampaigns: getFilteredCampaigns(
            result?.data?.items || [],
            filters
          ),
        }),
      }
    );

  const campaigns = useMemo(
    () => selectGroupedCampaigns(filteredCampaigns),
    [filteredCampaigns]
  );

  const campaignsCount = filteredCampaigns.length;
  const [viewType, setViewType] = useState('list');

  useEffect(() => {
    if (width < breakpointMd) {
      setViewType('grid');
    }
  }, [viewType, width]);

  if (isLoading || isError || isFetching) return null;

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
      <Filters campaigns={filteredCampaigns} />

      {campaignsCount > 0 && viewType === 'list' && (
        <TableList campaigns={campaigns} />
      )}
      {campaignsCount > 0 && viewType === 'grid' && (
        <CardList campaigns={campaigns} />
      )}
      {!campaignsCount && <EmptyResults />}
    </>
  );
};
