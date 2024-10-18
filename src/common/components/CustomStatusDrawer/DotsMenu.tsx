import {
  DotsMenu as DotsMenuComponent,
  Span,
} from '@appquality/unguess-design-system';
import { ArrayHelpers, FormikProps } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { Circle } from './Circle';
import { ColorPicker } from './ColorPicker';
import { CustomStatusFormProps } from './formModel';

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
      <DotsMenuComponent
        style={{ alignSelf: 'center' }}
        onSelect={(value) => {
          if (value === 'remove') {
            arrayHelpers.remove(field_id);
            return;
          }
          if (value === 'openColorPicker') {
            colorPickerRef.current?.click();
          }
        }}
      >
        <DotsMenuComponent.Item
          value="openColorPicker"
          icon={
            <Circle
              color={`#${status.color}`}
              style={{ marginRight: appTheme.space.xs }}
            />
          }
        >
          <Span style={{ color: appTheme.palette.grey[700] }}>
            {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_EDIT_COLOR_BUTTON')}
          </Span>
        </DotsMenuComponent.Item>
        <DotsMenuComponent.Item
          value="remove"
          icon={
            <TrashIcon
              color={appTheme.palette.red[500]}
              style={{ marginRight: appTheme.space.xs }}
            />
          }
        >
          <span style={{ color: appTheme.palette.red[500] }}>
            {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_DELETE_CUSTOM_STATUS_BUTTON')}
          </span>
        </DotsMenuComponent.Item>
      </DotsMenuComponent>

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
