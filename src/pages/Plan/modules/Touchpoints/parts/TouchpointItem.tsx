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

const TouchpointItem = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTouchpoints();
  const { getPlanStatus } = useModuleConfiguration();
  const confirmationState = useState<{
    isOpen: boolean;
    touchpointKey: number;
  }>({ isOpen: false, touchpointKey: 0 });
  const { key, kind, os, link, form_factor } = touchpoint;
  const index = key + 1;

  const linkError =
    error && typeof error === 'object' && `touchpoints.${key}.link` in error
      ? error[`touchpoints.${key}.link`]
      : false;

  const hasError = linkError;

  const handleBlur = () => {
    validate();
  };

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
            <AccordionNew.Label label={`${index}. ${form_factor} ${kind}`} />
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
              {kind === 'app' && <p>app</p>}
              {kind === 'web' && <p>web</p>}
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
