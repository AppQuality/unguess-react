import React from "react";
import { GoogleTagManager } from "src/common/GoogleTagManager";
import { Logged } from "./Logged";

export const Page = ({
  children,
  title,
  route,
}: {
  children: React.ReactNode;
  title?: string;
  route: string;
}) => {

  return (
    <GoogleTagManager title={title || "UNGUESS - BE SMART FROM THE START"}>
      <Logged route={route}>{children}</Logged>
    </GoogleTagManager>
  );
};
