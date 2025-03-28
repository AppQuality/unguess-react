import { createContext, useContext, useMemo, useState } from 'react';

interface PlanNavContextType {
  modalRef: HTMLButtonElement | null;
  setModalRef: (ref: HTMLButtonElement | null) => void;
}

const PlanNavContext = createContext<PlanNavContextType | null>(null);

export const PlanNavContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalRef, setModalRef] =
    useState<PlanNavContextType['modalRef']>(null);

  const planNavContextValue = useMemo(
    () => ({
      modalRef,
      setModalRef,
    }),
    [modalRef, setModalRef]
  );

  return (
    <PlanNavContext.Provider value={planNavContextValue}>
      {children}
    </PlanNavContext.Provider>
  );
};

export const usePlanNavContext = () => {
  const context = useContext(PlanNavContext);

  if (!context)
    throw new Error('Provider not found for PlanNavContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
