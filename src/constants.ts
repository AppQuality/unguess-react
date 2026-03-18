import { addBusinessDays } from 'date-fns';

const today = new Date();
today.setHours(7);
today.setMinutes(59);
today.setSeconds(0);

export const PLAN_MINIMUM_DATE = addBusinessDays(today, 1);
export const FEATURE_FLAG_SKY_JOTFORM = 'sky-custom-jotform';
export const FEATURE_FLAG_CATALOG = 'catalog-pages';
export const FEATURE_FLAG_TAGGING_TOOL = 'tagging-tool';
export const FEATURE_FLAG_CHANGE_MODULES_VARIANTS = 'change-modules-variants';
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
export const SERVICES_SHOW_TIPS = true;

export const DEFAULT_BUG_PRIORITY = {
  id: 3,
  name: 'medium',
};

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

export const DEFAULT_NOT_A_BUG_CUSTOM_STATUS = {
  id: 7,
  name: 'not a bug',
  color: 'ffffff',
  is_default: 1,
  phase: {
    id: 1,
    name: 'working',
  },
};
