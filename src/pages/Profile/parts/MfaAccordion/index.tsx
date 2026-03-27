import { AccordionNew, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as MfaIcon } from 'src/assets/icons/mfa.svg';
import { useEffect, useState } from 'react';
import {
  fetchMFAPreference,
  fetchUserAttributes,
  updateMFAPreference,
} from 'aws-amplify/auth';
import { ActiveMfaMethod } from './ActiveMfaMethod';
import { EmptyStateMFA } from './EmptyStateMFA';
import { SetupMfaModal } from './SetupMfaModal';

interface MfaPreference {
  preferred: 'SMS' | 'TOTP' | 'EMAIL';
  enabled: ('SMS' | 'TOTP' | 'EMAIL')[];
}

export const MfaAccordion = () => {
  const { t } = useTranslation();
  const [mfaPreference, setMfaPreference] = useState<MfaPreference | null>(
    null
  );
  const [mfaActivatedAt, setMfaActivatedAt] = useState<string | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isActive = mfaPreference?.enabled && mfaPreference.enabled.length > 0;

  const loadMfaPreference = async () => {
    const { preferred, enabled } = await fetchMFAPreference();
    if (preferred) {
      setMfaPreference({ preferred, enabled: enabled || [] });
    } else {
      setMfaPreference(null);
    }

    const attributes = await fetchUserAttributes();
    const activatedAt = attributes['custom:mfa_activated_at'];
    setMfaActivatedAt(activatedAt);
  };

  useEffect(() => {
    loadMfaPreference();
  }, []);

  const handleRemoveMfa = async () => {
    if (!mfaPreference) return;
    try {
      const disableOptions: Record<string, 'DISABLED'> = {};
      if (mfaPreference.enabled.includes('TOTP')) {
        disableOptions.totp = 'DISABLED';
      }
      if (mfaPreference.enabled.includes('SMS')) {
        disableOptions.sms = 'DISABLED';
      }
      await updateMFAPreference(disableOptions);
      setMfaPreference(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to remove MFA:', error);
    }
  };

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
              <Tag
                color={appTheme.palette.yellow[700]}
                hue={`${appTheme.palette.yellow[700]}14`}
              >
                {t('__PROFILE_PAGE_MFA_STATUS_INACTIVE')}
              </Tag>
            )}
          </AccordionNew.Meta>
        </AccordionNew.Header>
        <AccordionNew.Panel>
          {mfaPreference?.enabled && mfaPreference.enabled.includes('TOTP') ? (
            <ActiveMfaMethod
              method={mfaPreference.preferred}
              lastChanged={
                mfaActivatedAt
                  ? t('__PROFILE_PAGE_MFA_ACTIVE_LAST_CHANGED', {
                      time: new Date(mfaActivatedAt).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      ),
                    })
                  : undefined
              }
              onRemove={handleRemoveMfa}
              onEdit={() => setIsEditModalOpen(true)}
            />
          ) : (
            <EmptyStateMFA onSetupComplete={loadMfaPreference} />
          )}
        </AccordionNew.Panel>
      </AccordionNew.Section>
      {isEditModalOpen && (
        <SetupMfaModal
          onClose={() => {
            setIsEditModalOpen(false);
            loadMfaPreference();
          }}
        />
      )}
    </AccordionNew>
  );
};
