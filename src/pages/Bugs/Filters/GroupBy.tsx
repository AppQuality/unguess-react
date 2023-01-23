import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setPageView } from 'src/features/bugsPage/bugsPageSlice';

export const GroupBy = () => {
  const bugsPageSlice = useAppSelector((state) => state.bugsPage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { pageView } = bugsPageSlice;

  return (
    <div>
      {pageView === 'byUsecase' ? (
        <Button
          onClick={() => {
            dispatch(setPageView('bySeverity'));
          }}
        >
          {t('By severity')}
        </Button>
      ) : (
        <Button
          onClick={() => {
            dispatch(setPageView('byUsecase'));
          }}
        >
          {t('By use case')}
        </Button>
      )}
    </div>
  );
};
