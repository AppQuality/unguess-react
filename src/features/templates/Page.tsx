import React, { useEffect } from "react";
import { Chrome, Body, theme } from "@appquality/unguess-design-system";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Navigation } from "../navigation/Navigation";
import styled from "styled-components";
import { GoogleTagManager } from "src/common/GoogleTagManager";
import TagManager from "react-gtm-module";
import { getWorkspaces } from "../workspaces/actions";
import { selectWorkspaces } from "../workspaces/workspaceSlice";
import { setWorkspace } from "../navigation/navigationSlice";

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

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.palette.grey[100]};
  `;

  const { status } = useAppSelector((state) => state.user);

  if (status === "failed") {
    navigate(loginRoute);
  }

  //App ready
  TagManager.dataLayer({
    dataLayer: {
      event: "UnguessLoaded",
    },
  });

  return (
    <GoogleTagManager title={title || "UNGUESS - BE SMART FROM THE START"}>
      <Chrome isFluid hue={theme.palette.white}>
        <Body style={{ backgroundColor: theme.palette.grey[100] }}>
          <Navigation route={route}>
            <Container>{children}</Container>
          </Navigation>
        </Body>
      </Chrome>
    </GoogleTagManager>
  );
};
