import React, { useEffect } from "react";
import {
  Chrome,
  Body,
  theme,
  PageLoader,
  Main,
} from "@appquality/unguess-design-system";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Navigation } from "../navigation/Navigation";
import styled from "styled-components";
import TagManager from "react-gtm-module";
import { fetchUser } from "../user/actions/fetchUser";

export const Logged = ({
  children,
  pageHeader,
  route,
}: {
  children: React.ReactNode;
  pageHeader?: React.ReactNode;
  route: string;
}) => {
  const dispatch = useAppDispatch();
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

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin: ${({ theme }) => theme.space.xxl }
    }

  `;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { status, userData } = useAppSelector((state) => state.user);

  if (status === "failed") {
    navigate(loginRoute);
  }

  if (status === "logged") {
    //App ready
    TagManager.dataLayer({
      dataLayer: {
        role: userData.role,
        wp_user_id: userData.tryber_wp_user_id,
        tester_id: userData.id,
        event: "UnguessLoaded",
      },
    });
  }

  return status === "idle" || status === "loading" ? (
    <PageLoader />
  ) : (
    <Chrome isFluid hue={theme.palette.white}>
      <Body style={{ backgroundColor: theme.palette.grey[100] }}>
        <Navigation route={route}>
          <Main style={{ backgroundColor: "transparent", margin: 0 }}>
            {pageHeader && pageHeader}
            <Container>{children}</Container>
          </Main>
        </Navigation>
      </Body>
    </Chrome>
  );
};
