import { Paragraph, XL } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyImg } from 'src/assets/modal-use-case-empty.svg';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

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
      <EmptyImg style={{ marginBottom: appTheme.space.lg }} />
      <XL isBold>{t('__PUBLIC_MANUAL_NOT_FOUND_TITLE')}</XL>
      <Paragraph>{t('__PUBLIC_MANUAL_NOT_FOUND_TEXT')}</Paragraph>
    </CenteredContainer>
  );
};

export default ManualNotFound;
