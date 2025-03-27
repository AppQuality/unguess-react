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

const TouchpointItemDesktop = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTouchpoints();
  const { getPlanStatus } = useModuleConfiguration();
  const { key, kind, os, link } = touchpoint;
  const [isLinux, setIsLinux] = useState(os === 'linux');
  const [isMacOs, setIsMacOs] = useState(os === 'macos');
  const [isWindows, setIsWindows] = useState(os === 'windows');

  const linkError =
    error && typeof error === 'object' && `touchpoints.${key}.link` in error
      ? error[`touchpoints.${key}.link`]
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
              key={`linux_${key}`}
              name={`linux_${key}`}
              value="linux"
              disabled={getPlanStatus() !== 'draft'}
              checked={os === 'linux'}
              onBlur={handleBlur}
              onChange={(e) => {
                update(key, { os: e.target.checked ? 'linux' : '' });
                setIsLinux(e.target.checked);
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
                  value={link}
                  onBlur={handleBlur}
                  onChange={(e) => update(key, { link: e.target.value })}
                  {...(linkError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
              </FormField>
            )}
          </FormField>
          <FormField style={{ marginTop: appTheme.space.xs }}>
            <Checkbox
              key={`macos_${key}`}
              name={`macos_${key}`}
              value="macos_"
              disabled={getPlanStatus() !== 'draft'}
              checked={os === 'macos'}
              onBlur={handleBlur}
              onChange={(e) => {
                update(key, { os: e.target.checked ? 'macos' : '' });
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
                  value={link}
                  onBlur={handleBlur}
                  onChange={(e) => update(key, { link: e.target.value })}
                  {...(linkError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
              </FormField>
            )}
          </FormField>
          <FormField style={{ marginTop: appTheme.space.xs }}>
            <Checkbox
              key={`windows_${key}`}
              name={`windows_${key}`}
              value="windows"
              disabled={getPlanStatus() !== 'draft'}
              checked={os === 'windows'}
              onBlur={handleBlur}
              onChange={(e) => {
                update(key, { os: e.target.checked ? 'windows' : '' });
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
                  value={link}
                  onBlur={handleBlur}
                  onChange={(e) => update(key, { link: e.target.value })}
                  {...(linkError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_PLACEHOLDER'
                  )}
                />
                <Message>
                  {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_HINT')}
                </Message>
              </FormField>
            )}
          </FormField>
        </>
      )}
      {kind === 'web' && (
        <FormField style={{ marginTop: appTheme.space.xs }}>
          <Label>
            {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_LABEL')}
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
            {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_HINT')}
          </Message>
        </FormField>
      )}
    </>
  );
};

export { TouchpointItemDesktop };
