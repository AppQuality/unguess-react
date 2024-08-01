import {
  IconButton,
  Tooltip,
  getColor,
} from '@appquality/unguess-design-system';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { ReactComponent as LightbulbIcon } from 'src/assets/icons/lightbulb-icon.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/chevron-double-left-icon.svg';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { useInsightContext } from './InsightContext';
import { InsightFormValues } from './FormProvider';

const ButtonWrapper = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.components.chrome.header.height};
  right: 0;
  margin-top: ${({ theme }) => theme.space.md};
  z-index: ${({ theme }) => theme.levels.front};
  border: 1px solid ${getColor(appTheme.colors.neutralHue, 200)};
  border-radius: 0;
  border-top-left-radius: ${({ theme }) => theme.borderRadii.lg};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadii.lg};
  border-right: none;
  background-color: white;
  padding: ${({ theme }) => theme.space.xxs};
  padding-right: 0;
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
`;

const StyledButton = styled(IconButton)`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
`;

const DrawerButton = () => {
  const { t } = useTranslation();
  const { isDrawerOpen, setIsDrawerOpen } = useInsightContext();
  const { values } = useFormikContext<InsightFormValues>();
  const isEditing = values.id === -1 || values.id > 0;

  const getDrawerInfo = () => {
    if (!isDrawerOpen) {
      if (isEditing) {
        return {
          icon: <EditIcon />,
          text: t('__INSIGHTS_PAGE_OPEN_DRAWER_EDITING_BUTTON'),
        };
      }

      return {
        icon: <LightbulbIcon />,
        text: t('__INSIGHTS_PAGE_OPEN_DRAWER_BUTTON'),
      };
    }

    return {
      icon: <ArrowRight />,
      text: t('__INSIGHTS_PAGE_CLOSE_DRAWER_BUTTON'),
    };
  };

  return (
    <ButtonWrapper>
      <Tooltip
        size="small"
        content={getDrawerInfo().text}
        type="light"
        placement="auto"
      >
        <StyledButton
          isPrimary={!isDrawerOpen}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {getDrawerInfo().icon}
        </StyledButton>
      </Tooltip>
    </ButtonWrapper>
  );
};

export { DrawerButton };
