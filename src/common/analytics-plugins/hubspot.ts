/* eslint-disable no-underscore-dangle */
import { User } from 'src/features/api';
import { isDev } from '../isDevEnvironment';

declare global {
  interface Window {
    hstc?: string;
    hssc?: string;
    hsfpc?: string;
    _hsq?: Array<any>;
  }
}

interface HubspotConfig {
  portalId: string;
}

interface IPayload {
  type: string;
  userId: string;
}

interface IIdentifyPayload extends IPayload {
  traits: User & { workspace: { id: number; company: string } };
}

function loadHubspotScript(portalId: string) {
  if (window._hsq) {
    return; // Already loaded
  }

  window._hsq = [];

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'hubspot-analytics';
  script.async = true;
  script.defer = true;
  script.src = `https://js.hs-scripts.com/${portalId}.js`;

  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  }
}

// Mapping between internal event names and HubSpot event names
const DEV_EVENT_NAME_MAPPING: Record<string, string> = {
  planDraftCreated: 'pe50612068_plandraftcreated',
  planActivityConfirmed: 'pe50612068_planactivityconfirmed',
  planQuotationRequested: 'pe50612068_planquotationrequested',
  planPurchaseSuccessful: 'pe50612068_planpurchasesuccessful',
};

const EVENT_NAME_MAPPING: Record<string, string> = {
  planDraftCreated: 'pe6087279_plandraftcreated',
  planActivityConfirmed: 'pe6087279_planactivityconfirmed',
  planQuotationRequested: 'pe6087279_planquotationrequested',
  planPurchaseSuccessful: 'pe6087279_planpurchasesuccessful',
};

function getHubspotEventName(eventName: string, isDevEnv?: boolean): string {
  if (isDevEnv) {
    return DEV_EVENT_NAME_MAPPING[`${eventName}`] || eventName;
  }

  return EVENT_NAME_MAPPING[`${eventName}`] || eventName;
}

function identifyContact(email: string, properties: Record<string, any>) {
  if (!window._hsq) {
    return;
  }

  // Use HubSpot's identify API
  window._hsq.push([
    'identify',
    {
      email,
      ...properties,
    },
  ]);
}

function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (!window._hsq) {
    return;
  }

  // Map event name to HubSpot internal event name
  const hubspotEventName = getHubspotEventName(eventName, isDev());

  // Track custom event
  window._hsq.push([
    'trackCustomBehavioralEvent',
    {
      name: hubspotEventName,
      properties: properties || {},
    },
  ]);

  // Alternative: use custom events via POST to HubSpot API if needed
  // This is a basic implementation using the _hsq queue
}

export default function hubspotPlugin(pluginSettings: HubspotConfig) {
  return {
    name: 'hubspot',
    config: { ...pluginSettings },
    initialize: ({ config }: { config: HubspotConfig }) => {
      if (isDev()) {
        console.log('Initializing HubSpot plugin');
      }
      loadHubspotScript(config.portalId);
    },
    identify: ({ payload }: { payload: IIdentifyPayload }) => {
      const { userId, traits } = payload;
      const { workspace, ...basicTraits } = traits;

      if (isDev()) {
        console.log('Identifying user in HubSpot', { userId, traits });
      }

      const properties = {
        ...basicTraits,
        company: workspace.company,
        workspace_id: workspace.id,
      };

      identifyContact(traits.email, properties);
    },

    page: () => {
      if (!window._hsq) {
        return;
      }

      // Track page view (HubSpot automatically tracks page views)
      window._hsq.push(['trackPageView']);
    },

    track: ({
      payload,
    }: {
      payload: IPayload & { event: string; properties: Record<string, any> };
    }) => {
      const { event, properties } = payload;
      trackEvent(event, properties);
    },

    loaded: () => !!window._hsq,
  };
}
