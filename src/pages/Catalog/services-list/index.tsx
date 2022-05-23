import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "src/i18n";
import { Button, Col, InfoCard, Row, ServiceCard, theme } from "@appquality/unguess-design-system";
import styled from "styled-components";
import { ReactComponent as TailoredIcon } from "src/assets/icons/tailored-icon.svg";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ReactComponent as ExperientialIcon } from "src/assets/icons/experiential-icon.svg";
import { ReactComponent as FunctionalIcon } from "src/assets/icons/functional-icon.svg";
import { WaterButton } from "src/pages/ExpressWizard/waterButton";

const ServicesContainer = styled.div``;

const ServiceCol = styled(Col)`
    margin-bottom: ${theme.space.lg};
`;

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || "";

const CardGroup = ({ items }: { items: any }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const navigateToService = (serviceId: number) => {
        const localizedRoute =
            i18n.language === "en"
                ? `/templates/${serviceId}`
                : `/${i18n.language}/templates/${serviceId}`;

        navigate(localizedRoute);
    };

    return (
        <>
            {
                items.map((service: any) => {
                    const iconUrl = STRAPI_URL + service?.attributes?.icon?.data?.attributes?.url;
                    let tags = [];
                    let buttons = [];

                    buttons.push(
                        <Button isPill isStretched size="small" onClick={() => navigateToService(service.id)}>{t("__CATALOG_PAGE_BUTTON_HOW_LABEL")}</Button>
                    )

                    if (service?.attributes?.is_express) {
                        tags.push({
                            label: t("__EXPRESS_LABEL"),
                            icon: <ExpressIcon />,
                        })

                        buttons.push(
                            <WaterButton isPill isStretched size="small" isPrimary onClick={() => alert("open drawer")}>{t("__CATALOG_PAGE_BUTTON_EXPRESS_LABEL")}</WaterButton>
                        )
                    } else {
                        tags.push({
                            label: t("__TAILORED_LABEL"),
                            icon: <TailoredIcon />,
                        })

                        buttons.push(
                            <WaterButton isPill isStretched size="small" isPrimary onClick={() => alert("mailto csm")}>{t("__CATALOG_PAGE_BUTTON_CONTACT_LABEL")}</WaterButton>
                        )
                    }

                    if (service?.attributes?.is_functional) {
                        tags.push({
                            label: t("__FUNCTIONAL_LABEL"),
                            icon: <FunctionalIcon />,
                        })
                    } else {
                        tags.push({
                            label: t("__EXPERIENTIAL_LABEL"),
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
                })
            }
        </>
    );
};

export const Services = ({
    services,
}: {
    services: any;
}) => {
    const chunkSize = 3;
    const chunks = sliceIntoChunks(services, chunkSize);

    return (
        <ServicesContainer>
            {chunks.map((chunk: any) => {
                return (
                    <Row>
                        <CardGroup items={chunk} />
                    </Row>
                )
            })}
        </ServicesContainer>
    )
};

const sliceIntoChunks = (array: Array<any>, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}