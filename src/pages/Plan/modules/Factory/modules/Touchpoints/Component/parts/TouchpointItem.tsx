import {
  AccordionNew,
  IconButton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import useWindowSize from 'src/hooks/useWindowSize';
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
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

  const confirmationState = useState<{
    isOpen: boolean;
    touchpointKey: number;
  }>({ isOpen: false, touchpointKey: 0 });
  const { key, kind, form_factor } = touchpoint;
  const index = key + 1;

  const formattedFormFactor =
    form_factor.charAt(0).toUpperCase() + form_factor.slice(1);
  const formattedKind = kind.toUpperCase();

  const hasErrors =
    (error &&
      typeof error === 'object' &&
      Object.keys(error).some((k) => k.startsWith(`touchpoints.${key}`))) ??
    false;

  return (
    <>
      <AccordionNew
        level={3}
        id={`touchpoint-${index}`}
        key={`touchpoint-${index}`}
        hasBorder
        type={hasErrors ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromTouchpointOutput(touchpoint)}>
            <AccordionNew.Label
              label={formattedFormFactor}
              subtitle={formattedKind}
            />
            {!isMobile && getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_REMOVE_TOUCHPOINT_TOOLTIP_BUTTON'
                  )}
                >
                  <IconButton
                    isDanger
                    onClick={(e) => {
                      confirmationState[1]({
                        isOpen: true,
                        touchpointKey: key,
                      });
                      e.stopPropagation();
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
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
