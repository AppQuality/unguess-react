import {
  Col,
  Ellipsis,
  Grid,
  Row,
  Skeleton,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import Video from '@appquality/stream-player';
import { TFunction, useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { WidgetSection } from 'src/pages/Campaign/WidgetSection';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { ReactComponent as MajorIssueIcon } from 'src/assets/icons/insight-major-issue.svg';
import { ReactComponent as MinorIssueIcon } from 'src/assets/icons/insight-minor-issue.svg';
import { ReactComponent as VideoPlayIcon } from 'src/assets/icons/video-play-icon.svg';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import styled from 'styled-components';
import { BugCard } from 'src/common/components/BugCard';
import { appTheme } from 'src/app/theme';
import { useCampaignInsights } from './useCampaignInsights';

const CardThumb = styled(SpecialCard.Thumb)`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  overflow: hidden;
  position: relative;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.sm};

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    overflow: hidden;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    width: ${({ theme }) => theme.space.base * 14}px;
    height: auto;
    z-index: 3;
  }
`;

const CardFooter = styled(SpecialCard.Footer)`
  flex-wrap: wrap;
  margin-bottom: -${({ theme }) => theme.space.xs};

  > * {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

const Player = styled(Video.Player)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > video {
    width: 100%;
    height: 200px;
  }
`;

const StyledBugCard = styled(BugCard)``;

const StyledStickyNavItem = styled(StickyNavItem)`
  padding: 0;

  &:hover {
    background-color: transparent;
  }

  &.isCurrent {
    background-color: transparent;

    ${StyledBugCard} {
      background-color: ${({ theme }) => theme.palette.grey[200]};
    }
  }
`;

interface InsightSeverity {
  id: number;
  name: string;
}

function getSeverityIcon(severity: InsightSeverity) {
  switch (severity.id) {
    case 1:
      return <MajorIssueIcon />;
    case 2:
      return <MinorIssueIcon />;
    default:
      return null;
  }
}

function getSeverityTag(severity: InsightSeverity, text?: string) {
  switch (severity.id) {
    case 1:
      return (
        <SeverityTag hasBackground severity="critical">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    case 2:
      return (
        <SeverityTag hasBackground severity="high">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    default:
      return null;
  }
}

function getClusterTag(
  cluster: string | Array<{ id: number; name: string }>,
  t: TFunction
) {
  if (cluster === 'all') {
    return (
      <Tag>
        <Ellipsis>{t('__CAMPAIGN_PAGE_INSIGHTS_ALL_CLUSTERS')}</Ellipsis>
      </Tag>
    );
  }

  if (Array.isArray(cluster))
    return cluster.map((c) => (
      <Tag key={c.id}>
        <Ellipsis>{c.name}</Ellipsis>
      </Tag>
    ));

  return null;
}

function getSeverity(severity: InsightSeverity) {
  switch (severity.id) {
    case 1:
      return 'critical';
    case 2:
      return 'high';
    case 3:
      return 'medium';
    case 4:
      return 'low';
    default:
      return 'medium';
  }
}

export const Insights = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useCampaignInsights({
    campaignId: campaign.id ?? 0,
  });

  if (!data || !data.findings) return null;

  // Check if url has an anchor and scroll to it
  const url = window.location.href;
  const urlAnchor = url.split('#')[1];
  if (urlAnchor) {
    const anchor = document.getElementById(urlAnchor);
    if (anchor) {
      anchor.scrollIntoView();
    }
  }

  return (
    <WidgetSection {...(id && { id })}>
      <Grid>
        <Row>
          <Col xs={12}>
            <SectionTitle
              title={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_TITLE')}
              subtitle={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_SUBTITLE')}
            />
          </Col>
        </Row>
      </Grid>
      <Grid gutters="md">
        <Row>
          {isLoading ? (
            <>
              <Col xs={12} lg={4}>
                <Skeleton height="200px" />
              </Col>
              <Col xs={12} lg={8}>
                <Skeleton height="100%" />
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} lg={4}>
                <StickyContainer>
                  <StickyNavItemLabel>
                    {t('__CAMPAIGN_PAGE_INSIGHTS_NAVIGATION_TITLE')}
                  </StickyNavItemLabel>
                  <StyledDivider />
                  {data.findings.length > 0 &&
                    data.findings.map((insight, index) => (
                      <StyledStickyNavItem
                        id={`anchor-insight-row-${insight.id}`}
                        to={`insight-row-${insight.id}`}
                        containerId="main"
                        spy
                        smooth
                        duration={500}
                        offset={-30}
                      >
                        <StyledBugCard
                          severity={getSeverity(insight.severity) as Severities}
                          url="#"
                          style={{
                            marginBottom: appTheme.space.sm,
                          }}
                        >
                          {() => (
                            <>
                              <BugCard.TopTitle>
                                {t('__CAMPAIGN_PAGE_INSIGHTS_NUMBER_LABEL')}{' '}
                                {index + 1}
                              </BugCard.TopTitle>
                              <BugCard.Title>{insight.title}</BugCard.Title>
                              <BugCard.Footer>
                                {getClusterTag(insight.cluster, t)}
                                {getSeverityTag(insight.severity)}
                              </BugCard.Footer>
                            </>
                          )}
                        </StyledBugCard>
                      </StyledStickyNavItem>
                    ))}
                </StickyContainer>
              </Col>
              <Col xs={12} lg={8}>
                <Grid>
                  {data.findings.length > 0 &&
                    data.findings.map((insight) => (
                      <Row id={`insight-row-${insight.id}`}>
                        <Col xs={12} lg={6}>
                          <SpecialCard title={insight.title}>
                            <SpecialCard.Thumb>
                              {getSeverityIcon(insight.severity)}
                            </SpecialCard.Thumb>
                            <SpecialCard.Header>
                              <SpecialCard.Header.Label>
                                {insight.severity.name}
                              </SpecialCard.Header.Label>
                              <SpecialCard.Header.Title>
                                {insight.title}
                              </SpecialCard.Header.Title>
                            </SpecialCard.Header>
                            {insight.description}
                            <CardFooter justifyContent="start">
                              {getClusterTag(insight.cluster, t)}
                              {getSeverityTag(insight.severity)}
                            </CardFooter>
                          </SpecialCard>
                        </Col>
                        {insight.videoPart.map((videoPart, index) => (
                          <Col xs={12} lg={6}>
                            <SpecialCard
                              key={insight.id}
                              title={videoPart.description}
                            >
                              <SpecialCard.Header>
                                <CardThumb>
                                  <VideoPlayIcon />
                                  <Video
                                    src={videoPart.streamUrl}
                                    start={videoPart.start}
                                    end={videoPart.end}
                                  >
                                    <Player />
                                  </Video>
                                </CardThumb>
                                <SpecialCard.Header.Label>
                                  {t(
                                    '__CAMPAIGN_PAGE_INSIGHTS_VIDEO_PART_NUMBER_LABEL'
                                  )}{' '}
                                  {index + 1}
                                </SpecialCard.Header.Label>
                                <SpecialCard.Header.Title>
                                  {`”${videoPart.description}”`}
                                </SpecialCard.Header.Title>
                              </SpecialCard.Header>
                              <CardFooter justifyContent="start">
                                {getSeverityTag(
                                  insight.severity,
                                  insight.title
                                )}
                                {getClusterTag(insight.cluster, t)}
                              </CardFooter>
                            </SpecialCard>
                          </Col>
                        ))}
                      </Row>
                    ))}
                </Grid>
              </Col>
            </>
          )}
        </Row>
      </Grid>
    </WidgetSection>
  );
};
