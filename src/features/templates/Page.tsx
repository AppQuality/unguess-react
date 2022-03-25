import React, { useEffect } from "react";
import { Chrome, Body, Main, theme } from "@appquality/unguess-design-system";
import PageLoader from "./PageLoader";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";

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
  }, [loginRoute, navigate, status])

  
  if (status === "idle" || status === "loading") {
    return <PageLoader />;
  }

 



  return (
    <Chrome isFluid hue={theme.palette.white}>
      <Body>{children}</Body>
    </Chrome>
  );
};
