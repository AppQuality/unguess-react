import { IconPill } from 'src/common/components/pills/IconPill';
import { ReactComponent as NeedReviewIcon } from 'src/assets/icons/pill-icon-need-review.svg';
import { useTranslation } from 'react-i18next';
import { InfoTitle } from './InfoTitle';

export const NeedReviewPill = () => {
  const { t } = useTranslation();
  return (
    <IconPill
      size="medium"
      iconPosition="right"
      title={<InfoTitle>{t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}</InfoTitle>}
      icon={<NeedReviewIcon />}
    />
  );
};
