import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import {
  openDrawer,
  setExpressTypeId,
} from 'src/features/express/expressSlice';

export const TemplateExpressCta = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { templateId } = useParams();

  return (
    <Button
      className="service-details-express-button"
      size="medium"
      isPrimary
      isAccent
      onClick={() => {
        dispatch(setExpressTypeId(templateId));
        dispatch(openDrawer());
      }}
    >
      {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
    </Button>
  );
};
