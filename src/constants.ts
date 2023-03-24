import { OrderSelection } from './types';

export const FEATURE_FLAG_EXPRESS = 'exploratory-express';
export const FEATURE_FLAG_SKY_JOTFORM = 'sky-custom-jotform';
export const FEATURE_FLAG_CATALOG = 'catalog-pages';
export const EXPRESS_1_CAMPAIGN_TYPE_ID = 46;
export const EXPRESS_2_CAMPAIGN_TYPE_ID = 51;
export const EXPRESS_3_CAMPAIGN_TYPE_ID = 52;
export const EXPRESS_4_CAMPAIGN_TYPE_ID = 66;
export const BASE_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';
export const ZAPIER_WEBHOOK_TRIGGER =
  process.env.REACT_ZAPIER_WEBHOOK ||
  'https://hooks.zapier.com/hooks/catch/5196925/bkxm1k6/';

export const SMARTPHONE_ANDROID = { id: 1, deviceType: 0 };
export const SMARTPHONE_IOS = { id: 2, deviceType: 0 };
export const TABLET_ANDROID = { id: 10, deviceType: 1 };
export const TABLET_IOS = { id: 11, deviceType: 1 };
export const DESKTOP_MAC = { id: 7, deviceType: 2 };
export const DESKTOP_WINDOWS = { id: 8, deviceType: 2 };

export const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
export const DEFAULT_EXPRESS_REQUIRED_COINS = 1;
export const SERVICES_SHOW_TIPS = true;
export const EXPRESS_USE_CASES_LIMIT = 5;

export const DEFAULT_BUG_PRIORITY = {
  id: 3,
  name: 'medium',
};

export const EXPRESS_START_DATE_MAX_VALUE = 30;
export const EXPRESS_BUSINESS_DAYS_TO_ADD = 2;
export const EXPRESS_3_BUSINESS_DAYS_TO_ADD = 3;
export const EXPRESS_4_UX_TAGGING_BUSINESS_DAYS_TO_ADD = 5;

export const RELATIVE_DATE_FORMAT_OPTS: {
  [key: string]: { [key: string]: string };
} = {
  en: {
    lastWeek: "EEEE','  d MMMM Y",
    yesterday: "'Yesterday,' EEEE d MMMM",
    today: "'Today,' EEEE d MMMM",
    tomorrow: "'Tomorrow,' EEEE d MMMM",
    nextWeek: "EEEE',' d MMMM Y",
    other: "EEEE',' d MMMM Y",
  },
  it: {
    lastWeek: "EEEE',' d MMMM Y",
    yesterday: "'Ieri,' EEEE d MMMM",
    today: "'Oggi,' EEEE d MMMM",
    tomorrow: "'Domani,' EEEE d MMMM",
    nextWeek: "EEEE',' d MMMM Y",
    other: "EEEE',' d MMMM Y",
  },
};

export const SEVERITY_ORDER__HIGH__TO__LOW: OrderSelection = {
  key: 'severity-desc',
  title: '__BUGS_PAGE_BUG_DETAIL_SEVERITY_TITLE_H_TO_L',
  orderBy: 'severity_id',
  displayName: '__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL',
  order: 'DESC',
  orderName: '__BUGS_ORDER_HIGHEST_TO_LOWEST',
};

export const SEVERITY_ORDER__LOW__TO__HIGH: OrderSelection = {
  key: 'severity-asc',
  title: '__BUGS_PAGE_BUG_DETAIL_SEVERITY_TITLE_L_TO_H',
  orderBy: 'severity_id',
  displayName: '__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL',
  order: 'ASC',
  orderName: '__BUGS_ORDER_LOWEST_TO_HIGHEST',
};

export const PRIORITY_ORDER__HIGH__TO__LOW: OrderSelection = {
  key: 'priority-desc',
  title: '__BUGS_PAGE_BUG_DETAIL_PRIORITY_TITLE_H_TO_L',
  orderBy: 'priority_id',
  displayName: '__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL',
  order: 'DESC',
  orderName: '__BUGS_ORDER_HIGHEST_TO_LOWEST',
};

export const PRIORITY_ORDER__LOW__TO__HIGH: OrderSelection = {
  key: 'priority-asc',
  title: '__BUGS_PAGE_BUG_DETAIL_PRIORITY_TITLE_L_TO_H',
  orderBy: 'priority_id',
  displayName: '__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL',
  order: 'ASC',
  orderName: '__BUGS_ORDER_LOWEST_TO_HIGHEST',
};

export const DEFAULT_ORDER_BY = SEVERITY_ORDER__HIGH__TO__LOW;
