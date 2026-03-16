import { AccordionNew, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as MfaIcon } from 'src/assets/icons/mfa.svg';
import { useEffect, useState } from 'react';
import { fetchMFAPreference } from 'aws-amplify/auth';
import { ActiveMfaMethod } from './ActiveMfaMethod';
import { EmptyStateMFA } from './EmptyStateMFA';

interface MfaPreference {
  preferred: 'SMS' | 'TOTP' | 'EMAIL';
  enabled: ('SMS' | 'TOTP' | 'EMAIL')[];
}

export const MfaAccordion = () => {
  const { t } = useTranslation();
  const [mfaPreference, setMfaPreference] = useState<MfaPreference | null>(
    null
  );
  const isActive = mfaPreference?.enabled && mfaPreference.enabled.length > 0;

  useEffect(() => {
    const preferredMFA = async () => {
      const { preferred, enabled } = await fetchMFAPreference();
      if (preferred) {
        setMfaPreference({ preferred, enabled: enabled || [] });
      }
    };

    preferredMFA();
  }, []);
  return (
    <AccordionNew hasBorder={false} level={3} defaultExpandedSections={[]}>
      <AccordionNew.Section>
        <AccordionNew.Header
          icon={
            <MfaIcon
              style={{
                width: appTheme.iconSizes.md,
                height: appTheme.iconSizes.md,
                color: appTheme.palette.blue[600],
              }}
            />
          }
        >
          <AccordionNew.Label label={t('__PROFILE_PAGE_MFA_ACCORDION_LABEL')} />
          <AccordionNew.Meta>
            {isActive ? (
              <Tag
                color={appTheme.palette.green[800]}
                hue={appTheme.palette.green[10]}
              >
                {t('__PROFILE_PAGE_MFA_STATUS_ACTIVE')}
              </Tag>
            ) : (
              <Tag color={appTheme.palette.yellow[800]}>
                {t('__PROFILE_PAGE_MFA_STATUS_INACTIVE')}
              </Tag>
            )}
          </AccordionNew.Meta>
        </AccordionNew.Header>
        <AccordionNew.Panel>
          {mfaPreference?.enabled && mfaPreference.enabled.includes('TOTP') ? (
            <ActiveMfaMethod
              method="authenticator"
              lastChanged={t('__PROFILE_PAGE_MFA_ACTIVE_LAST_CHANGED', {
                time: '2 months ago',
              })}
            />
          ) : (
            <EmptyStateMFA />
          )}
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};
