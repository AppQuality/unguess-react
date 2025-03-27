import {
  AccordionNew,
  Button,
  Checkbox,
  FormField,
  Label,
  MD,
  MediaInput,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-fill.svg';
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
  const [isIos, setIsIos] = useState(os === 'ios');
  const [isAndroid, setIsAndroid] = useState(os === 'android');

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
              {kind === 'app' && (
                <>
                  <Label>
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_LABEL'
                    )}
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </Label>
                  <FormField style={{ marginTop: appTheme.space.md }}>
                    <Checkbox
                      key="ios"
                      value="ios"
                      name={`ios_${key}`}
                      disabled={getPlanStatus() !== 'draft'}
                      checked={os === 'ios'}
                      onChange={(e) => {
                        update(key, { os: e.target.checked ? 'ios' : '' });
                        setIsIos(e.target.checked);
                      }}
                    >
                      <Label
                        style={{
                          color: appTheme.palette.grey[800],
                          fontSize: appTheme.fontSizes.md,
                        }}
                      >
                        {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_IOS')}
                      </Label>
                    </Checkbox>
                    {isIos && (
                      <FormField
                        style={{
                          padding: `${appTheme.space.sm} ${appTheme.space.lg}`,
                          marginTop: appTheme.space.xs,
                        }}
                      >
                        <Label>
                          {t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_LABEL'
                          )}
                          <Span style={{ color: appTheme.palette.red[600] }}>
                            *
                          </Span>
                        </Label>
                        <MD
                          style={{
                            marginTop: appTheme.space.xxs,
                            marginBottom: appTheme.space.sm,
                          }}
                        >
                          {t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_DESCRIPTION'
                          )}
                        </MD>
                        <MediaInput
                          start={<LinkIcon />}
                          type="text"
                          disabled={getPlanStatus() !== 'draft'}
                          value={link}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            update(key, { link: e.target.value })
                          }
                          {...(linkError && { validation: 'error' })}
                          placeholder={t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                          )}
                        />
                        <Message>
                          {t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT'
                          )}
                        </Message>
                      </FormField>
                    )}
                  </FormField>
                  <FormField style={{ marginTop: appTheme.space.xs }}>
                    <Checkbox
                      key="android"
                      value="android"
                      name={`android_${key}`}
                      disabled={getPlanStatus() !== 'draft'}
                      checked={os === 'android'}
                      onChange={(e) => {
                        update(key, { os: e.target.checked ? 'android' : '' });
                        setIsAndroid(e.target.checked);
                      }}
                    >
                      <Label
                        style={{
                          color: appTheme.palette.grey[800],
                          fontSize: appTheme.fontSizes.md,
                        }}
                      >
                        {t(
                          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_ANDROID'
                        )}
                      </Label>
                    </Checkbox>
                    {isAndroid && (
                      <FormField
                        style={{
                          padding: `${appTheme.space.sm} ${appTheme.space.lg}`,
                          marginTop: appTheme.space.xs,
                        }}
                      >
                        <Label>
                          {t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_LABEL'
                          )}
                          <Span style={{ color: appTheme.palette.red[600] }}>
                            *
                          </Span>
                        </Label>
                        <MD
                          style={{
                            marginTop: appTheme.space.xxs,
                            marginBottom: appTheme.space.sm,
                          }}
                        >
                          {t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_DESCRIPTION'
                          )}
                        </MD>
                        <MediaInput
                          start={<LinkIcon />}
                          type="text"
                          disabled={getPlanStatus() !== 'draft'}
                          value={link}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            update(key, { link: e.target.value })
                          }
                          {...(linkError && { validation: 'error' })}
                          placeholder={t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                          )}
                        />
                        <Message>
                          {t(
                            '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT'
                          )}
                        </Message>
                      </FormField>
                    )}
                  </FormField>
                </>
              )}
              {kind === 'web' && (
                <FormField style={{ marginTop: appTheme.space.xs }}>
                  <Label>
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_LABEL'
                    )}
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </Label>
                  <MD
                    style={{
                      marginTop: appTheme.space.xxs,
                      marginBottom: appTheme.space.sm,
                    }}
                  >
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_DESCRIPTION'
                    )}
                  </MD>
                  <MediaInput
                    start={<LinkIcon />}
                    type="text"
                    disabled={getPlanStatus() !== 'draft'}
                    value={link}
                    onBlur={handleBlur}
                    onChange={(e) => update(key, { link: e.target.value })}
                    {...(linkError && { validation: 'error' })}
                    placeholder={t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_PLACEHOLDER'
                    )}
                  />
                  <Message>
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_HINT'
                    )}
                  </Message>
                </FormField>
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
