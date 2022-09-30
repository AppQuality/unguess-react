import { CampaignActionProps } from 'src/pages/Dashboard/types';
import i18n from 'src/i18n';

const isReactCampaign = (type: { id: number; name: string }): boolean => {
  // Prototype usability test
  // UX Benchmark Competitor Testing
  // 1 App Monitoring
  // 1 Test Book Testing
  // Explorative Testing
  // Bug Hunting & Customer Feedback
  // Device Compatibility Testing
  // Regression Testing
  // Localization Testing
  // Usability Test
  // Usability test + Metrics
  // 1 Performance Testing
  // 1 Security Bug Bounty Program
  // Accessibility Testing
  // Chatbot and Voice Training & Testing
  // 1 A/B testing
  // Gaming Testing
  // Payment Testing
  // 1 Special UX
  // Moderated Interviews
  // 1 Special functional
  // Always on
  // 1 Webinar
  // 1 Training
  // Instant Functional
  // 1 Recruiting
  // 1 Special
  // 1 Vanity Challenge
  // 1 KPI Challenge
  // 1 Social Challenge
  // Express Exploratory
  // 1 Testbook
  // Functional Challenge
  // UX Challenge
  // 1 Quiz Challenge
  // XPS Bug Hunting
  // XPS Unmoderated Usability Test
  // 1 Survey
  // 1 Diary Study
  // 1 Focus Group
  // 1 Algorithm training
  // Ongoing lab
  // First impression test
  // 1 In-Store Experience
  // Video product test
  // Eye-Tracking Study
  // 1 Vulnerability Assessment
  // 1 Testing Automation

  const name = type.name.toLowerCase();

  switch (name) {
    case 'functional testing (bug hunting)':
      return false;
    case 'user screencast':
      return false;
    case 'entry test':
      return false;
    case 'prototype testing':
      return false;
    case 'competitor benchmark':
      return false;
    case 'app monitoring':
      return false;
    case 'test book testing':
      return false;
    case 'adv testing':
      return false;
    case 'click day':
      return false;
    case 'explorative testing':
      return false;
    case 'new os testing':
      return false;
    case 'bug hunting & customer feedbacks':
      return false;
    case 'device compatibility testing':
      return false;
    case 'regression testing':
      return false;
    case 'localization testing [1 country]':
      return false;
    case 'usability test':
      return false;
    case 'benchmark usability test':
      return false;
    case 'performance testing':
      return false;
    case 'security bug bounty program':
      return false;
    case 'accessibility testing':
      return false;
    case 'chatbot and voice training & testing':
      return false;
    case 'quantitative a/b testing':
      return false;
    case 'qualitative a/b testing':
      return false;
    case 'gaming testing':
      return false;
    case 'payment testing':
      return false;
    case 'complete customer journey analysis':
      return false;
    case 'moderated usability test':
      return false;
    case 'usability test (video subtitled)':
      return false;
    case 'special project':
      return false;
  }

  return true;
};

export function getLocalizeDashboardRoute(props: CampaignActionProps): string {
  const { campaignId, cpFamily, type } = props;

  const currentLang = i18n.language || 'en';
  let localizedRoute = '';

  if (isReactCampaign(type)) {
    localizedRoute = `${currentLang}/campaigns/${campaignId}`;
  } else if (cpFamily.toLocaleLowerCase() === 'functional') {
    localizedRoute =
      currentLang === 'en'
        ? `/functional-customer-dashboard/?cid=${campaignId}`
        : `it/dashboard-campagne-funzionali/?cid=${campaignId}`;
  } else {
    localizedRoute =
      currentLang === 'en'
        ? `/ux-customer-dashboard/?cid=${campaignId}`
        : `it/dashboard-campagne-esperienziali/?cid=${campaignId}`;
  }

  // in case of base route ("") we already have a forward slash
  const re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}
