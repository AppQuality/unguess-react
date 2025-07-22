import { createContext, useContext, useMemo, useState } from 'react';

type ProfileAccordions = 'password';

interface ProfileContextType {
  openAccordions: ProfileAccordions[];
  setOpenAccordions: (accordions: ProfileAccordions[]) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAccordions, setOpenAccordions] = useState<ProfileAccordions[]>([]);

  const profileContextValue = useMemo(
    () => ({
      openAccordions,
      setOpenAccordions,
    }),
    [openAccordions, setOpenAccordions]
  );

  return (
    <ProfileContext.Provider value={profileContextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context)
    throw new Error('Provider not found for ProfileContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
