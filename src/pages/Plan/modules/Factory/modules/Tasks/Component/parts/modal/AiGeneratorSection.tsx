import { Button, MD, Tag } from '@appquality/unguess-design-system';
import { ReactNode, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AiIcon } from 'src/assets/icons/ai-icon.svg';
import { useGetServicesApiKHealthQuery } from 'src/features/api';

type AiGeneratorSectionProps = {
  onOpenCreateWithAI: () => void;
  checkApiHealth?: boolean;
  label?: ReactNode;
};

const AiGeneratorSection = ({
  onOpenCreateWithAI,
  checkApiHealth = true,
  label,
}: AiGeneratorSectionProps) => {
  const { t } = useTranslation();
  const { data: apiK_HealthResponse } = useGetServicesApiKHealthQuery(
    undefined,
    {
      skip: !checkApiHealth,
    }
  );

  const canShowAiFeatures = useMemo(() => {
    if (!checkApiHealth) return true;
    return (
      apiK_HealthResponse?.success && apiK_HealthResponse?.status === 'healthy'
    );
  }, [apiK_HealthResponse, checkApiHealth]);
  if (!canShowAiFeatures) {
    return null;
  }

  return (
    <div
      style={{ marginBottom: appTheme.space.md, marginTop: appTheme.space.md }}
    >
      <Tag>{t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_AI_BETA_TAG')}</Tag>
      <MD
        style={{
          paddingTop: appTheme.space.sm,
          marginBottom: appTheme.space.md,
        }}
      >
        {label || (
          <Trans
            i18nKey="__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_AI_DISCLAIMER"
            components={{
              bold: <MD isBold />,
            }}
          />
        )}
      </MD>
      <Button onClick={onOpenCreateWithAI}>
        <Button.StartIcon>
          <AiIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_BUTTON')}
      </Button>
    </div>
  );
};

export { AiGeneratorSection };
