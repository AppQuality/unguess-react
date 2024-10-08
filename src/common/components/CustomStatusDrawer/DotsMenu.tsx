import {
  Button,
  Dropdown,
  DropdownField as Field,
  Menu,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { ArrayHelpers, FormikProps } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DotsIcon } from 'src/assets/icons/dots-icon.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { styled } from 'styled-components';
import { Circle } from './Circle';
import { ColorPicker } from './ColorPicker';
import { CustomStatusFormProps } from './formModel';

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

export const DotsMenu = ({
  arrayHelpers,
  formikProps,
  field_id,
}: {
  arrayHelpers: ArrayHelpers;
  formikProps: FormikProps<CustomStatusFormProps>;
  field_id: number;
}) => {
  const { t } = useTranslation();
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const { setFieldValue, values } = formikProps;
  const status = values.custom_statuses[`${field_id}`];

  if (!status) return null;

  return (
    <>
      <DropdownWrapper>
        <StyledDropdown>
          <Field>
            <Select isBare>
              <DotsButton />
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
              <Circle color={`#${status.color}`} />
              <Span style={{ color: appTheme.palette.grey[700] }}>
                {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_EDIT_COLOR_BUTTON')}
              </Span>
            </StyledButton>
            <StyledButton
              isBasic
              onClick={() => {
                arrayHelpers.remove(field_id);
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
          setFieldValue(
            `custom_statuses.${field_id}.color`,
            color.replace('#', '')
          );
        }}
      />
    </>
  );
};
