import {
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
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useModuleTouchpoints } from '../hooks';
import { TouchpointWeb } from './TouchpointWeb';

const TouchpointItemTablet = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTouchpoints();
  const { getPlanStatus } = useModuleConfiguration();
  const { key, kind, os } = touchpoint;
  const [isIos, setIsIos] = useState('ios' in os);
  const [isAndroid, setIsAndroid] = useState('android' in os);

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

  const osError =
    error && typeof error === 'object' && `touchpoints.${key}.os` in error
      ? error[`touchpoints.${key}.os`]
      : false;

  const handleBlur = () => {
    validate();
  };

  return (
    <>
      {kind === 'app' && (
        <>
          <Label>
            {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_LABEL')}
            <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
          </Label>
          {osError && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.sm }}
            >
              {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_ERROR')}
            </Message>
          )}
          <FormField style={{ marginTop: appTheme.space.md }}>
            <Checkbox
              key={`ios_${key}`}
              name={`ios_${key}`}
              value="ios"
              disabled={getPlanStatus() !== 'draft'}
              checked={'ios' in os}
              onChange={(e) => {
                update(key, {
                  os: {
                    ...os,
                    ...(e.target.checked ? { ios: '' } : {}),
                  },
                });
                setIsIos(e.target.checked);
                validate();
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
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
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
                  value={'ios' in os ? os.ios : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, ios: e.target.value } })
                  }
                  {...(iosError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
                {iosError && (
                  <Message
                    validation="error"
                    style={{ marginTop: appTheme.space.xs }}
                  >
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
                    )}
                  </Message>
                )}
              </FormField>
            )}
          </FormField>
          <FormField style={{ marginTop: appTheme.space.xs }}>
            <Checkbox
              key={`android_${key}`}
              name={`android_${key}`}
              value="android"
              disabled={getPlanStatus() !== 'draft'}
              checked={'android' in os}
              onBlur={handleBlur}
              onChange={(e) => {
                update(key, {
                  os: {
                    ...os,
                    ...(e.target.checked ? { android: '' } : {}),
                  },
                });
                setIsAndroid(e.target.checked);
                validate();
              }}
            >
              <Label
                style={{
                  color: appTheme.palette.grey[800],
                  fontSize: appTheme.fontSizes.md,
                }}
              >
                {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_ANDROID')}
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
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
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
                  value={'android' in os ? os.android : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, android: e.target.value } })
                  }
                  {...(androidError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
                {androidError && (
                  <Message
                    validation="error"
                    style={{ marginTop: appTheme.space.xs }}
                  >
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINK_ERROR_REQUIRED'
                    )}
                  </Message>
                )}
              </FormField>
            )}
          </FormField>
        </>
      )}
      {kind === 'web' && <TouchpointWeb touchpoint={touchpoint} />}
    </>
  );
};

export { TouchpointItemTablet };
