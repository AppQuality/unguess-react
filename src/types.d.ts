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

interface UserLoginData {
  username: string;
  password: string;
}

export type CrowdRoutes =
  | "getting-started"
  | "my-dashboard"
  | "personal-equipment"
  | "my-bugs"
  | "experience-points"
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
