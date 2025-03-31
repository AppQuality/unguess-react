import {
  Col,
  ContainerCard,
  Grid,
  MD,
  OrderedList,
  Paragraph,
  Row,
  Span,
  Timeline,
  XXL,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-icon.svg';
import { StyledDivider } from 'src/common/components/navigation/asideNav';
import { GetWorkspacesByWidTemplatesAndTidApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { LaunchActivityCTA } from './LaunchActivityCTA';

const StickyContainer = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
`;

const StyledCardContainer = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.base * 6}px;
  background-color: ${({ theme }) => theme.palette.white};
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  border-color: ${({ theme }) => theme.palette.grey[300]};
`;

const StickyContainerTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StickyContainerParagraph = styled(Paragraph)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledOrderedList = styled(OrderedList)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledOrderListItem = styled(OrderedList.Item)`
  margin-top: ${({ theme }) => theme.space.sm};

  ::marker,
  > a {
    ${(props) => retrieveComponentStyles('text.primary', props)};
    cursor: pointer;
  }
`;

const TimelineCard = styled(StyledCardContainer)`
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  border-color: ${({ theme }) => theme.palette.grey[300]};
`;

const StepTitle = styled(XXL)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space.md};

  span {
    ${(props) => retrieveComponentStyles('text.primary', props)};
  }
`;

const StepParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TimelineIcon = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 0;
`;

const AdvantagesContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.xl};
`;

const SectionTitle = styled(MD)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const StyledGrid = styled(Grid)`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const TemplateTimeline = ({
  template,
  handleLaunchActivity,
}: {
  template: GetWorkspacesByWidTemplatesAndTidApiResponse;
  handleLaunchActivity: () => void;
}) => {
  const { t } = useTranslation();

  const memoizedTemplate = useMemo(
    () => ({
      ...template,
      strapi: {
        ...template.strapi,
        why: template.strapi?.why?.map((item, index) => ({
          ...item,
          key: `why-${index}`,
        })),
        what: template.strapi?.what,
        how: template.strapi?.how?.map((item, index) => ({
          ...item,
          key: `how-${index}`,
        })),
        requirements: {
          ...template.strapi?.requirements,
          list: template.strapi?.requirements?.list.map((item, index) => ({
            value: item,
            key: `requiremens-${index}`,
          })),
        },
      },
    }),
    [template]
  );

  return (
    <StyledGrid gutters="lg">
      <Row>
        <Col xs={12} lg={3}>
          {(memoizedTemplate.strapi?.why ||
            memoizedTemplate.strapi?.what ||
            memoizedTemplate.strapi?.how) && (
            <StickyContainer>
              <StyledCardContainer>
                <StickyContainerTitle>
                  {t('__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_TITLE')}
                </StickyContainerTitle>
                <StyledOrderedList>
                  {memoizedTemplate.strapi?.why && (
                    <StyledOrderListItem>
                      <Link
                        to="why-card"
                        containerId="main"
                        spy
                        smooth
                        duration={500}
                        offset={-50}
                      >
                        {t('__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_WHY_ITEM')}
                      </Link>
                    </StyledOrderListItem>
                  )}

                  {memoizedTemplate.strapi?.what && (
                    <StyledOrderListItem>
                      <Link
                        to="what-card"
                        containerId="main"
                        spy
                        smooth
                        duration={500}
                        offset={-20}
                      >
                        {t('__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_WHAT_ITEM')}
                      </Link>
                    </StyledOrderListItem>
                  )}

                  {memoizedTemplate.strapi?.how && (
                    <StyledOrderListItem>
                      <Link
                        to="how-card"
                        containerId="main"
                        spy
                        smooth
                        duration={500}
                        offset={-20}
                      >
                        {t('__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_HOW_ITEM')}
                      </Link>
                    </StyledOrderListItem>
                  )}
                </StyledOrderedList>
              </StyledCardContainer>
            </StickyContainer>
          )}
        </Col>
        <Col xs={12} lg={6}>
          {memoizedTemplate.strapi?.why && (
            <TimelineCard id="why-card" className="why-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHY_TITLE">
                  <Span isBold>Why</Span> to choose this campaign
                </Trans>
              </StepTitle>
              {memoizedTemplate.strapi?.why && (
                <>
                  <StepParagraph>
                    {t('__CATALOG_DETAIL_TIMELINE_WHY_DESCRIPTION')}
                  </StepParagraph>
                  <StyledDivider />
                  <Timeline>
                    {memoizedTemplate.strapi?.why.map((reason) => (
                      <Timeline.Item
                        key={`reason_${reason.key}`}
                        icon={
                          <TimelineIcon
                            width={24}
                            height={24}
                            src={reason.icon}
                            alt={reason.title}
                          />
                        }
                        hiddenLine
                      >
                        <Timeline.Content>
                          <Paragraph style={{ fontWeight: 500 }}>
                            {reason.title}
                          </Paragraph>
                          {reason.description}
                        </Timeline.Content>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </>
              )}
              {memoizedTemplate.strapi?.advantages && (
                <AdvantagesContainer>
                  <SectionTitle>
                    {t('__CATALOG_DETAIL_TIMELINE_ADVANTAGES_TITLE')}
                  </SectionTitle>
                  <StyledDivider />
                  <Timeline>
                    {memoizedTemplate.strapi?.advantages.map((advantage) => (
                      <Timeline.Item hiddenLine icon={<CheckIcon />}>
                        <Timeline.Content>
                          <Paragraph style={{ fontWeight: 500 }}>
                            {advantage}
                          </Paragraph>
                        </Timeline.Content>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </AdvantagesContainer>
              )}
            </TimelineCard>
          )}

          {memoizedTemplate.strapi?.what && (
            <TimelineCard id="what-card" className="what-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHAT_TITLE">
                  <Span isBold>What</Span> you get
                </Trans>
              </StepTitle>
              <StepParagraph>
                {memoizedTemplate.strapi?.what?.description}
              </StepParagraph>
              <>
                <SectionTitle>
                  {t('__CATALOG_DETAIL_TIMELINE_WHAT_RESULTS_TITLE')}
                </SectionTitle>
                <StyledDivider />
                {memoizedTemplate.strapi?.what.goal && (
                  <Paragraph>{memoizedTemplate.strapi?.what.goal}</Paragraph>
                )}
              </>
            </TimelineCard>
          )}

          {memoizedTemplate.strapi?.how && (
            <TimelineCard id="how-card" className="how-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_HOW_TITLE">
                  <Span isBold>How</Span> does it work
                </Trans>
              </StepTitle>
              <StepParagraph>
                {t('__CATALOG_DETAIL_TIMELINE_HOW_DESCRIPTION')}
              </StepParagraph>
              <Timeline>
                {memoizedTemplate.strapi?.how.map((item) => (
                  <Timeline.Item
                    id={item.key}
                    key={item.key}
                    icon={
                      <TimelineIcon
                        width={24}
                        height={24}
                        src={item.icon}
                        alt={item.title}
                      />
                    }
                  >
                    <Timeline.Content>
                      <Paragraph style={{ fontWeight: 500 }}>
                        {item.title}
                      </Paragraph>
                      {item.description}
                    </Timeline.Content>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TimelineCard>
          )}
        </Col>
        <Col xs={12} lg={3}>
          <StickyContainer>
            {memoizedTemplate.strapi?.requirements && (
              <StyledCardContainer>
                <StickyContainerTitle>
                  {t('__CATALOG_DETAIL_STICKY_CONTAINER_REQUIREMENTS_TITLE')}
                </StickyContainerTitle>
                {memoizedTemplate.strapi?.requirements &&
                  memoizedTemplate.strapi?.requirements.description && (
                    <StickyContainerParagraph>
                      {memoizedTemplate.strapi?.requirements.description}
                    </StickyContainerParagraph>
                  )}
                <Timeline>
                  {memoizedTemplate.strapi?.requirements.list?.map((item) => (
                    <Timeline.Item
                      key={item.key}
                      icon={<CheckIcon />}
                      hiddenLine
                    >
                      <Timeline.Content>
                        <Paragraph style={{ fontWeight: 500 }}>
                          {item.value}
                        </Paragraph>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </StyledCardContainer>
            )}
            {(memoizedTemplate.strapi?.why ||
              memoizedTemplate.strapi?.what ||
              memoizedTemplate.strapi?.how) && (
              <LaunchActivityCTA handleLaunchActivity={handleLaunchActivity} />
            )}
          </StickyContainer>
        </Col>
      </Row>
    </StyledGrid>
  );
};

export { TemplateTimeline };
