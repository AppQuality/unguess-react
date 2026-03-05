import { createContext, useContext, useMemo, useState } from 'react';

interface ModuleTasksContextType {
  modalRef: HTMLButtonElement | null;
  setModalRef: (ref: HTMLButtonElement | null) => void;
  isOpenCreateTasksWithAIModal: boolean;
  setIsOpenCreateTasksWithAIModal: (value: boolean) => void;
  isOpenCreateVideoTasksWithAIModal: boolean;
  setIsOpenCreateVideoTasksWithAIModal: (value: boolean) => void;
}

const ModuleTasksContext = createContext<ModuleTasksContextType | null>(null);

export const ModuleTasksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalRef, setModalRef] =
    useState<ModuleTasksContextType['modalRef']>(null);
  const [isOpenCreateTasksWithAIModal, setIsOpenCreateTasksWithAIModal] =
    useState(false);
  const [isOpenCreateVideoTasksWithAIModal, setIsOpenCreateVideoTasksWithAIModal] =
    useState(false);

  const moduleTasksContextValue = useMemo(
    () => ({
      modalRef,
      setModalRef,
      isOpenCreateTasksWithAIModal,
      setIsOpenCreateTasksWithAIModal,
      isOpenCreateVideoTasksWithAIModal,
      setIsOpenCreateVideoTasksWithAIModal,
    }),
    [modalRef, setModalRef, isOpenCreateTasksWithAIModal, isOpenCreateVideoTasksWithAIModal]
  );

  return (
    <ModuleTasksContext.Provider value={moduleTasksContextValue}>
      {children}
    </ModuleTasksContext.Provider>
  );
};

export const useModuleTasksContext = () => {
  const context = useContext(ModuleTasksContext);

  if (!context)
    throw new Error('Provider not found for ModuleTasksContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
