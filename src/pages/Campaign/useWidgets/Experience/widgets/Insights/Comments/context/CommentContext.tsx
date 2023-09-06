import { createContext, useContext, useMemo, useState } from 'react';

export type CommentContextType = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
};

export const CommentContext = createContext<CommentContextType | null>(null);

export const CommentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const commentContextValue = useMemo(
    () => ({
      isEditing,
      setIsEditing,
      comment,
      setComment,
    }),
    [comment, setComment, isEditing, setIsEditing]
  );

  return (
    <CommentContext.Provider value={commentContextValue}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context)
    throw new Error('Provider not found for CommentContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
