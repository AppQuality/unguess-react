import { Page } from "src/features/templates/Page";
import { useTranslation } from "react-i18next";
import { useGetServicesQuery } from "src/features/backoffice";
import styled from "styled-components";
import { theme, Col, Grid, Row, MD, Card, Paragraph, Timeline, XXL, Divider, Button } from "@appquality/unguess-design-system";
import { ReactComponent as TailoredIcon } from "src/assets/icons/tailored-icon.svg";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ReactComponent as InfoImg } from "../../assets/icons/info-image.svg";
import { Services } from "./services-list";

const StickyContainer = styled(Card)`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: ${theme.space.base * 6}px;
  padding-top: ${theme.space.xl};
  background-color: ${theme.palette.white};
`;

const StickyContainerTitle = styled(MD)`
  color: ${theme.palette.grey[600]};
  margin-bottom: ${theme.space.xs};
`;

const StickyContainerParagraph = styled(Paragraph)`
  color: ${theme.palette.grey[800]};
  margin-bottom: ${theme.space.xs};
`;

const PageContent = styled.div`
  width: 100%;
  padding-top: ${theme.space.xl};
`;

const PageTitle = styled(XXL)`
  margin-bottom: ${theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${theme.space.base * 3}px;
  margin-bottom: ${theme.space.base * 6}px;
`;

export default function Catalog() {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetServicesQuery({
    populate: "*",
  });

  let services = [];

  if (data) {
    if (data.data) {
      data.data.map((service) => {
        services.push(service);
      });
    }
  }

  // Add info card service
  services.push({
    is_info: true,
    info_img: <InfoImg />,
    info_subtitle: t("__CATALOG_PAGE_INFO_SERVICE_SUBTITLE"),
    info_title: t("__CATALOG_PAGE_INFO_SERVICE_TITLE"),
    info_buttons: [
      <Button isPill isPrimary size="small" onClick={() => alert("mailto csm info")}>{t("__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL")}</Button>,
    ]
  });

  return (
    <Page title={t("__PAGE_TITLE_CATALOG")} route={"templates"}>
      {error ? (
        <pre>{">>> error: " + JSON.stringify(error)}</pre>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid gutters={"lg"}>
          <Row>
            <Col xs={12} lg={3}>
              <StickyContainer>
                <StickyContainerTitle>{t("__CATALOG_STICKY_CONTAINER_TITLE")}</StickyContainerTitle>
                <StickyContainerParagraph>{t("__CATALOG_STICKY_CONTAINER_PARAGRAPH")}</StickyContainerParagraph>
                <Timeline>
                  <Timeline.Item hiddenLine icon={<ExpressIcon />}>
                    <Timeline.Content>
                      <Paragraph style={{ fontWeight: 500 }}>{t("__EXPRESS_LABEL")}</Paragraph>
                      {t("__CATALOG_STICKY_CONTAINER_TIMELINE_ITEM_1_DESCRIPTION")}
                    </Timeline.Content>
                  </Timeline.Item>
                  <Timeline.Item hiddenLine icon={<TailoredIcon />}>
                    <Timeline.Content>
                      <Paragraph style={{ fontWeight: 500 }}>{t("__TAILORED_LABEL")}</Paragraph>
                      {t("__CATALOG_STICKY_CONTAINER_TIMELINE_ITEM_2_DESCRIPTION")}
                    </Timeline.Content>
                  </Timeline.Item>
                </Timeline>
              </StickyContainer>
            </Col>
            <Col xs={12} lg={9}>
              <PageContent>
                <PageTitle>{t("__CATALOG_PAGE_CONTENT_TITLE")}</PageTitle>
                <Paragraph>{t("__CATALOG_PAGE_CONTENT_PARAGRAPH")}</Paragraph>
                <StyledDivider />
                {services.length > 0 ? (
                  <Services services={services} />
                ) : (
                  <Paragraph>{t("__CATALOG_PAGE_CONTENT_NO_SERVICES")}</Paragraph>
                )}
              </PageContent>
            </Col>
          </Row>
        </Grid>
      )}

    </Page>
  );
}
