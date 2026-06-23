import { Button, MD, SM, Span, XL } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useRealtimeInterview } from './useRealtimeInterview';

const LANGUAGES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
];

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.lg};
  gap: ${({ theme }) => theme.space.md};
`;

const Card = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const Preview = styled.video`
  width: 100%;
  max-height: 320px;
  background: ${({ theme }) => theme.palette.grey[800]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  object-fit: cover;
  transform: scaleX(-1);
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Pill = styled.span`
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  background: ${({ theme }) => theme.palette.kale[100]};
  color: ${({ theme }) => theme.palette.kale[700]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RecDot = styled.span`
  color: ${({ theme }) => theme.palette.red[600]};
`;

const Transcript = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  max-height: 280px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.sm};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
`;

const Bubble = styled.div<{ $role: 'assistant' | 'user' }>`
  align-self: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 85%;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  background: ${({ theme, $role }) =>
    $role === 'user' ? theme.palette.blue[100] : theme.palette.grey[100]};
`;

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
  justify-content: center;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Consent = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const DownloadLink = styled.a`
  align-self: center;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  background: ${({ theme }) => theme.palette.kale[700]};
  color: ${({ theme }) => theme.palette.grey[100]};
  text-decoration: none;
`;

const VoiceInterview = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('it');
  const [consented, setConsented] = useState(false);
  const {
    status,
    transcript,
    speaking,
    error,
    downloadUrl,
    videoRef,
    start,
    end,
  } = useRealtimeInterview();

  if (status === 'idle') {
    return (
      <PageWrapper>
        <Card>
          <XL isBold>{t('__INTERVIEW_TITLE')}</XL>
          <MD>{t('__INTERVIEW_SUBTITLE')}</MD>
          <Field>
            <label htmlFor="interview-language">
              <SM isBold>{t('__INTERVIEW_LANGUAGE_LABEL')}</SM>
            </label>
            <select
              id="interview-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </Field>
          <Consent htmlFor="interview-consent">
            <input
              id="interview-consent"
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
            />
            <SM>{t('__INTERVIEW_CONSENT')}</SM>
          </Consent>
          <Button
            isPrimary
            isAccent
            disabled={!consented}
            onClick={() => start(language)}
          >
            {t('__INTERVIEW_START')}
          </Button>
        </Card>
      </PageWrapper>
    );
  }

  let pillLabel = t('__INTERVIEW_STATUS_ERROR');
  if (status === 'connecting') pillLabel = t('__INTERVIEW_CONNECTING');
  else if (status === 'ended') pillLabel = t('__INTERVIEW_ENDED');
  else if (status === 'live')
    pillLabel = speaking
      ? t('__INTERVIEW_SPEAKING')
      : t('__INTERVIEW_LISTENING');

  return (
    <PageWrapper>
      <Card>
        <XL isBold>{t('__INTERVIEW_TITLE')}</XL>
        {status === 'live' && (
          <Preview ref={videoRef} autoPlay muted playsInline>
            <track kind="captions" />
          </Preview>
        )}
        <StatusRow aria-live="polite">
          <Pill>{pillLabel}</Pill>
          {status === 'live' && (
            <SM>
              <RecDot>●</RecDot> {t('__INTERVIEW_RECORDING')}
            </SM>
          )}
        </StatusRow>

        {error && (
          <SM style={{ color: 'red' }}>{t('__INTERVIEW_ERROR_MEDIA')}</SM>
        )}

        {status === 'live' && <SM>{t('__INTERVIEW_LIVE_HINT')}</SM>}

        <Transcript>
          {transcript.map((turn) => (
            <Bubble key={turn.id} $role={turn.role}>
              <SM isBold>
                {turn.role === 'user'
                  ? t('__INTERVIEW_YOU')
                  : t('__INTERVIEW_INTERVIEWER')}
              </SM>
              <Span>{turn.text}</Span>
            </Bubble>
          ))}
        </Transcript>

        {status === 'ended' ? (
          <>
            <MD>{t('__INTERVIEW_ENDED_MESSAGE')}</MD>
            {downloadUrl && (
              <DownloadLink href={downloadUrl} download="interview.webm">
                {t('__INTERVIEW_DOWNLOAD')}
              </DownloadLink>
            )}
          </>
        ) : (
          <Controls>
            <Button isDanger onClick={end}>
              {t('__INTERVIEW_END')}
            </Button>
          </Controls>
        )}
      </Card>
    </PageWrapper>
  );
};

export default VoiceInterview;
