import {
  Button,
  Col,
  Row,
  Separator,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { ReactComponent as ExternalIcon } from 'src/assets/icons/new-window-stroke.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { CardRowLoading } from './CardRowLoading';
import { HubItem } from './HubItem';
import { useHubsGroupedByProjects } from './hooks/useHubsGroupedByProject';

const FloatRight = styled.div`
  float: right;
`;

export const SuggestedHubs = ({
  projectId,
  limit,
  showAllCta,
}: {
  projectId?: number;
  limit?: number;
  showAllCta?: boolean;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeWorkspace } = useActiveWorkspace();

  const queryArgs = projectId
    ? { pid: projectId.toString() }
    : { wid: activeWorkspace?.id.toString() ?? '' };

  const { groups, isLoading, isFetching, isError } = useHubsGroupedByProjects({
    projectId,
  });

  if (isLoading || isFetching) return <CardRowLoading />;
  if (isError || !groups.length) return null;

  const navigateToProject = (pid: number) => {
    const localizedRoute =
      i18n.language === 'en'
        ? `/projects/${pid}`
        : `/${i18n.language}/projects/${pid}`;

    navigate(localizedRoute);
  };

  return (
    <>
      <Row
        alignItems="center"
        style={{
          marginTop: `${appTheme.space.xxl}`,
          marginBottom: theme.space.xxs,
        }}
      >
        <Col xs={12} style={{ marginBottom: 0 }}>
          <SectionTitle
            title={t('__DASHABOARD_SUGGESTED_HUBS_TITLE')}
            subtitle={t('__DASHABOARD_SUGGESTED_HUBS_SUBTITLE')}
          />
        </Col>
      </Row>
      <Separator style={{ margin: `${appTheme.space.md} 0` }} />

      {groups.map((group) => {
        const visibleHubs =
          typeof limit === 'number' ? group.hubs.slice(0, limit) : group.hubs;

        return (
          <Row key={`suggested_hubs_project_${group.projectId}`}>
            {!projectId && (
              <Col
                size={12}
                style={{
                  marginBottom: `${theme.space.base * 4}px`,
                  marginTop: `${theme.space.base * 4}px`,
                }}
              >
                <Span isBold>
                  {group.projectName} ({group.hubs.length})
                </Span>
              </Col>
            )}

            {visibleHubs.map((hub) => (
              <Col xs={12} md={6} lg={3} key={`suggested_hub_${hub.id}`}>
                <HubItem hub={hub} />
              </Col>
            ))}

            {showAllCta &&
              typeof limit === 'number' &&
              group.hubs.length > limit && (
                <Col size={12}>
                  <FloatRight>
                    <Button
                      isBasic
                      onClick={() => {
                        navigateToProject(group.projectId);
                      }}
                    >
                      {t('__DASHBOARD_CARD_GROUP_LIST_BUTTON_SHOW_ALL MAX:10')}
                      <Button.EndIcon>
                        <ExternalIcon />
                      </Button.EndIcon>
                    </Button>
                  </FloatRight>
                </Col>
              )}
          </Row>
        );
      })}
    </>
  );
};
