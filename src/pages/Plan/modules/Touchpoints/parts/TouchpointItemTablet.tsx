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
  const { key, kind, os, link } = touchpoint;
  const [isIos, setIsIos] = useState(os === 'ios');
  const [isAndroid, setIsAndroid] = useState(os === 'android');

  const linkError =
    error && typeof error === 'object' && `touchpoints.${key}.link` in error
      ? error[`touchpoints.${key}.link`]
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

export { TouchpointItemTablet };
