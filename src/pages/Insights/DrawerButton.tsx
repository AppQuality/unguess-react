import { IconButton, Tooltip } from '@appquality/unguess-design-system';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { ReactComponent as LightbulbIcon } from 'src/assets/icons/lightbulb-icon.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { useInsightContext } from './InsightContext';
import { InsightFormValues } from './FormProvider';

const DrawerButton = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, setIsDrawerOpen } = useInsightContext();
  const { values } = useFormikContext<InsightFormValues>();

  const getDrawerInfo = () => {
    if (!isDrawerOpen) {
      if (values.id === 0) {
        return {
          icon: <LightbulbIcon />,
          text: t('__INSIGHTS_PAGE_OPEN_DRAWER_BUTTON'),
        };
      }

      if (values.id === -1) {
        return {
          icon: <EditIcon />,
          text: t('__INSIGHTS_PAGE_OPEN_DRAWER_EDITING_BUTTON'),
        };
      }
    }

    return {
      icon: <ArrowRight />,
      text: t('__INSIGHTS_PAGE_CLOSE_DRAWER_BUTTON'),
    };
  };

  return (
    <Tooltip content={getDrawerInfo().text} type="light" placement="auto">
      <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        {getDrawerInfo().icon}
      </IconButton>
    </Tooltip>
  );
};

export { DrawerButton };
