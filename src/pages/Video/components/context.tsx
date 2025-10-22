import { createContext, useContext, useMemo, useState } from 'react';

interface TooltipModalContextType {
  modalRef: HTMLDivElement | null;
  setModalRef: (ref: HTMLDivElement | null) => void;
}

const TooltipModalContext = createContext<TooltipModalContextType | null>(null);

export const TooltipModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalRef, setModalRef] =
    useState<TooltipModalContextType['modalRef']>(null);

  const TooltipModalContextValue = useMemo(
    () => ({
      modalRef,
      setModalRef,
    }),
    [modalRef, setModalRef]
  );

  return (
    <TooltipModalContext.Provider value={TooltipModalContextValue}>
      {children}
    </TooltipModalContext.Provider>
  );
};

export const useTooltipModalContext = () => {
  const context = useContext(TooltipModalContext);

  if (!context)
    throw new Error('Provider not found for TooltipModalContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
