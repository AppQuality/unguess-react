import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ModuleAdditionalTargetContextType {
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

const ModuleAdditionalTargetContext =
  createContext<ModuleAdditionalTargetContextType | null>(null);

export const ModuleAdditionalTargetContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalRef, setModalRef] =
    useState<ModuleAdditionalTargetContextType['modalRef']>(null);
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

  const moduleAdditionalTargetContextValue = useMemo(
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
    <ModuleAdditionalTargetContext.Provider
      value={moduleAdditionalTargetContextValue}
    >
      {children}
    </ModuleAdditionalTargetContext.Provider>
  );
};

export const useModuleAdditionalTargetContext = () => {
  const context = useContext(ModuleAdditionalTargetContext);

  if (!context)
    throw new Error(
      'Provider not found for ModuleAdditionalTargetContextProvider'
    );

  return context;
};
