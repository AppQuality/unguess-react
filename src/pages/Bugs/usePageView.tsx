import { useState } from 'react';

type PageView = 'byUsecase' | 'bySeverity';

export const usePageView = () => {
  const [pageView, setPageView] = useState<PageView>('byUsecase');

  return {
    pageView,
    setPageView,
  };
};
