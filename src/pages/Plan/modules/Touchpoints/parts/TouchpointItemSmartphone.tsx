import {
  Checkbox,
  FormField,
  Label,
  MD,
  MediaInput,
  Message,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-fill.svg';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useModuleTouchpoints } from '../hooks';
import { TouchpointWeb } from './TouchpointWeb';

const TouchpointItemSmartphone = ({
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

  const handleBlur = () => {
    validate();
  };

  return (
    <div onBlur={handleBlur}>
      {kind === 'app' && (
        <>
          <Label>
            {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_OS_LABEL')}
            <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
          </Label>
          {lengthError && (
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
                  os: e.target.checked
                    ? { ...os, ios: '' }
                    : Object.fromEntries(
                        Object.entries({ ...os }).filter(([k]) => k !== 'ios')
                      ),
                });
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
            {'ios' in os && (
              <FormField
                style={{
                  padding: `${appTheme.space.sm} ${appTheme.space.lg}`,
                  marginTop: appTheme.space.xs,
                }}
              >
                <Label>
                  {t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_IOS_LABEL'
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
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_IOS_DESCRIPTION'
                  )}
                </MD>
                <MediaInput
                  start={<LinkIcon />}
                  type="text"
                  readOnly={getPlanStatus() !== 'draft'}
                  value={'ios' in os ? os.ios : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, ios: e.target.value } })
                  }
                  {...(iosError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_IOS_PLACEHOLDER'
                  )}
                />
                {iosError ? (
                  <Paragraph style={{ marginTop: appTheme.space.xs }}>
                    <Message validation="error">{iosError}</Message>
                  </Paragraph>
                ) : (
                  <Message>
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_IOS_HINT'
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
              onChange={(e) => {
                update(key, {
                  os: e.target.checked
                    ? { ...os, android: '' }
                    : Object.fromEntries(
                        Object.entries({ ...os }).filter(
                          ([k]) => k !== 'android'
                        )
                      ),
                });
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
            {'android' in os && (
              <FormField
                style={{
                  padding: `${appTheme.space.sm} ${appTheme.space.lg}`,
                  marginTop: appTheme.space.xs,
                }}
              >
                <Label>
                  {t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_ANDROID_LABEL'
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
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_ANDROID_DESCRIPTION'
                  )}
                </MD>
                <MediaInput
                  start={<LinkIcon />}
                  type="text"
                  readOnly={getPlanStatus() !== 'draft'}
                  value={'android' in os ? os.android : ''}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    update(key, { os: { ...os, android: e.target.value } })
                  }
                  {...(androidError && { validation: 'error' })}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_ANDROID_PLACEHOLDER'
                  )}
                />
                {androidError ? (
                  <Paragraph style={{ marginTop: appTheme.space.xs }}>
                    <Message validation="error">{androidError}</Message>
                  </Paragraph>
                ) : (
                  <Message>
                    {t(
                      '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_APP_LINK_ANDROID_HINT'
                    )}
                  </Message>
                )}
              </FormField>
            )}
          </FormField>
        </>
      )}
      {kind === 'web' && <TouchpointWeb touchpoint={touchpoint} />}
    </div>
  );
};

export { TouchpointItemSmartphone };
