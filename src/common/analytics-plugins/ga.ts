import ReactGA from 'react-ga4';
import { isDev } from '../isDevEnvironment';

declare global {
  interface Window {
    ga_initialized?: boolean;
  }
}

interface GAConfig {
  measurementId: string;
}

interface IdentifyPayload {
  userId: string;
  traits: Record<string, any>;
}

interface EventPayload {
  event: string;
  properties: Record<string, any>;
}

export default function gaPlugin(pluginSettings: GAConfig) {
  return {
    name: 'google-analytics-4',
    config: { ...pluginSettings },
    initialize: ({ config }: { config: GAConfig }) => {
      if (!window.ga_initialized) {
        ReactGA.initialize(config.measurementId);
        window.ga_initialized = true;
      }
    },
    identify: ({ payload }: { payload: IdentifyPayload }) => {
      ReactGA.set({ user_id: payload.userId, ...payload.traits });
    },
    page: ({ payload }: { payload: { properties?: Record<string, any> } }) => {
      // Track pageview
      ReactGA.send({ hitType: 'pageview', ...payload?.properties });
    },
    track: ({ payload }: { payload: EventPayload }) => {
      // Track custom event
      ReactGA.event(payload.event, {
        ...payload.properties,
      });
    },
    loaded: () => true,
  };
}
