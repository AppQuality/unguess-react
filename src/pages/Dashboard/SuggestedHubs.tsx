import {
  Col,
  Paragraph,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { useGetWorkspaceHubsQuery } from 'src/features/api/customEndpoints/getWorkspaceHubs';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { CardRowLoading } from './CardRowLoading';
import { HubItem } from './HubItem';

export const SuggestedHubs = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();

  const { data, isLoading, isFetching, isError } = useGetWorkspaceHubsQuery(
    {
      wid: activeWorkspace?.id.toString() ?? '',
    },
    {
      skip: !activeWorkspace,
    }
  );

  if (isLoading || isFetching) return <CardRowLoading />;
  if (isError || !data?.items?.length) return null;

  return (
    <>
      <Row>
        <Col xs={12} style={{ marginBottom: 0 }}>
          <Paragraph>
            <SectionTitle
              title={t('__DASHABOARD_SUGGESTED_HUBS_TITLE')}
              subtitle={t('__DASHABOARD_SUGGESTED_HUBS_SUBTITLE')}
            />
            <Separator style={{ margin: `${appTheme.space.md} 0` }} />
          </Paragraph>
        </Col>
      </Row>

      <ScrollingGrid id="suggested-hubs-scrolling-grid">
        {data.items.map((hub) => (
          <ScrollingGrid.Item key={`suggested_hub_${hub.id}`}>
            <HubItem hub={hub} />
          </ScrollingGrid.Item>
        ))}
      </ScrollingGrid>
    </>
  );
};
