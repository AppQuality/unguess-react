import { theme } from 'src/app/theme';
import { operations, components } from 'src/common/schema';
import { GetUsersMeApiResponse } from './features/api';

export interface UserLoginData {
  username: string;
  password: string;
}

export type UnguessRoutes =
  | 'login'
  | 'projects'
  | 'oops'
  | 'functional-customer-dashboard'
  | 'ux-customer-dashboard'
  | 'integration-center'
  | '';

declare global {
  let react_env: {
    REACT_APP_ENV: string;
  };
  type Theme = typeof theme;
  type UserData = GetUsersMeApiResponse;
  type ApiOperations = operations;
  type ApiComponents = components;
  type SupportedLanguages = 'it' | 'en';
  type OrderType = 'DESC' | 'ASC';
  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };
  type Severities = 'critical' | 'high' | 'medium' | 'low';
  type ItemOfArray<T> = NonNullable<T>[number];
}
