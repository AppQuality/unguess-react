import { createContext, useContext, useMemo, useState } from 'react';

interface ModuleTouchpointsContextType {
  modalRef: HTMLButtonElement | null;
  setModalRef: (ref: HTMLButtonElement | null) => void;
}

const ModuleTouchpointsContext =
  createContext<ModuleTouchpointsContextType | null>(null);

export const ModuleTouchpointsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalRef, setModalRef] =
    useState<ModuleTouchpointsContextType['modalRef']>(null);

  const moduleTouchpointsContextValue = useMemo(
    () => ({
      modalRef,
      setModalRef,
    }),
    [modalRef, setModalRef]
  );

  return (
    <ModuleTouchpointsContext.Provider value={moduleTouchpointsContextValue}>
      {children}
    </ModuleTouchpointsContext.Provider>
  );
};

export const useModuleTouchpointsContext = () => {
  const context = useContext(ModuleTouchpointsContext);

  if (!context)
    throw new Error('Provider not found for ModuleTouchpointsContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
