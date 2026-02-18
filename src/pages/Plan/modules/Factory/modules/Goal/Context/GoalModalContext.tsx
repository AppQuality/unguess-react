import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ModuleGoalContextType {
  modalRef: HTMLButtonElement | null;
  setModalRef: (ref: HTMLButtonElement | null) => void;
  editorContent: string;
  setEditorContent: (content: string) => void;
  aiSuggestion: string | null;
  setAiSuggestion: (suggestion: string | null) => void;
  isAiLoading: boolean;
  setIsAiLoading: (loading: boolean) => void;
  aiError: string | null;
  setAiError: (error: string | null) => void;
  generateSuggestion: () => void;
  registerGenerateSuggestion: (fn: () => void) => void;
  acceptSuggestion: () => void;
  registerAcceptSuggestion: (fn: () => void) => void;
}

const ModuleGoalContext = createContext<ModuleGoalContextType | null>(null);

export const ModuleGoalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalRef, setModalRef] =
    useState<ModuleGoalContextType['modalRef']>(null);
  const [editorContent, setEditorContent] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const generateSuggestionRef = useRef<() => void>(() => {});
  const acceptSuggestionRef = useRef<() => void>(() => {});

  const generateSuggestion = useCallback(() => {
    generateSuggestionRef.current();
  }, []);

  const registerGenerateSuggestion = useCallback((fn: () => void) => {
    generateSuggestionRef.current = fn;
  }, []);

  const acceptSuggestion = useCallback(() => {
    acceptSuggestionRef.current();
  }, []);

  const registerAcceptSuggestion = useCallback((fn: () => void) => {
    acceptSuggestionRef.current = fn;
  }, []);

  const moduleGoalContextValue = useMemo(
    () => ({
      modalRef,
      setModalRef,
      editorContent,
      setEditorContent,
      aiSuggestion,
      setAiSuggestion,
      isAiLoading,
      setIsAiLoading,
      aiError,
      setAiError,
      generateSuggestion,
      registerGenerateSuggestion,
      acceptSuggestion,
      registerAcceptSuggestion,
    }),
    [
      modalRef,
      setModalRef,
      editorContent,
      setEditorContent,
      aiSuggestion,
      setAiSuggestion,
      isAiLoading,
      setIsAiLoading,
      aiError,
      setAiError,
      generateSuggestion,
      registerGenerateSuggestion,
      acceptSuggestion,
      registerAcceptSuggestion,
    ]
  );

  return (
    <ModuleGoalContext.Provider value={moduleGoalContextValue}>
      {children}
    </ModuleGoalContext.Provider>
  );
};

export const useModuleGoalContext = () => {
  const context = useContext(ModuleGoalContext);

  if (!context)
    throw new Error('Provider not found for ModuleGoalContextProvider');

  return context;
};
