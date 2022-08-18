import {
  ContainerCard,
  Col,
  Grid,
  MD,
  OrderedList,
  Paragraph,
  Row,
  Span,
  Timeline,
  XXL,
} from '@appquality/unguess-design-system';
import { Divider } from 'src/common/components/divider';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-icon.svg';
import { ServiceResponse } from 'src/features/backoffice';
import { Link } from 'react-scroll';
import { extractStrapiData } from 'src/common/getStrapiData';
import { ServiceExpressCta } from './ServiceExpressCta';
import { ServiceContactUsCta } from './ServiceContactUsCta';

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
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledOrderedList = styled(OrderedList)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledOrderListItem = styled(OrderedList.Item)`
  margin-top: ${({ theme }) => theme.space.sm};

  ::marker,
  > a {
    color: ${({ theme }) => theme.colors.primaryHue};
    cursor: pointer;
  }
`;

const TimelineCard = styled(StyledCardContainer)`
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  border-color: ${({ theme }) => theme.palette.grey[300]};
`;

const StepTitle = styled(XXL)`
  color: ${({ theme }) => theme.palette.grey[800]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space.md};

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StepParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const StyledDivider = styled(Divider)`
  margin: ${({ theme }) => theme.space.sm} 0;
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
  color: ${({ theme }) => theme.palette.grey[800]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const StyledGrid = styled(Grid)`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const ServiceTimeline = ({
  response,
  onContactClick,
}: {
  response: ServiceResponse;
  onContactClick: () => void;
}) => {
  const { t } = useTranslation();
  const { data: serviceData } = response;
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const service = extractStrapiData({ data: serviceData });
  const express = extractStrapiData(service.express);
  const expressType = extractStrapiData(express.express_type);

  return (
    <StyledGrid gutters="lg">
      <Row>
        <Col xs={12} lg={3}>
          {(service.why || service.what || service.how) && (
            <StickyContainer>
              <StyledCardContainer>
                <StickyContainerTitle>
                  {t('__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_TITLE')}
                </StickyContainerTitle>
                <StyledOrderedList>
                  {service.why && (
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

                  {service.what && (
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

                  {service.how && (
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
          {service.why && (
            <TimelineCard id="why-card" className="why-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHY_TITLE">
                  <Span isBold>Why</Span> to choose this campaign
                </Trans>
              </StepTitle>
              {service.why.reasons && (
                <>
                  <StepParagraph>
                    {t('__CATALOG_DETAIL_TIMELINE_WHY_DESCRIPTION')}
                  </StepParagraph>
                  <StyledDivider />
                  <Timeline>
                    {service.why.reasons.map((reason: any) => {
                      const icon = extractStrapiData(reason.icon);
                      const iconUrl = icon.url;

                      return (
                        <Timeline.Item
                          key={`reason_${reason.id}`}
                          icon={
                            <TimelineIcon
                              width={24}
                              height={24}
                              src={`${STRAPI_URL}${iconUrl}`}
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
                      );
                    })}
                  </Timeline>
                </>
              )}
              {service.why.advantages && (
                <AdvantagesContainer>
                  <SectionTitle>
                    {t('__CATALOG_DETAIL_TIMELINE_ADVANTAGES_TITLE')}
                  </SectionTitle>
                  <StyledDivider />
                  <Timeline>
                    {service.why.advantages.map((advantage: any) => (
                      <Timeline.Item hiddenLine icon={<CheckIcon />}>
                        <Timeline.Content>
                          <Paragraph style={{ fontWeight: 500 }}>
                            {advantage.item}
                          </Paragraph>
                        </Timeline.Content>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </AdvantagesContainer>
              )}
            </TimelineCard>
          )}

          {service.what && (
            <TimelineCard id="what-card" className="what-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHAT_TITLE">
                  <Span isBold>What</Span> you get
                </Trans>
              </StepTitle>
              <StepParagraph>{service.what?.description}</StepParagraph>
              <>
                <SectionTitle>
                  {t('__CATALOG_DETAIL_TIMELINE_WHAT_RESULTS_TITLE')}
                </SectionTitle>
                <StyledDivider />
                <Paragraph>{service.what?.goal_text}</Paragraph>
              </>
            </TimelineCard>
          )}

          {service.how && (
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
                {service.how.timeline.map((item: any, index: number) => {
                  const icon = extractStrapiData(item.icon);
                  const iconUrl = icon.url;

                  return (
                    <Timeline.Item
                      id={`${service.slug}-${service.locale}-timeline-${
                        index + 1
                      }`}
                      key={`timeline_${item.id}`}
                      icon={
                        <TimelineIcon
                          width={24}
                          height={24}
                          src={`${STRAPI_URL}${iconUrl}`}
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
                  );
                })}
              </Timeline>
            </TimelineCard>
          )}
        </Col>
        <Col xs={12} lg={3}>
          <StickyContainer>
            {service.requirements && (
              <StyledCardContainer>
                <StickyContainerTitle>
                  {t('__CATALOG_DETAIL_STICKY_CONTAINER_REQUIREMENTS_TITLE')}
                </StickyContainerTitle>
                {service.requirements && service.requirements.description && (
                  <StickyContainerParagraph>
                    {service.requirements.description}
                  </StickyContainerParagraph>
                )}
                <Timeline>
                  {service.requirements.list.map((item: any) => (
                    <Timeline.Item
                      key={`requiremens_${item.id}`}
                      icon={<CheckIcon />}
                      hiddenLine
                    >
                      <Timeline.Content>
                        <Paragraph style={{ fontWeight: 500 }}>
                          {item.item}
                        </Paragraph>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </StyledCardContainer>
            )}
            {(service.why || service.what || service.how) &&
              (expressType && expressType.id ? (
                <ServiceExpressCta expressTypeId={expressType.id} />
              ) : (
                <ServiceContactUsCta onCtaClick={onContactClick} />
              ))}
          </StickyContainer>
        </Col>
      </Row>
    </StyledGrid>
  );
};

export { ServiceTimeline };
