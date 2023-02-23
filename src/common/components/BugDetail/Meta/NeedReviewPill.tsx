import { SM, Tooltip } from '@appquality/unguess-design-system';
import { ReactComponent as NeedReviewIcon } from 'src/assets/icons/pill-icon-need-review.svg';
import { useTranslation } from 'react-i18next';
import { Tag } from 'src/common/Tag';
import { theme } from 'src/app/theme';

export const NeedReviewPill = () => {
  const { t } = useTranslation();
  return (
    <Tooltip
      appendToNode={document.body}
      type="light"
      content={t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW_TOOLTIP')}
    >
      <div>
        <SM tag="span">{t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}</SM>
        <Tag hue="rgba(0,0,0,0)">
          <NeedReviewIcon />
        </Tag>
      </div>
    </Tooltip>
  );
};
