import { AccordionNew, Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useModuleTouchpoints } from '../hooks';
import { getIconFromTouchpointOutput } from '../utils';
import { DeleteTouchpointConfirmationModal } from './modal/DeleteTouchpointConfirmationModal';
import { TouchpointItemDesktop } from './TouchpointItemDesktop';
import { TouchpointItemSmartphone } from './TouchpointItemSmartphone';
import { TouchpointItemTablet } from './TouchpointItemTablet';

const TouchpointItem = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { error } = useModuleTouchpoints();
  const { getPlanStatus } = useModuleConfiguration();
  const confirmationState = useState<{
    isOpen: boolean;
    touchpointKey: number;
  }>({ isOpen: false, touchpointKey: 0 });
  const { key, kind, form_factor } = touchpoint;
  const index = key + 1;

  const formattedFormFactor =
    form_factor.charAt(0).toUpperCase() + form_factor.slice(1);
  const formattedKind = kind.toUpperCase();

  const linuxError =
    error && typeof error === 'object' && `touchpoints.${key}.os.linux` in error
      ? error[`touchpoints.${key}.os.linux`]
      : false;
  const macosError =
    error && typeof error === 'object' && `touchpoints.${key}.os.macos` in error
      ? error[`touchpoints.${key}.os.macos`]
      : false;
  const windowsError =
    error &&
    typeof error === 'object' &&
    `touchpoints.${key}.os.windows` in error
      ? error[`touchpoints.${key}.os.windows`]
      : false;
  const iosError =
    error && typeof error === 'object' && `touchpoints.${key}.os.ios` in error
      ? error[`touchpoints.${key}.os.ios`]
      : false;
  const androidError =
    error &&
    typeof error === 'object' &&
    `touchpoints.${key}.os.android` in error
      ? error[`touchpoints.${key}.os.android`]
      : false;

  const lengthError =
    error && typeof error === 'object' && `touchpoints.${key}.length` in error
      ? error[`touchpoints.${key}.length`]
      : false;

  const hasError =
    macosError ||
    windowsError ||
    linuxError ||
    iosError ||
    androidError ||
    lengthError;

  return (
    <>
      <AccordionNew
        level={3}
        id={`touchpoint-${index}`}
        key={`touchpoint-${index}`}
        hasBorder
        type={hasError ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromTouchpointOutput(touchpoint)}>
            <AccordionNew.Label
              label={formattedFormFactor}
              subtitle={formattedKind}
            />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Button
                  isBasic
                  isDanger
                  onClick={() =>
                    confirmationState[1]({
                      isOpen: true,
                      touchpointKey: key,
                    })
                  }
                >
                  <Button.StartIcon>
                    <TrashIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_REMOVE_TOUCHPOINT_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              {form_factor === 'smartphone' && (
                <TouchpointItemSmartphone touchpoint={touchpoint} />
              )}
              {form_factor === 'tablet' && (
                <TouchpointItemTablet touchpoint={touchpoint} />
              )}
              {form_factor === 'desktop' && (
                <TouchpointItemDesktop touchpoint={touchpoint} />
              )}
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {confirmationState[0].isOpen && (
        <DeleteTouchpointConfirmationModal state={confirmationState} />
      )}
    </>
  );
};

export { TouchpointItem };
