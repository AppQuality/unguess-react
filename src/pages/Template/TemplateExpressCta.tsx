import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import {
  openDrawer,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { useCampaignTemplateById } from 'src/hooks/useCampaignTemplateById';

export const TemplateExpressCta = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { templateId } = useParams();

  const { data } = useCampaignTemplateById(templateId || '');

  // @ts-ignore
  const expressTypeId = data.express?.data?.attributes?.express_type?.data.id;
  return (
    <Button
      className="service-details-express-button"
      size="medium"
      isPrimary
      isAccent
      onClick={() => {
        dispatch(setExpressTypeId(expressTypeId));
        dispatch(openDrawer());
      }}
    >
      {t('__CATALOG_PAGE_BUTTON_TEMPLATE_LABEL')}
    </Button>
  );
};
