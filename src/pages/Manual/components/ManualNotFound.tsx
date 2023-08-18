import { Paragraph, XXL } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyManualImg } from 'src/assets/icons/public-manual-empty.svg';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { ButtonGoToSupportCenter } from './ButtonGoToSupportCenter';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ManualNotFound = () => {
  const { t } = useTranslation();

  return (
    <CenteredContainer>
      <EmptyManualImg style={{ margin: appTheme.space.lg }} />
      <XXL style={{ color: appTheme.palette.blue[600] }} isBold>
        {t('__PUBLIC_MANUAL_NOT_FOUND_TITLE')}
      </XXL>
      <Paragraph style={{ color: appTheme.palette.grey[600] }}>
        {t('__PUBLIC_MANUAL_NOT_FOUND_TEXT')}
      </Paragraph>
      <ButtonGoToSupportCenter />
    </CenteredContainer>
  );
};

export default ManualNotFound;
