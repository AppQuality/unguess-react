import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { toggleChat } from 'src/common/utils';
import {
  openDrawer,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { WaterButton } from 'src/common/components/waterButton';

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
    <WaterButton
      className="service-details-express-button"
      size="medium"
      isPrimary
      isPill
      onClick={() => {
        dispatch(setExpressTypeId(expressTypeId));
        dispatch(openDrawer());
        toggleChat(false);
      }}
    >
      {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
    </WaterButton>
  );
};
