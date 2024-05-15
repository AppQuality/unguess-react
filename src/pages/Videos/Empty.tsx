import { Paragraph } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

const Empty = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper isNotBoxed>
      <Paragraph>{t('__VIDEOS_PAGE_NO_ITEMS_MESSAGE')}</Paragraph>
    </LayoutWrapper>
  );
};

export default Empty;
