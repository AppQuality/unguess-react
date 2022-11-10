import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StickyContainer } from 'src/common/components/StickyContainer';

export const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return <StickyContainer>pippo</StickyContainer>;
};
