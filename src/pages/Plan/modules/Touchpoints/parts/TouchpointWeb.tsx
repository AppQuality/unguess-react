import {
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

const TouchpointWeb = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTouchpoints();
  const { getPlanStatus } = useModuleConfiguration();
  const { key, kind, os, form_factor } = touchpoint;

  const linkError =
    error && typeof error === 'object' && `touchpoints.${key}.link` in error
      ? error[`touchpoints.${key}.link`]
      : false;

  const handleBlur = () => {
    validate();
  };

  if (kind !== 'web') return null;

  return (
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
        {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_DESCRIPTION')}
      </MD>
      <MediaInput
        start={<LinkIcon />}
        type="text"
        readOnly={getPlanStatus() !== 'draft'}
        {...(form_factor === 'desktop' &&
          'linux' in os && {
            value: os.linux,
          })}
        {...((form_factor === 'smartphone' ||
          (form_factor === 'tablet' && 'android' in os)) && {
          value: os.android,
        })}
        onBlur={handleBlur}
        onChange={(e) => {
          if (form_factor === 'desktop') {
            update(key, {
              os: {
                linux: e.target.value,
                macos: e.target.value,
                windows: e.target.value,
              },
            });
          } else if (form_factor === 'smartphone' || form_factor === 'tablet') {
            update(key, {
              os: {
                android: e.target.value,
                ios: e.target.value,
              },
            });
          }
        }}
        {...(linkError && { validation: 'error' })}
        placeholder={t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_PLACEHOLDER'
        )}
      />
      <Paragraph style={{ marginTop: appTheme.space.xs }}>
        {linkError && <Message validation="error">{linkError}</Message>}
      </Paragraph>
      <Message>
        {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TOUCHPOINT_WEB_LINK_HINT')}
      </Message>
    </FormField>
  );
};

export { TouchpointWeb };
