import { Card, Col, Divider, Grid, MD, OrderedList, Paragraph, Row, Span, Timeline, XXL } from "@appquality/unguess-design-system";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "src/assets/icons/check-icon.svg";
import { WaterButton } from "../ExpressWizard/waterButton";
import { useAppSelector } from "src/app/hooks";
import { ServiceResponse } from "src/features/backoffice";
import { Link } from "react-scroll";

const StickyContainer = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
`;

const CardContainer = styled(Card)`
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
`;

const TimelineCard = styled(Card)`
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
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    padding: 0;
`;

const AdvantagesContainer = styled.div`
    margin-top: ${({ theme }) => theme.space.xl};
`;

const SectionTitle = styled(MD)`
    color: ${({ theme }) => theme.palette.grey[800]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ServiceTimeline = (
    data: ServiceResponse,
) => {
    const { t } = useTranslation();
    const { activeWorkspace } = useAppSelector((state) => state.navigation);
    const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || "";

    const why = data ? data.data?.attributes?.why : {};
    const reasons = why?.reasons || [];
    const requirements = data ? data.data?.attributes?.requirements : {};
    const list = requirements?.list || [];
    const what = data ? data.data?.attributes?.what : {};
    const how = data ? data.data?.attributes?.how : {};
    const timeline = how?.timeline || [];

    return (
        <>
            <Grid gutters={"lg"}>
                <Row>
                    <Col xs={12} lg={3}>
                        <StickyContainer>
                            <CardContainer>
                                <StickyContainerTitle>
                                    {t("__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_TITLE")}
                                </StickyContainerTitle>
                                <StyledOrderedList>
                                    <StyledOrderListItem>
                                        <Link
                                            to={"why"}
                                            containerId={"why-card"}
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                        >
                                            {t("__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_WHY_ITEM")}
                                        </Link>
                                    </StyledOrderListItem>
                                    <StyledOrderListItem>
                                        <Link
                                            to={"what"}
                                            containerId={"what-card"}
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                        >
                                            {t("__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_WHAT_ITEM")}
                                        </Link>
                                    </StyledOrderListItem>
                                    <StyledOrderListItem>
                                        <Link
                                            to={"how"}
                                            containerId={"how-card"}
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                        >
                                            {t("__CATALOG_DETAIL_STICKY_CONTAINER_ABOUT_HOW_ITEM")}
                                        </Link>
                                    </StyledOrderListItem>
                                </StyledOrderedList>
                            </CardContainer>
                        </StickyContainer>
                    </Col>
                    <Col xs={12} lg={6}>
                        <TimelineCard id={"why-card"} className={"why-card"}>
                            <StepTitle>
                                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHY_TITLE">
                                    <Span isBold>Why</Span> to choose this campaign
                                </Trans>
                            </StepTitle>
                            <StepParagraph>{t("__CATALOG_DETAIL_TIMELINE_WHY_DESCRIPTION")}</StepParagraph>
                            <StyledDivider />
                            <Timeline>
                                {reasons.map((reason, index) => {
                                    const icon = reason.icon?.data?.attributes?.url || "";

                                    return (
                                        <Timeline.Item
                                            key={index}
                                            icon={<TimelineIcon width={24} height={24} src={`${STRAPI_URL}${icon}`} alt={reason.title} />}
                                            hiddenLine
                                        >
                                            <Timeline.Content>
                                                <Paragraph style={{ fontWeight: 500 }}>
                                                    {reason.title}
                                                </Paragraph>
                                                {reason.description}
                                            </Timeline.Content>
                                        </Timeline.Item>
                                    )
                                })}
                            </Timeline>
                            <AdvantagesContainer>
                                <SectionTitle>
                                    {t("__CATALOG_DETAIL_TIMELINE_ADVANTAGES_TITLE")}
                                </SectionTitle>
                                <StyledDivider />
                                <Timeline>
                                    <Timeline.Item
                                        hiddenLine
                                        icon={<CheckIcon />}
                                    >
                                        <Timeline.Content>
                                            <Paragraph style={{ fontWeight: 500 }}>
                                                {t("__CATALOG_DETAIL_TIMELINE_ADVANTAGES_ITEM_TIME_TITLE")}
                                            </Paragraph>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                    <Timeline.Item
                                        hiddenLine
                                        icon={<CheckIcon />}
                                    >
                                        <Timeline.Content>
                                            <Paragraph style={{ fontWeight: 500 }}>
                                                {t("__CATALOG_DETAIL_TIMELINE_ADVANTAGES_ITEM_COST_TITLE")}
                                            </Paragraph>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                    <Timeline.Item
                                        hiddenLine
                                        icon={<CheckIcon />}
                                    >
                                        <Timeline.Content>
                                            <Paragraph style={{ fontWeight: 500 }}>
                                                {t("__CATALOG_DETAIL_TIMELINE_ADVANTAGES_ITEM_INTENGRATION_TITLE")}
                                            </Paragraph>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                </Timeline>
                            </AdvantagesContainer>
                        </TimelineCard>
                        <TimelineCard id={"what-card"} className={"what-card"}>
                            <StepTitle>
                                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_WHAT_TITLE">
                                    <Span isBold>What</Span> you get
                                </Trans>
                            </StepTitle>
                            <StepParagraph>{what?.description}</StepParagraph>
                            <>
                                <SectionTitle>
                                    {t("__CATALOG_DETAIL_TIMELINE_WHAT_RESULTS_TITLE")}
                                </SectionTitle>
                                <StyledDivider />
                                <Paragraph>{what?.goal_text}</Paragraph>
                            </>
                        </TimelineCard>
                        <TimelineCard id={"how-card"} className={"how-card"}>
                            <StepTitle>
                                <Trans i18nKey="__CATALOG_DETAIL_TIMELINE_HOW_TITLE">
                                    <Span isBold>How</Span> does it work
                                </Trans>
                            </StepTitle>
                            <StepParagraph>{t("__CATALOG_DETAIL_TIMELINE_HOW_DESCRIPTION")}</StepParagraph>
                            <Timeline>
                                {timeline.map((item, index) => {
                                    const icon = item.icon?.data?.attributes?.url || "";

                                    return (
                                        <Timeline.Item
                                            key={index}
                                            icon={<TimelineIcon width={24} height={24} src={`${STRAPI_URL}${icon}`} alt={item.title} />}
                                        >
                                            <Timeline.Content>
                                                <Paragraph style={{ fontWeight: 500 }}>
                                                    {item.title}
                                                </Paragraph>
                                                {item.description}
                                            </Timeline.Content>
                                        </Timeline.Item>
                                    )
                                })}
                            </Timeline>
                        </TimelineCard>
                    </Col>
                    <Col xs={12} lg={3}>
                        <StickyContainer>
                            <CardContainer>
                                <StickyContainerTitle>
                                    {t("__CATALOG_DETAIL_STICKY_CONTAINER_REQUIREMENTS_TITLE")}
                                </StickyContainerTitle>
                                {requirements && requirements.description && (
                                    <StickyContainerParagraph>
                                        {requirements.description}
                                    </StickyContainerParagraph>
                                )}
                                <Timeline>
                                    {list.map((item, index) => (
                                        <Timeline.Item
                                            key={index}
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
                            </CardContainer>
                            <WaterButton
                                isPill
                                isPrimary
                                size="medium"
                                onClick={() =>
                                (window.location.href = `mailto:${activeWorkspace?.csm.email || "info@unguess.io"
                                    }`)
                                }
                            >
                                {t("__CATALOG_PAGE_BUTTON_CONTACT_LABEL")}
                            </WaterButton>
                        </StickyContainer>
                    </Col>
                </Row>
            </Grid>
        </>
    )
};

export { ServiceTimeline };