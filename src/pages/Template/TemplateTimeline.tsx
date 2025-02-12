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
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { useParams } from 'react-router-dom';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-icon.svg';
import { StyledDivider } from 'src/common/components/navigation/asideNav';
import { extractStrapiData } from 'src/common/getStrapiData';
import styled from 'styled-components';
import i18n from 'src/i18n';
import { useCampaignTemplateById } from 'src/hooks/useCampaignTemplateById';
import { TemplateExpressCta } from './TemplateExpressCta';

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

const TemplateTimeline = () => {
  const { t } = useTranslation();
  const { templateId } = useParams();
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const { data: template } = useCampaignTemplateById(templateId || '');

  return (
    <StyledGrid gutters="lg">
      <Row>
        <Col xs={12} lg={3}>
          {(template?.why || template?.what || template?.how) && (
            <StickyContainer>
              <StyledCardContainer>
                <StickyContainerTitle>
                  {t('__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_TITLE')}
                </StickyContainerTitle>
                <StyledOrderedList>
                  {template?.why && (
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

                  {template?.what && (
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

                  {template?.how && (
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
          {template?.why && (
            <TimelineCard id="why-card" className="why-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHY_TITLE">
                  <Span isBold>Why</Span> to choose this campaign
                </Trans>
              </StepTitle>
              {template?.why.reasons && (
                <>
                  <StepParagraph>
                    {t('__CATALOG_DETAIL_TIMELINE_WHY_DESCRIPTION')}
                  </StepParagraph>
                  <StyledDivider />
                  <Timeline>
                    {template?.why.reasons.map((reason: any) => {
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
              {template?.why.advantages && (
                <AdvantagesContainer>
                  <SectionTitle>
                    {t('__CATALOG_DETAIL_TIMELINE_ADVANTAGES_TITLE')}
                  </SectionTitle>
                  <StyledDivider />
                  <Timeline>
                    {template?.why.advantages.map((advantage: any) => (
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

          {template?.what && (
            <TimelineCard id="what-card" className="what-card">
              <StepTitle>
                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHAT_TITLE">
                  <Span isBold>What</Span> you get
                </Trans>
              </StepTitle>
              <StepParagraph>{template?.what?.description}</StepParagraph>
              <>
                <SectionTitle>
                  {t('__CATALOG_DETAIL_TIMELINE_WHAT_RESULTS_TITLE')}
                </SectionTitle>
                <StyledDivider />
                <Paragraph>{template?.what?.goal_text}</Paragraph>
              </>
            </TimelineCard>
          )}

          {template?.how && (
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
                {template?.how?.timeline?.map((item: any, index: number) => {
                  const icon = extractStrapiData(item.icon);
                  const iconUrl = icon.url;

                  return (
                    <Timeline.Item
                      id={`${template?.slug}-${i18n.language}-timeline-${
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
            {template?.requirements && (
              <StyledCardContainer>
                <StickyContainerTitle>
                  {t('__CATALOG_DETAIL_STICKY_CONTAINER_REQUIREMENTS_TITLE')}
                </StickyContainerTitle>
                {template?.requirements &&
                  template?.requirements.description && (
                    <StickyContainerParagraph>
                      {template?.requirements.description}
                    </StickyContainerParagraph>
                  )}
                <Timeline>
                  {template?.requirements?.list?.map((item: any) => (
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
            {(template?.why || template?.what || template?.how) &&
              (template?.express?.data?.id ? <TemplateExpressCta /> : null)}
          </StickyContainer>
        </Col>
      </Row>
    </StyledGrid>
  );
};

export { TemplateTimeline };
