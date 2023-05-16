import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { toggleChat } from 'src/common/utils';
import {
  openDrawer,
  setExpressTypeId,
} from 'src/features/express/expressSlice';

export const ServiceExpressCta = ({
  expressTypeId,
}: {
  expressTypeId: number;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (!expressTypeId) {
    return null;
  }

  return (
    <Button
      className="service-details-express-button"
      size="medium"
      isPrimary
      onClick={() => {
        dispatch(setExpressTypeId(expressTypeId));
        dispatch(openDrawer());
        toggleChat(false);
      }}
    >
      {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
    </Button>
  );
};
