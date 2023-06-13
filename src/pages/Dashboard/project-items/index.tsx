import {
  Col,
  theme,
  Row,
  IconButton,
  Span,
  TextDescription,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { ReactComponent as GridIcon } from 'src/assets/icons/grid.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import { useEffect, useMemo, useState } from 'react';
import { selectFilteredCampaigns } from 'src/features/campaigns';
import { Campaign, useGetProjectsByPidCampaignsQuery } from 'src/features/api';
import { createSelector } from '@reduxjs/toolkit';
import useWindowSize from 'src/hooks/useWindowSize';
import { CardList } from './list';
import { TableList } from './table';
import { Separator } from '../Separator';
import { Filters } from '../filters';
import { EmptyResults } from '../emptyState';
import { CardRowLoading } from '../CardRowLoading';

const FloatRight = styled.div`
  float: right;
  margin-bottom: ${theme.space.xs};
`;

export const ProjectItems = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointMd = parseInt(theme.breakpoints.md, 10);

  // Get project campaigns from rtk query and filter them
  const filters = useAppSelector((state) => state.filters);

  const getFilteredCampaigns = useMemo(
    () => createSelector(selectFilteredCampaigns, (campaigns) => campaigns),
    []
  );

  const { filteredCampaigns, isLoading, isFetching } =
    useGetProjectsByPidCampaignsQuery(
      { pid: projectId.toString(), limit: 10000 },
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

  const campaignsCount = filteredCampaigns.length;
  const [viewType, setViewType] = useState('list');

  useEffect(() => {
    if (width < breakpointMd) {
      setViewType('grid');
    }
  }, [viewType, width]);

  if (isLoading || isFetching) {
    return <CardRowLoading />;
  }

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
                {...(viewType === 'list' && { isPrimary: true })}
                onClick={() => setViewType('list')}
                style={{ marginRight: theme.space.xs }}
              >
                <ListIcon />
              </IconButton>
              <IconButton
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
        <TableList campaigns={filteredCampaigns as Campaign[]} />
      )}
      {campaignsCount > 0 && viewType === 'grid' && (
        <CardList campaigns={filteredCampaigns as Campaign[]} />
      )}

      {!campaignsCount && <EmptyResults />}
    </>
  );
};
