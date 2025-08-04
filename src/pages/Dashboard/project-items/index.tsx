import { Col, IconButton, Row, theme } from '@appquality/unguess-design-system';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as GridIcon } from 'src/assets/icons/grid.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import { Campaign, useGetProjectsByPidCampaignsQuery } from 'src/features/api';
import { selectFilteredCampaigns } from 'src/features/campaigns';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { appTheme } from 'src/app/theme';
import { CardRowLoading } from '../CardRowLoading';
import { Separator } from '../Separator';
import { EmptyResults } from '../empty-state/EmptyResults';
import { Filters } from '../filters';
import { CardList } from './list';
import { TableList } from './table';

const FloatRight = styled.div`
  float: right;
  margin-bottom: ${theme.space.xs};
`;

export const ProjectItems = ({
  isArchive,
  projectId,
}: {
  isArchive: boolean;
  projectId: number;
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointMd = parseInt(theme.breakpoints.md, 10);

  // Get project campaigns from rtk query and filter them
  const filters = useAppSelector((state) => state.filters);

  const getFilteredCampaigns = useMemo(
    () => createSelector(selectFilteredCampaigns, (campaigns) => campaigns),
    []
  );

  const {
    data: campaigns,
    isLoading,
    isFetching,
  } = useGetProjectsByPidCampaignsQuery({
    pid: projectId.toString(),
    limit: 10000,
    orderBy: 'start_date',
    order: 'DESC',
  });

  const filteredCampaigns = getFilteredCampaigns(
    campaigns?.items || [],
    filters
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
          marginTop: `${appTheme.space.xxl}`,
          marginBottom: theme.space.xxs,
        }}
      >
        <Col xs={12} md={8} style={{ marginBottom: 0 }}>
          <SectionTitle
            title={
              isArchive
                ? `${t('__ARCHIVE_PAGE_TOTAL_CAMPAIGN_TITLE')} (${
                    campaigns?.total
                  })`
                : t('_PROJECT_PAGE_TOTAL_CAMPAIGN_TITLE')
            }
            subtitle={
              !isArchive ? t('_PROJECT_PAGE_TOTAL_CAMPAIGN_SUBTITLE') : ' '
            }
          />
        </Col>
        {width >= breakpointMd && (
          <Col md={4} style={{ marginBottom: 0 }}>
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
      <Separator style={{ margin: `${appTheme.space.md} 0` }} />
      <Filters project_id={projectId} />
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
