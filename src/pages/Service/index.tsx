import { Page } from "src/features/templates/Page";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { useGetServicesByIdQuery } from "src/features/backoffice";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import {
  Anchor,
  Breadcrumb,
  Button,
  Col,
  Grid,
  LG,
  Paragraph,
  Row,
  Span,
  Tag,
  theme,
  XXL,
} from "@appquality/unguess-design-system";
import { ReactComponent as TailoredIcon } from "src/assets/icons/tailored-icon.svg";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ReactComponent as ExperientialIcon } from "src/assets/icons/megaphone-stroke.svg";
import { ReactComponent as FunctionalIcon } from "src/assets/icons/functional-icon.svg";
import { ReactComponent as BugIcon } from "src/assets/icons/bug-icon.svg";
import { PageHeaderContainer } from "src/common/components/pageHeaderContainer";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { FEATURE_FLAG_CATALOG } from "src/constants";
import { Feature } from "src/features/api";
import { openDrawer } from "src/features/express/expressSlice";

const CampaignType = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
`;

const ServiceTitle = styled(XXL)`
  color: ${({ theme }) => theme.colors.primaryHue};
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ServiceDescription = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const CTAButton = styled(Button)`
  margin: ${({ theme }) => theme.space.md} 0;
`;

export default function Service() {
  const { t } = useTranslation();
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute("oops");
  const homeRoute = useLocalizeRoute("");
  const servicesRoute = useLocalizeRoute("templates");

  const { userData, status } = useAppSelector((state) => state.user);


  if (
    status === "logged" &&
    (!userData.features ||
      !userData.features.find(
        (feature: Feature) => feature.slug === FEATURE_FLAG_CATALOG
      ))
  ) {
    navigate(notFoundRoute, { replace: true });
  }

  if (!templateId || isNaN(Number(templateId))) {
    navigate(notFoundRoute, { replace: true });
  }
  const { data, error, isLoading } = useGetServicesByIdQuery({
    id: templateId ? templateId : "",
  }); // TODO: populate

  const serviceName = data ? data.data?.attributes?.title : "";
  const campaignType = data ? data.data?.attributes?.campaign_type : "";
  const serviceDescription = data ? data.data?.attributes?.description : "";
  const isExpress = data ? data.data?.attributes?.is_express : false;
  const isFunctional = data ? data.data?.attributes?.is_functional : false;
  const days = data ? data.data?.attributes?.duration_in_days : 3;
  const hours = (days ? days : 3) * 24;
  const environment = data ? data.data?.attributes?.environment : "";
  const bannerImg = data ? data.data?.attributes?.output_image : "";

  console.log(">>>> bannerImg", bannerImg);

  return (
    <Page
      pageHeader={
        <PageHeaderContainer>
          <Grid>
            <Row>
              <Col xs={12} lg={6}>
                <Breadcrumb>
                  <Anchor
                    onClick={() => navigate(homeRoute, { replace: true })}
                  >
                    {t("__BREADCRUMB_ITEM_DASHBOARD")}
                  </Anchor>
                  <Anchor
                    onClick={() => navigate(servicesRoute, { replace: true })}
                  >
                    {t("__BREADCRUMB_ITEM_SERVICES")}
                  </Anchor>
                  <Span>{campaignType}</Span>
                </Breadcrumb>
                <CampaignType>{campaignType}</CampaignType>
                <ServiceTitle>{serviceName}</ServiceTitle>
                <ServiceDescription>{serviceDescription}</ServiceDescription>
                <TagsContainer>
                  {isExpress ? (
                    <Tag
                      size="large"
                      isPill
                      isRegular
                      hue={theme.palette.grey[100]}
                    >
                      <Tag.Avatar>
                        <ExpressIcon />
                      </Tag.Avatar>
                      <Span>{t("__EXPRESS_LABEL")}</Span>
                    </Tag>
                  ) : (
                    <Tag
                      size="large"
                      isPill
                      isRegular
                      hue={theme.palette.grey[100]}
                    >
                      <Tag.Avatar>
                        <TailoredIcon />
                      </Tag.Avatar>
                      <Span>{t("__TAILORED_LABEL")}</Span>
                    </Tag>
                  )}
                  {isFunctional ? (
                    <Tag
                      size="large"
                      isPill
                      isRegular
                      hue={theme.palette.grey[100]}
                    >
                      <Tag.Avatar>
                        <FunctionalIcon />
                      </Tag.Avatar>
                      <Span>{t("__FUNCTIONAL_LABEL")}</Span>
                    </Tag>
                  ) : (
                    <Tag
                      size="large"
                      isPill
                      isRegular
                      hue={theme.palette.grey[100]}
                    >
                      <Tag.Avatar>
                        <ExperientialIcon />
                      </Tag.Avatar>
                      <Paragraph>{t("__EXPERIENTIAL_LABEL")}</Paragraph>
                    </Tag>
                  )}
                  <Tag
                    size="large"
                    isPill
                    isRegular
                    hue={theme.palette.grey[100]}
                  >
                    <Tag.Avatar>
                      <ExpressIcon />
                    </Tag.Avatar>
                    <Paragraph>
                      <Trans i18nKey="__SERVICE_DETAIL_PAGE_TAG_RESULTS_DAYS_LABEL">
                        First results in <Span isBold>{{ hours: hours }}</Span>h
                      </Trans>
                    </Paragraph>
                  </Tag>
                  <Tag
                    size="large"
                    isPill
                    isRegular
                    hue={theme.palette.grey[100]}
                  >
                    <Tag.Avatar>
                      <BugIcon />
                    </Tag.Avatar>
                    <Paragraph>{environment}</Paragraph>
                  </Tag>
                </TagsContainer>
                {isExpress ? (
                  <CTAButton
                    size="medium"
                    isPrimary
                    isPill
                    onClick={() => dispatch(openDrawer())}
                  >
                    {t("__CATALOG_PAGE_BUTTON_EXPRESS_LABEL")}
                  </CTAButton>
                ) : (
                  <CTAButton
                    size="medium"
                    isPrimary
                    isPill
                    onClick={() => alert("mailto csm")}
                  >
                    {t("__CATALOG_PAGE_BUTTON_CONTACT_LABEL")}
                  </CTAButton>
                )}
              </Col>
              <Col xs={12} lg={6}>
                {/* banner */}
              </Col>
            </Row>
          </Grid>
        </PageHeaderContainer>
      }
      title={serviceName}
      route={"templates"}
    >
      {error ? (
        <pre>{">>> error: " + JSON.stringify(error)}</pre>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <pre>{">>> data: " + JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </Page>
  );
}
