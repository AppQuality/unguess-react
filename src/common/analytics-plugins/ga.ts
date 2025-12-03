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

interface IPayload {
  type: string;
  userId: string;
}

interface IIdentifyPayload extends IPayload {
  traits: Record<string, any>;
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
    identify: ({ payload }: { payload: IIdentifyPayload }) => {
      ReactGA.set({ user_id: payload.userId });
    },
    page: ({ payload }: { payload: { properties?: Record<string, any> } }) => {
      // Track pageview
      ReactGA.send({ hitType: 'pageview', ...payload?.properties });
    },
    track: ({
      payload,
    }: {
      payload: IPayload & { event: string; properties: Record<string, any> };
    }) => {
      // Track custom event
      ReactGA.event({
        category: payload.type || 'event',
        action: payload.event,
        ...payload.properties,
      });
    },
    loaded: () => true,
  };
}
