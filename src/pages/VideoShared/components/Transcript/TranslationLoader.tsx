import { Skeleton, SM } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTranslationTools } from '../tools/hooks/useTranslationTools';

const LoaderWrapper = styled.div`
  margin-top: ${appTheme.space.xs};
`;

export const TranslationLoader = () => {
  const { isProcessing } = useTranslationTools();
  const { t } = useTranslation();

  if (!isProcessing) return null;

  return (
    <LoaderWrapper>
      <SM
        isBold
        color={appTheme.palette.grey[700]}
        style={{ marginBottom: appTheme.space.xxs }}
      >
        {t('__TOOLS_TRANSLATE_PROGRESS_BAR_LABEL')}
      </SM>
      <Skeleton
        width="100%"
        height="6px"
        style={{
          backgroundColor: appTheme.palette.teal[700],
          borderRadius: appTheme.borderRadii.lg,
        }}
      />
    </LoaderWrapper>
  );
};
