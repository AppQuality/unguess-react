import { User } from 'src/features/api';
import { Userpilot } from 'userpilot';

declare global {
  interface Window {
    userpilot?: {
      initialized: number;
    };
  }
}

interface UserpilotConfig {
  token: string;
  name?: string;
}

interface IPayload {
  type: string;
  userId: string;
}

interface IIdentifyPayload extends IPayload {
  traits: User & { workspace: { id: number; company: string } };
}

export default function userpilotPlugin(pluginSettings: UserpilotConfig) {
  return {
    name: 'userpilot',
    config: { ...pluginSettings },
    initialize: ({ config }: { config: UserpilotConfig }) => {
      Userpilot.initialize(config.token);
    },
    identify: ({ payload }: { payload: IIdentifyPayload }) => {
      const { userId, traits } = payload;
      const { workspace, ...basicTraits } = traits;

      Userpilot.identify(userId, {
        ...basicTraits,
        company: {
          id: workspace.id,
          name: workspace.company,
        },
      });
    },

    page: () => {
      Userpilot.reload();
    },

    track: ({
      payload,
    }: {
      payload: IPayload & { event: string; properties: Record<string, any> };
    }) => {
      const { event, properties, userId } = payload;
      Userpilot.track(event, { ...properties, userId });
    },

    loaded: () => !!window.userpilot,
  };
}
