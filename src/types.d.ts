import { theme } from "@appquality/unguess-design-system";
import { operations, components } from "src/common/schema";

export type User = undefined | UserData;

export interface UserStatus {
  refresh?: () => void;
  login?: (data: UserLoginData) => void;
  user: User;
  isLoading: boolean;
  error: HttpError;
}

export interface UserLoginData {
  username: string;
  password: string;
}

export type UnguessRoutes =
  | "login"
  | "projects"
  | "functional-customer-dashboard"
  | "ux-customer-dashboard"
  | "integration-center"
  | "";


declare global {
  type Theme = typeof theme;
  type UserData = any;
  type HttpError = HttpError;
  type ApiOperations = operations;
  type ApiComponents = components;
  type SupportedLanguages = "it" | "en";
  type OrderType = "DESC" | "ASC";
}
