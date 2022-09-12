import { addBusinessDays } from 'date-fns';
import { EXPRESS_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { WizardModel } from './wizardModel';

const values: WizardModel = {
  campaign_name: '',
  product_type: 'webapp',
  campaign_reason: 'reason-a',
  withSmartphone: false,
  withDesktop: false,
  withTablet: false,
  customBrowser: false,
  customBrowserFilled: false,
  withChrome: false,
  withSafari: false,
  withFirefox: false,
  withEdge: false,
  hasOutOfScope: false,
  outOfScope: '',
  iOSLink: '',
  androidLink: '',
  isIOS: false,
  isAndroid: false,
  link: '',
  campaign_language: '',
  test_description: '',
  use_cases: [],
  campaign_date: new Date(),
  campaign_date_end: addBusinessDays(new Date(), EXPRESS_BUSINESS_DAYS_TO_ADD),
  age_range: 'all',
  gender: 'all',
  digital_literacy: 'all',
  has_bug_form: false,
  has_bug_parade: false,
  base_cp_duration: EXPRESS_BUSINESS_DAYS_TO_ADD,
};

export default values;
