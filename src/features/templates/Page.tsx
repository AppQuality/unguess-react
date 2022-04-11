import React, { useEffect } from "react";
import { Chrome, Body, theme } from "@appquality/unguess-design-system";
import PageLoader from "./PageLoader";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { Navigation } from "../navigation/Navigation";
import styled from "styled-components";
import { GoogleTagManager } from "src/common/GoogleTagManager";

export const Page = ({
  children,
  title,
  route,
}: {
  children: React.ReactNode;
  title?: string;
  route: string;
}) => {
  const loginRoute = useLocalizeRoute("login");
  const navigate = useNavigate();

  const Container = styled.div`
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  `;

  const { status, userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === "failed") {
      navigate(loginRoute);
    }
  }, [loginRoute, navigate, status]);

  if (status === "idle" || status === "loading") {
    return <PageLoader />;
  }

  return (
    <Chrome isFluid hue={theme.palette.white}>
      <GoogleTagManager title={title || "UNGUESS - BE SMART FROM THE START"} user={userData}>
        <Body>
          <Navigation route={route} user={userData}>
            <Container>{children}</Container>
          </Navigation>
        </Body>
      </GoogleTagManager>
    </Chrome>
  );
};
