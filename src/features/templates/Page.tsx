import React, { useEffect } from "react";
import {
  Chrome,
  Body,
  theme,
  PageLoader,
} from "@appquality/unguess-design-system";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Navigation } from "../navigation/Navigation";
import styled from "styled-components";
import { GoogleTagManager } from "src/common/GoogleTagManager";
import TagManager from "react-gtm-module";
import { fetchUser } from "../user/actions/fetchUser";
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
