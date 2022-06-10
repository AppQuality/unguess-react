import React, { createContext, useContext, useMemo } from 'react';
import useScript from 'src/hooks/useScript';

export interface HubspotContextProps {
  readonly loaded: boolean; // Is Hubspot script loaded
  readonly error: boolean; // Is Hubspot failed to loaded
}

export const HubspotContext = createContext<HubspotContextProps>({
  loaded: false,
  error: false,
});

export const useHubspotContext = () => useContext(HubspotContext);

interface HubspotProviderProps {
  readonly async?: boolean;
  readonly addToHead?: boolean;
  readonly children: React.ReactNode;
}

const HubspotProvider = ({
  async,
  addToHead,
  children,
}: HubspotProviderProps) => {
  // Attach hubspot script to the document
  const [loaded, error] = useScript(
    'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js',
    async,
    addToHead
  );

  const HSProviderValue = useMemo(() => ({ loaded, error }), [loaded, error]);

  return (
    <HubspotContext.Provider value={HSProviderValue}>
      {children}
    </HubspotContext.Provider>
  );
};

export default HubspotProvider;
