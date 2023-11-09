import {
  Button,
  Dropdown,
  Menu,
  Select,
  Span,
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
import { useRef, useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { Circle } from './Circle';

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

const StyledMenu = styled(Menu)`
  overflow: visible;
`;

const StyledDropdown = styled(Dropdown)`
  position: relative;
`;

export const DotsMenu = ({ customStatusId }: { customStatusId: number }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { customStatus } = useAppSelector((state) => state.bugsPage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <DropdownWrapper
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <StyledDropdown isOpen={isDropdownOpen}>
          <Field>
            <Select isBare>
              <DotsButton
                onClick={(e) => {
                  setIsDropdownOpen(true);
                  e.stopPropagation();
                }}
              />
            </Select>
          </Field>
          <StyledMenu zIndex={1}>
            <StyledButton
              isBasic
              isStretched
              onClick={() => {
                colorPickerRef.current?.click();
              }}
            >
              <Circle
                {...(customStatus.find((cs) => cs.id === customStatusId) && {
                  color: customStatus.find((cs) => cs.id === customStatusId)
                    ?.color,
                })}
              />
              <Span style={{ color: appTheme.palette.grey[700] }}>
                {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_EDIT_COLOR_BUTTON')}
              </Span>
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
                setIsDropdownOpen(false);
              }}
              style={{ color: appTheme.palette.red[500] }}
            >
              <Button.StartIcon>
                <TrashIcon color={appTheme.palette.red[500]} />
              </Button.StartIcon>
              {t(
                '__BUGS_PAGE_CUSTOM_STATUS_DRAWER_DELETE_CUSTOM_STATUS_BUTTON'
              )}
            </StyledButton>
          </StyledMenu>
        </StyledDropdown>
      </DropdownWrapper>
      <ColorPicker
        ref={colorPickerRef}
        onSelect={(color) => {
          dispatch(
            updateCustomStatus(
              customStatus.map((cs) => {
                if (cs.id === customStatusId) {
                  return {
                    ...cs,
                    color,
                  };
                }
                return cs;
              })
            )
          );
        }}
      />
    </>
  );
};
