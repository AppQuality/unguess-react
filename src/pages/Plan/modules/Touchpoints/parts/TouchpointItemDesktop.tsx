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

const TouchpointItemDesktop = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { update, validate, error, value } = useModuleTouchpoints();
  const { getPlanStatus } = useModuleConfiguration();
  const { key, kind, os } = touchpoint;
  const [isLinux, setIsLinux] = useState('linux' in os);
  const [isMacOs, setIsMacOs] = useState('macos' in os);
  const [isWindows, setIsWindows] = useState('windows' in os);

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

  const osError =
    error && typeof error === 'object' && `touchpoints.${key}.os` in error
      ? error[`touchpoints.${key}.os`]
      : false;

  const handleBlur = () => {
    validate();
  };

  console.log('values', value);
  console.log('errors', error);

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
              key={`linux_${key}`}
              name={`linux_${key}`}
              value="linux"
              disabled={getPlanStatus() !== 'draft'}
              checked={'linux' in os}
              onChange={(e) => {
                update(key, {
                  os: {
                    ...os,
                    ...(e.target.checked ? { linux: '' } : {}),
                  },
                });
                setIsLinux(e.target.checked);
                validate();
              }}
            >
              <Label
                style={{
                  color: appTheme.palette.grey[800],
                  fontSize: appTheme.fontSizes.md,
                }}
              >
                {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_LINUX')}
              </Label>
            </Checkbox>
            {isLinux && (
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
                  value={'linux' in os ? os.linux : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, linux: e.target.value } })
                  }
                  {...(linuxError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
                {linuxError && (
                  <Message validation="error">{linuxError}</Message>
                )}
              </FormField>
            )}
          </FormField>
          <FormField style={{ marginTop: appTheme.space.xs }}>
            <Checkbox
              key={`macos_${key}`}
              name={`macos_${key}`}
              value="macos"
              disabled={getPlanStatus() !== 'draft'}
              checked={'macos' in os}
              onChange={(e) => {
                update(key, {
                  os: {
                    ...os,
                    ...(e.target.checked ? { macos: '' } : {}),
                  },
                });
                setIsMacOs(e.target.checked);
                validate();
              }}
            >
              <Label
                style={{
                  color: appTheme.palette.grey[800],
                  fontSize: appTheme.fontSizes.md,
                }}
              >
                {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_MACOS')}
              </Label>
            </Checkbox>
            {isMacOs && (
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
                  value={'macos' in os ? os.macos : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, macos: e.target.value } })
                  }
                  {...(macosError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
                {macosError && (
                  <Message validation="error">{macosError}</Message>
                )}
              </FormField>
            )}
          </FormField>
          <FormField style={{ marginTop: appTheme.space.xs }}>
            <Checkbox
              key={`windows_${key}`}
              name={`windows_${key}`}
              value="windows"
              disabled={getPlanStatus() !== 'draft'}
              checked={'windows' in os}
              onChange={(e) => {
                update(key, {
                  os: {
                    ...os,
                    ...(e.target.checked ? { windows: '' } : {}),
                  },
                });
                setIsWindows(e.target.checked);
                validate();
              }}
            >
              <Label
                style={{
                  color: appTheme.palette.grey[800],
                  fontSize: appTheme.fontSizes.md,
                }}
              >
                {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_OS_WINDOWS')}
              </Label>
            </Checkbox>
            {isWindows && (
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
                  value={'windows' in os ? os.windows : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, windows: e.target.value } })
                  }
                  {...(windowsError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
                {windowsError && (
                  <Message validation="error">{windowsError}</Message>
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

export { TouchpointItemDesktop };
