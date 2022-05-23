import {
  Grid,
  Row,
  Col,
  theme,
  Button,
} from "@appquality/unguess-design-system";
import { Separator } from "./Separator";
import { Counters } from "./Counters";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import React from "react";
import { FEATURE_FLAG_SKY_JOTFORM } from "src/constants";
import { PageHeaderContainer } from "src/common/components/pageHeaderContainer";


export const DashboardHeaderContent = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { status, userData } = useAppSelector((state) => state.user);

  const JOTFORM_URL = `https://form.jotform.com/220462541726351`;

  const hasButton =
    userData.features &&
    userData.features.find((feature) => feature.slug === FEATURE_FLAG_SKY_JOTFORM);

  const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
  `;

  const StyledCol = styled(Col)`
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: ${({ theme }) => theme.space.lg};
    }
  `; 

  return status === "idle" || status === "loading" ? (
    <></>
  ) : (
    <>
      <PageHeaderContainer>
        <Grid>
          <Row>
            <StyledCol xs={12} md={6}>{children}</StyledCol>
            {hasButton && (
              <Col xs={12} md={6}>
                <StyledButton
                  isPrimary
                  onClick={() => {
                    window.open(JOTFORM_URL, "_blank")?.focus();
                  }}
                >
                  {t("__DASHBOARD_SKY_JOTFORM_LAUNCH_CP_BUTTON")}
                </StyledButton>
              </Col>
            )}
          </Row>
          <Row
            style={{
              marginTop: theme.space.base * 6 + "px",
              paddingBottom: theme.space.base * 6 + "px",
            }}
          >
            <Col xs={12}>
              <Counters />
            </Col>
          </Row>
        </Grid>
      </PageHeaderContainer>
      <Separator style={{ marginTop: 0 }} />
    </>
  );
};
