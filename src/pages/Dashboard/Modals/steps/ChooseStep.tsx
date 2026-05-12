import { LG, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const CardsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.sm};
`;

const ActivityCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  border: 2px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.palette.blue[600]};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const IllustrationBox = styled.div<{ $color: string }>`
  width: 100%;
  max-width: 208px;
  height: 160px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const ChooseStep = ({
  onImportMedia,
  onLaunchTest,
}: {
  onImportMedia: () => void;
  onLaunchTest: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <CardsWrapper>
      <ActivityCard onClick={onImportMedia}>
        <IllustrationBox $color="#FFC2EC" />
        <XXL
          isBold
          style={{ textAlign: 'center', marginBottom: appTheme.space.xs }}
        >
          {t('__NEW_ACTIVITY_MODAL_IMPORT_MEDIA_TITLE')}
        </XXL>
        <LG style={{ textAlign: 'center', color: appTheme.palette.grey[700] }}>
          {t('__NEW_ACTIVITY_MODAL_IMPORT_MEDIA_SUBTITLE')}
        </LG>
      </ActivityCard>
      <ActivityCard onClick={onLaunchTest}>
        <IllustrationBox $color="#CDF4D3" />
        <XXL
          isBold
          style={{ textAlign: 'center', marginBottom: appTheme.space.xs }}
        >
          {t('__NEW_ACTIVITY_MODAL_LAUNCH_TEST_TITLE')}
        </XXL>
        <LG style={{ textAlign: 'center', color: appTheme.palette.grey[700] }}>
          {t('__NEW_ACTIVITY_MODAL_LAUNCH_TEST_SUBTITLE')}
        </LG>
      </ActivityCard>
    </CardsWrapper>
  );
};
