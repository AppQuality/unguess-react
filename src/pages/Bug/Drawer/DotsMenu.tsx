import {
  Button,
  Dropdown,
  Menu,
  Select,
} from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { ReactComponent as DotsIcon } from 'src/assets/icons/dots-icon.svg';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { appTheme } from 'src/app/theme';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  setCustomStatusDrawerTouched,
  updateCustomStatus,
} from 'src/features/bugsPage/bugsPageSlice';
import { Field } from '@zendeskgarden/react-dropdowns';
import { Circle } from './Circle';
// import { ColorPicker } from './ColorPicker';

const DotsButton = styled(DotsIcon)`
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0;
`;

const DropdownWrapper = styled.div`
  width: ${({ theme }) => theme.space.base * 4}px;
  height: ${({ theme }) => theme.space.base * 4}px;
  margin: auto 0;
`;

export const DotsMenu = ({ customStatusId }: { customStatusId: number }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { customStatus } = useAppSelector((state) => state.bugsPage);

  return (
    <DropdownWrapper>
      <Dropdown>
        <Field>
          <Select isBare>
            <DotsButton />
          </Select>
        </Field>
        <Menu>
          <StyledButton isBasic isStretched>
            <Button.StartIcon>
              <Circle
                color={`#${
                  customStatus.find((cs) => cs.id === customStatusId)?.color
                }`}
              />
            </Button.StartIcon>
            {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_EDIT_CUSTOM_STATUS_BUTTON')}
          </StyledButton>
          <StyledButton
            isBasic
            onClick={() => {
              dispatch(
                updateCustomStatus(
                  customStatus.filter((cs) => cs.id !== customStatusId)
                )
              );
              dispatch(setCustomStatusDrawerTouched(true));
            }}
            style={{ color: appTheme.palette.red[500] }}
          >
            <Button.StartIcon>
              <TrashIcon color={appTheme.palette.red[500]} />
            </Button.StartIcon>
            {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_DELETE_CUSTOM_STATUS_BUTTON')}
          </StyledButton>
        </Menu>
      </Dropdown>
    </DropdownWrapper>
  );
};
