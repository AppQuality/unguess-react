import { Button, MD } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AiIcon } from 'src/assets/icons/ai-icon.svg';

type AiGeneratorSectionProps = {
  canShowAiFeatures?: boolean;
  onOpenCreateWithAI: () => void;
};

const AiGeneratorSection = ({
  canShowAiFeatures,
  onOpenCreateWithAI,
}: AiGeneratorSectionProps) => {
  const { t } = useTranslation();

  if (!canShowAiFeatures) {
    return null;
  }

  return (
    <div style={{ marginBottom: appTheme.space.md }}>
      <MD
        style={{
          paddingTop: appTheme.space.sm,
          marginBottom: appTheme.space.md,
        }}
      >
        <Trans
          i18nKey="__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_AI_DISCLAIMER"
          components={{
            bold: <MD isBold />,
          }}
        />
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
