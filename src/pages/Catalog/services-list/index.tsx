import { useTranslation } from "react-i18next";
import { ServiceListResponse } from "src/features/backoffice";
import { useNavigate } from "react-router-dom";
import i18n from "src/i18n";
import { getLocalizeRoute } from "src/hooks/useLocalizeDashboardUrl";
import { Button, Col, InfoCard, Paragraph, Row, ServiceCard, Span, theme } from "@appquality/unguess-design-system";
import styled from "styled-components";
import { ReactComponent as TailoredIcon } from "src/assets/icons/tailored-icon.svg";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ReactComponent as ExperientialIcon } from "src/assets/icons/megaphone-stroke.svg";
import { ReactComponent as FunctionalIcon } from "src/assets/icons/functional-icon.svg";

const ServicesContainer = styled.div``;

const ServiceCol = styled(Col)`
    margin-bottom: ${theme.space.lg};
`;

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || "";

const CardGroup = ({ items }: { items: any }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const services = items.slice(0, 3);

    const navigateToService = (serviceId: number) => {
        const localizedRoute =
            i18n.language === "en"
                ? `/services/${serviceId}`
                : `/${i18n.language}/services/${serviceId}`;

        navigate(localizedRoute);
    };

    const clickToggle = (serviceId: number, cpType: string) => {
        window.location.href = getLocalizeRoute(serviceId, cpType);
    };

    return (
        <>
            {services.map((service: any) => {
                const iconUrl = STRAPI_URL + service?.attributes?.icon?.data?.attributes?.url;
                let tags = [];
                let buttons = [];

                buttons.push(
                    <Button isPill isStretched size="small">{t("__CATALOG_PAGE_BUTTON_HOW_LABEL")}</Button>
                )

                if (service?.attributes?.is_express) {
                    tags.push({
                        label: t("__EXPRESS_LABEL"),
                        icon: <ExpressIcon />,
                    })

                    buttons.push(
                        <Button isPill isStretched size="small" isPrimary>{t("__CATALOG_PAGE_BUTTON_EXPRESS_LABEL")}</Button>
                    )
                } else {
                    tags.push({
                        label: t("__TAILORED_LABEL"),
                        icon: <TailoredIcon />,
                    })

                    buttons.push(
                        <Button isPill isStretched size="small" isPrimary>{t("__CATALOG_PAGE_BUTTON_CONTACT_LABEL")}</Button>
                    )
                }

                if (service?.attributes?.is_functional) {
                    tags.push({
                        label: t("__DASHABOARD_CAMPAIGN_TYPE_FILTER_FUNCTIONAL"),
                        icon: <FunctionalIcon />,
                    })
                } else {
                    tags.push({
                        label: t("__DASHABOARD_CAMPAIGN_TYPE_FILTER_EXPERIENTIAL"),
                        icon: <ExperientialIcon />,
                    })
                }

                return (
                    service.is_info ? (
                        <ServiceCol xs={12} md={6} lg={4}>
                            <InfoCard
                                infoImg={service.info_img}
                                infoTitle={service.info_title}
                                infoSubtitle={service.info_subtitle}
                                infoButtons={service.info_buttons}
                            />
                        </ServiceCol>
                    ) : (
                        <ServiceCol xs={12} md={6} lg={4}>
                            <ServiceCard
                                serviceIcon={<img src={iconUrl} />}
                                serviceTitle={service?.attributes?.title}
                                serviceSubtitle={service?.attributes?.campaign_type}
                                tags={tags}
                                isHoverable
                                hoverTitle={service?.attributes?.campaign_type}
                                hoverSubtitle={service?.attributes?.description}
                                hoverButtons={buttons}
                            />
                        </ServiceCol>
                    )
                )
            })}

            {items.length > 4 && (
                <Col size={12}>
                    <Button isBasic onClick={() => navigateToService(services[0].project_id)}>
                        {t("__DASHBOARD_CARD_GROUP_LIST_BUTTON_SHOW_ALL MAX:10")}
                    </Button>
                </Col>
            )}
        </>
    );
};

export const Services = ({
    services,
}: {
    services: any;
}) => {
    const { t } = useTranslation();

    return (
        <ServicesContainer>
            <Row>
                <CardGroup items={services} />
            </Row>
        </ServicesContainer>
    )
};