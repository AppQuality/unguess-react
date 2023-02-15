import { SM, Tooltip } from '@appquality/unguess-design-system';
import { IconPill } from 'src/common/components/pills/IconPill';
import { ReactComponent as NeedReviewIcon } from 'src/assets/icons/pill-icon-need-review.svg';
import { useTranslation } from 'react-i18next';

export const NeedReviewPill = () => {
  const { t } = useTranslation();
  return (
    <Tooltip
      appendToNode={document.body}
      type="light"
      content={t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW_TOOLTIP')}
    >
      <span>
        <IconPill
          size="medium"
          iconPosition="right"
          title={<SM>{t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}</SM>}
          icon={<NeedReviewIcon />}
        />
      </span>
    </Tooltip>
  );
};
