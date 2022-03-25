import React, { useEffect } from "react";
import { Chrome, Body, theme } from "@appquality/unguess-design-system";
import PageLoader from "./PageLoader";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { Navigation } from "../navigation/Navigation";

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
      <Body>
        <Navigation route={route} user={userData}>
          {/* Add space to content when sidebar exists */}
          <div style={{ margin: `0 ${theme.space.xxl}` }}>
            {children}
            </div>
        </Navigation>
      </Body>
    </Chrome>
  );
};
